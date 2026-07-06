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

        $skills = Skill::active()->groupedByCategory()->get();
        $skills->each->makeHidden('logo')->each->append('logo_url');
        $data['skills'] = $skills->groupBy('category')->map(function ($items) {
            return $items->values()->toArray();
        })->toArray();

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
        $data['certifications'] = Certification::active()->ordered()->get();

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
     * Serve a skill logo by ID (returns the image from base64 stored in DB)
     */
    public function serveSkillLogo(Skill $skill): \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
    {
        if (!$skill->logo) {
            abort(404);
        }

        if (preg_match('/^data:(image\/\w+);base64,(.+)$/', $skill->logo, $matches)) {
            $mime = $matches[1];
            $data = base64_decode($matches[3]);

            return response($data, 200)
                ->header('Content-Type', $mime)
                ->header('Cache-Control', 'public, max-age=31536000');
        }

        abort(404);
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

            return back()->with('success', 'Pesan Anda berhasil dikirim! Saya akan segera menghubungi Anda kembali.');
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Contact form error: ' . $e->getMessage());
            return back()->with('error', 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba beberapa saat lagi.');
        }
    }
}
