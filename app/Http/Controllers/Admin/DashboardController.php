<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        $stats = [
            'education' => [
                'total' => Education::count(),
                'active' => Education::where('is_active', true)->count(),
            ],
            'experiences' => [
                'total' => Experience::count(),
                'active' => Experience::where('is_active', true)->count(),
            ],
            'skills' => [
                'total' => Skill::count(),
                'active' => Skill::where('is_active', true)->count(),
            ],
            'projects' => [
                'total' => Project::count(),
                'active' => Project::where('is_active', true)->count(),
                'featured' => Project::where('is_featured', true)->count(),
            ],
            'certifications' => [
                'total' => Certification::count(),
                'active' => Certification::where('is_active', true)->count(),
            ],
            'socialLinks' => [
                'total' => SocialLink::count(),
                'active' => SocialLink::where('is_active', true)->count(),
            ],
        ];

        $profile = Profile::first();
        
        // Calculate profile completion percentage
        $profileCompletion = 0;
        if ($profile) {
            $fields = ['full_name', 'headline', 'short_intro', 'biography', 'profile_photo', 'cv_file', 'email', 'phone', 'location'];
            $filled = 0;
            foreach ($fields as $field) {
                if (!empty($profile->$field)) {
                    $filled++;
                }
            }
            $profileCompletion = round(($filled / count($fields)) * 100);
        }

        // Fetch recent items for tabs
        $recentProjects = Project::latest()->take(5)->get();
        $recentExperiences = Experience::latest()->take(5)->get();
        
        // Append logo_url to recent skills so their image/icons display properly if any
        $recentSkills = Skill::latest()->take(5)->get()->each->append('logo_url');
        $recentCertifications = Certification::latest()->take(5)->get();

        $memo = SiteSetting::get('admin_memo', '');

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'profile' => $profile,
            'profileCompletion' => $profileCompletion,
            'recentProjects' => $recentProjects,
            'recentExperiences' => $recentExperiences,
            'recentSkills' => $recentSkills,
            'recentCertifications' => $recentCertifications,
            'memo' => $memo,
        ]);
    }

    /**
     * Update the dashboard scratchpad memo.
     */
    public function updateMemo(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'memo' => 'nullable|string|max:5000',
        ]);

        SiteSetting::set('admin_memo', $validated['memo'] ?? '', 'text');

        return back()->with('success', 'Memo updated successfully.');
    }
}
