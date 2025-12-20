<?php

namespace Database\Seeders;

use App\Models\Certification;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'email_verified_at' => now(),
        ]);

        // Create profile
        Profile::create([
            'full_name' => 'Tsaqif',
            'headline' => 'Full Stack Developer',
            'short_intro' => 'Passionate software developer with expertise in building modern web applications. I love creating elegant solutions to complex problems.',
            'biography' => "I am a passionate Full Stack Developer with over 5 years of experience in building modern web applications. My journey in software development started during my university years, and since then, I have been dedicated to continuous learning and improvement.\n\nI specialize in Laravel, React, and cloud technologies. I believe in writing clean, maintainable code and following best practices in software development.\n\nWhen I'm not coding, you can find me contributing to open-source projects, writing technical articles, or exploring new technologies.",
            'email' => 'hello@tsaqif.dev',
            'phone' => '+62 812 3456 7890',
            'location' => 'Jakarta, Indonesia',
            'website' => 'https://tsaqif.dev',
        ]);

        // Create social links
        $socialLinks = [
            ['platform' => 'linkedin', 'url' => 'https://linkedin.com/in/tsaqif', 'order' => 1],
            ['platform' => 'github', 'url' => 'https://github.com/tsaqif', 'order' => 2],
            ['platform' => 'twitter', 'url' => 'https://twitter.com/tsaqif', 'order' => 3],
            ['platform' => 'email', 'url' => 'hello@tsaqif.dev', 'order' => 4],
        ];
        foreach ($socialLinks as $link) {
            SocialLink::create($link);
        }

        // Create education entries
        $education = [
            [
                'institution' => 'Universitas Indonesia',
                'degree' => 'Bachelor of Computer Science',
                'field_of_study' => 'Information Systems',
                'start_year' => '2015',
                'end_year' => '2019',
                'description' => 'Focused on software engineering and information systems. Graduated with honors.',
                'location' => 'Depok, Indonesia',
                'gpa' => '3.85',
                'order' => 1,
            ],
            [
                'institution' => 'National University of Singapore',
                'degree' => 'Master of Computing',
                'field_of_study' => 'Information Systems',
                'start_year' => '2020',
                'end_year' => '2022',
                'description' => 'Research focus on digital transformation and enterprise architecture.',
                'location' => 'Singapore',
                'gpa' => '4.0',
                'order' => 2,
            ],
        ];
        foreach ($education as $edu) {
            Education::create($edu);
        }

        // Create experience entries
        $experiences = [
            [
                'job_title' => 'Senior Full Stack Developer',
                'organization' => 'Tech Company XYZ',
                'start_date' => '2022-01-01',
                'end_date' => null,
                'is_current' => true,
                'description' => "• Led development of microservices architecture\n• Mentored junior developers\n• Implemented CI/CD pipelines\n• Reduced deployment time by 60%",
                'location' => 'Jakarta, Indonesia',
                'employment_type' => 'Full-time',
                'order' => 1,
            ],
            [
                'job_title' => 'Full Stack Developer',
                'organization' => 'Startup ABC',
                'start_date' => '2019-06-01',
                'end_date' => '2021-12-31',
                'is_current' => false,
                'description' => "• Built and maintained e-commerce platform\n• Developed RESTful APIs\n• Integrated payment gateways\n• Collaborated with cross-functional teams",
                'location' => 'Jakarta, Indonesia',
                'employment_type' => 'Full-time',
                'order' => 2,
            ],
        ];
        foreach ($experiences as $exp) {
            Experience::create($exp);
        }

        // Create skills
        $skills = [
            ['name' => 'PHP', 'category' => 'Programming', 'proficiency_level' => 95, 'order' => 1],
            ['name' => 'JavaScript', 'category' => 'Programming', 'proficiency_level' => 90, 'order' => 2],
            ['name' => 'TypeScript', 'category' => 'Programming', 'proficiency_level' => 85, 'order' => 3],
            ['name' => 'Laravel', 'category' => 'Framework', 'proficiency_level' => 95, 'order' => 1],
            ['name' => 'React', 'category' => 'Framework', 'proficiency_level' => 90, 'order' => 2],
            ['name' => 'Vue.js', 'category' => 'Framework', 'proficiency_level' => 80, 'order' => 3],
            ['name' => 'MySQL', 'category' => 'Database', 'proficiency_level' => 90, 'order' => 1],
            ['name' => 'PostgreSQL', 'category' => 'Database', 'proficiency_level' => 85, 'order' => 2],
            ['name' => 'Redis', 'category' => 'Database', 'proficiency_level' => 80, 'order' => 3],
            ['name' => 'Docker', 'category' => 'Tools', 'proficiency_level' => 85, 'order' => 1],
            ['name' => 'Git', 'category' => 'Tools', 'proficiency_level' => 95, 'order' => 2],
            ['name' => 'AWS', 'category' => 'Tools', 'proficiency_level' => 80, 'order' => 3],
        ];
        foreach ($skills as $skill) {
            Skill::create($skill);
        }

        // Create projects
        $projects = [
            [
                'title' => 'E-Commerce Platform',
                'description' => 'A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.',
                'tech_stack' => 'Laravel, React, MySQL, Redis, Stripe',
                'github_link' => 'https://github.com/tsaqif/ecommerce',
                'demo_link' => 'https://demo.ecommerce.tsaqif.dev',
                'category' => 'Web',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates and team features.',
                'tech_stack' => 'Vue.js, Laravel, PostgreSQL, WebSocket',
                'github_link' => 'https://github.com/tsaqif/taskmanager',
                'category' => 'Web',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'API Gateway Service',
                'description' => 'A high-performance API gateway service handling millions of requests with rate limiting and caching.',
                'tech_stack' => 'Node.js, Redis, Docker, Kubernetes',
                'github_link' => 'https://github.com/tsaqif/api-gateway',
                'category' => 'API',
                'is_featured' => false,
                'order' => 3,
            ],
        ];
        foreach ($projects as $project) {
            Project::create($project);
        }

        // Create certifications
        $certifications = [
            [
                'title' => 'AWS Solutions Architect Associate',
                'issuer' => 'Amazon Web Services',
                'year' => '2023',
                'credential_url' => 'https://aws.amazon.com/verification',
                'description' => 'Demonstrated ability to design distributed systems on AWS.',
                'order' => 1,
            ],
            [
                'title' => 'Laravel Certified Developer',
                'issuer' => 'Laravel',
                'year' => '2022',
                'credential_url' => 'https://certification.laravel.com',
                'description' => 'Expert-level proficiency in Laravel framework.',
                'order' => 2,
            ],
            [
                'title' => 'Google Cloud Professional',
                'issuer' => 'Google Cloud',
                'year' => '2022',
                'description' => 'Professional certification for cloud architecture.',
                'order' => 3,
            ],
        ];
        foreach ($certifications as $cert) {
            Certification::create($cert);
        }
    }
}
