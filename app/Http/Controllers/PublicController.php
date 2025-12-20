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

class PublicController extends Controller
{
    /**
     * Display the public CV/Portfolio page
     */
    public function index(): Response
    {
        $profile = Profile::first();
        $socialLinks = SocialLink::active()->ordered()->get();
        $education = Education::active()->ordered()->get();
        $experiences = Experience::active()->ordered()->get();
        $skills = Skill::active()->groupedByCategory()->get();
        $projects = Project::active()->ordered()->get();
        $certifications = Certification::active()->ordered()->get();

        // Group skills by category for better display and convert to array
        $skillsByCategory = $skills->groupBy('category')->map(function ($items) {
            return $items->values()->toArray();
        })->toArray();

        return Inertia::render('Public/Home', [
            'profile' => $profile,
            'socialLinks' => $socialLinks,
            'education' => $education,
            'experiences' => $experiences,
            'skills' => $skillsByCategory,
            'projects' => $projects,
            'certifications' => $certifications,
        ]);
    }
}
