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
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index(): Response
    {
        $stats = [
            'education' => Education::count(),
            'experiences' => Experience::count(),
            'skills' => Skill::count(),
            'projects' => Project::count(),
            'certifications' => Certification::count(),
            'socialLinks' => SocialLink::count(),
        ];

        $profile = Profile::first();
        $recentProjects = Project::latest()->take(5)->get();
        $recentExperiences = Experience::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'profile' => $profile,
            'recentProjects' => $recentProjects,
            'recentExperiences' => $recentExperiences,
        ]);
    }
}
