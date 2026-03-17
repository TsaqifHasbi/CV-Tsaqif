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
}
