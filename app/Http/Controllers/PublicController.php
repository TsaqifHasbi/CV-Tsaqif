<?php

namespace App\Http\Controllers;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    /**
     * Get common data for all pages
     */
    private function getCommonData(): array
    {
        return [
            'profile' => Profile::first(),
            'socialLinks' => SocialLink::active()->ordered()->get(),
        ];
    }

    /**
     * Display the Home/Hero page
     */
    public function index(): Response
    {
        $data = $this->getCommonData();

        return Inertia::render('Public/Home', $data);
    }

    /**
     * Display the About page
     */
    public function about(): Response
    {
        $data = $this->getCommonData();

        return Inertia::render('Public/About', $data);
    }

    /**
     * Display the Education & Skills page
     */
    public function education(): Response
    {
        $data = $this->getCommonData();
        $data['education'] = Education::active()->ordered()->get();

        // Self-heal: ensure all categories used in skills exist in skill_categories
        $missingCategories = Skill::distinct()
            ->pluck('category')
            ->filter()
            ->diff(\App\Models\SkillCategory::pluck('name'));

        if ($missingCategories->isNotEmpty()) {
            $maxOrder = \App\Models\SkillCategory::max('order') ?? -1;
            foreach ($missingCategories as $index => $categoryName) {
                \App\Models\SkillCategory::firstOrCreate([
                    'name' => $categoryName,
                ], [
                    'type' => 'skill',
                    'order' => $maxOrder + 1 + $index,
                ]);
            }
        }

        // Fetch categories ordered by custom order
        $categories = \App\Models\SkillCategory::orderBy('order', 'asc')->get();

        $skillsGrouped = [];
        $toolsGrouped = [];

        foreach ($categories as $cat) {
            $catSkills = Skill::active()
                ->where('category', $cat->name)
                ->ordered()
                ->get();

            if ($catSkills->isEmpty()) {
                continue;
            }

            $catSkills->each->append('logo_url');

            if ($cat->type === 'tool') {
                $toolsGrouped[$cat->name] = $catSkills->values()->toArray();
            } else {
                $skillsGrouped[$cat->name] = $catSkills->values()->toArray();
            }
        }

        $data['skills'] = $skillsGrouped;
        $data['tools'] = $toolsGrouped;

        return Inertia::render('Public/Education', $data);
    }

    /**
     * Display the Experience, Projects & Certifications page
     */
    public function experience(): Response
    {
        $data = $this->getCommonData();
        $data['experiences'] = Experience::active()->ordered()->get();
        $data['projects'] = Project::active()->ordered()->get();
        $data['certifications'] = Certification::where(function ($q) {
                // Show active certifications (no expiry or not yet expired)
                $q->where('is_active', true)
                // Also show expired certifications (have valid_until date that has passed)
                ->orWhere(function ($q2) {
                    $q2->whereNotNull('valid_until')
                       ->where('valid_until', '<', now()->toDateString());
                });
            })
            ->ordered()
            ->get();

        return Inertia::render('Public/Experience', $data);
    }

    /**
     * Display the Contact page
     */
    public function contact(): Response
    {
        $data = $this->getCommonData();

        return Inertia::render('Public/Contact', $data);
    }

    /**
     * Helper method to serve image from DB column
     */
    private function serveImageFromDatabase(?string $imageContent): \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Routing\ResponseFactory
    {
        if (!$imageContent) {
            abort(404);
        }

        // If it's a URL or path, redirect directly
        if (str_starts_with($imageContent, 'http://') || str_starts_with($imageContent, 'https://') || str_starts_with($imageContent, '/')) {
            return redirect($imageContent);
        }

        // Match data URI scheme e.g. data:image/svg+xml;base64,... or data:image/png;base64,...
        if (preg_match('/^data:([^;]+);base64,(.+)$/s', $imageContent, $matches)) {
            $mime = trim($matches[1]);
            $data = base64_decode($matches[2]);

            return response($data, 200)
                ->header('Content-Type', $mime)
                ->header('Cache-Control', 'public, max-age=31536000');
        }

        // Raw SVG markup
        if (str_starts_with(trim($imageContent), '<svg')) {
            return response($imageContent, 200)
                ->header('Content-Type', 'image/svg+xml')
                ->header('Cache-Control', 'public, max-age=31536000');
        }

        // Raw base64 content
        $decoded = base64_decode($imageContent, true);
        if ($decoded !== false && !empty($decoded)) {
            $finfo = new \finfo(FILEINFO_MIME_TYPE);
            $mime = $finfo->buffer($decoded) ?: 'image/png';
            return response($decoded, 200)
                ->header('Content-Type', $mime)
                ->header('Cache-Control', 'public, max-age=31536000');
        }

        abort(404);
    }

    /**
     * Serve a skill logo by ID (returns the image from base64 stored in DB)
     */
    public function serveSkillLogo(Skill $skill): \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Routing\ResponseFactory
    {
        return $this->serveImageFromDatabase($skill->logo);
    }

    /**
     * Serve a project image by ID (returns the image from base64 stored in DB)
     */
    public function serveProjectImage(Project $project): \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Routing\ResponseFactory
    {
        return $this->serveImageFromDatabase($project->image);
    }

    /**
     * Serve a certification image by ID (returns the image from base64 stored in DB)
     */
    public function serveCertificationImage(Certification $certification): \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse|\Illuminate\Contracts\Routing\ResponseFactory
    {
        return $this->serveImageFromDatabase($certification->image);
    }

    /**
     * Send Contact Message
     */
    public function sendContactMessage(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
            '_honey' => 'nullable|string', // Spam protection
        ]);

        if (!empty($validated['_honey'])) {
            return back()->with('error', 'Spam detected.');
        }

        try {
            \Illuminate\Support\Facades\Mail::to('tsaqifhasbi17@gmail.com')
                ->send(new \App\Mail\ContactMessage($validated));

            return back()->with('success', 'Your message has been sent successfully! I will get back to you as soon as possible.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Contact form error: ' . $e->getMessage());
            return back()->with('error', 'Sorry, an error occurred while sending your message. Please try again later.');
        }
    }
}
