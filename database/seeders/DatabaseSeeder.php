<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\SocialLink;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Skill;
use App\Models\Project;
use App\Models\Certification;
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
        // Create Admin User
        User::updateOrCreate(
            ['email' => 'admin@tsaqif.dev'],
            [
                'name' => 'Tsaqif Admin',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        // Profile
        $this->seedProfile();

        // Social Links
        $this->seedSocialLinks();

        // Education
        $this->seedEducation();

        // Experience
        $this->seedExperiences();

        // Skills
        $this->seedSkills();

        // Projects
        $this->seedProjects();

        // Certifications
        $this->seedCertifications();
    }

    private function seedProfile(): void
    {
        Profile::updateOrCreate(
            ['id' => 1],
            [
                'full_name' => 'Tsaqif Hasbi Aghna Syarief',
                'nickname' => 'Tsaqif',
                'headline' => 'Full Stack Developer & UI/UX Designer',
                'short_intro' => 'Mahasiswa Informatika yang passionate dalam pengembangan web dan desain UI/UX. Berpengalaman dalam memimpin tim dan mengelola proyek teknologi.',
                'biography' => 'Saya adalah mahasiswa Informatika di Universitas Jenderal Soedirman dengan fokus pada pengembangan perangkat lunak, algoritma, dan sistem komputer. Memiliki pengalaman dalam berbagai organisasi kampus dan telah mengembangkan keterampilan kepemimpinan, manajemen proyek, serta pengembangan web. Saya percaya bahwa teknologi dapat menjadi solusi untuk berbagai permasalahan di masyarakat.',
                'email' => 'contact@tsaqif.dev',
                'phone' => '+62 812-xxxx-xxxx',
                'location' => 'Purwokerto, Jawa Tengah, Indonesia',
                'website' => 'https://tsaqif.dev',
            ]
        );
    }

    private function seedSocialLinks(): void
    {
        $socialLinks = [
            ['platform' => 'LinkedIn', 'url' => 'https://linkedin.com/in/tsaqif', 'icon' => 'linkedin', 'order' => 1],
            ['platform' => 'GitHub', 'url' => 'https://github.com/tsaqif', 'icon' => 'github', 'order' => 2],
            ['platform' => 'Instagram', 'url' => 'https://instagram.com/tsaqif', 'icon' => 'instagram', 'order' => 3],
            ['platform' => 'Email', 'url' => 'mailto:contact@tsaqif.dev', 'icon' => 'mail', 'order' => 4],
        ];

        foreach ($socialLinks as $link) {
            SocialLink::updateOrCreate(
                ['platform' => $link['platform']],
                array_merge($link, ['is_active' => true])
            );
        }
    }

    private function seedEducation(): void
    {
        $educations = [
            [
                'institution' => 'Universitas Jenderal Soedirman',
                'degree' => 'Sarjana Komputer (S.Kom)',
                'field_of_study' => 'Informatika',
                'start_year' => '2023',
                'end_year' => null,
                'location' => 'Purwokerto, Jawa Tengah',
                'gpa' => '3.7/4.0',
                'description' => "Sedang menempuh pendidikan Sarjana Komputer jurusan Informatika dengan fokus pada pengembangan perangkat lunak, algoritma, dan sistem komputer.\n\nPencapaian Utama:\n• Proyek Penting dan Penelitian\n• Proyek Pengembangan Perangkat Lunak\n• Organisasi dan Kepemimpinan\n• Kerja Volunteer\n• Pengalaman Asisten Praktikum",
                'order' => 1,
            ],
            [
                'institution' => 'SMK Telkom Jakarta',
                'degree' => 'Sekolah Menengah Kejuruan (SMK)',
                'field_of_study' => 'Rekayasa Perangkat Lunak',
                'start_year' => '2020',
                'end_year' => '2023',
                'location' => 'Jakarta',
                'gpa' => '89.9/100',
                'description' => "Lulus dari Sekolah Menengah Kejuruan dengan spesialisasi Rekayasa Perangkat Lunak, fokus pada pengembangan aplikasi dan pemrograman.\n\nPencapaian Utama:\n• Prestasi Akademik dan Teknis\n• Proyek Pengembangan Perangkat Lunak - Aplikasi Web Aspirasi Mahasiswa (localhost)\n• Magang di Perusahaan Teknologi\n• Sertifikasi Industri",
                'order' => 2,
            ],
        ];

        foreach ($educations as $edu) {
            Education::updateOrCreate(
                ['institution' => $edu['institution'], 'degree' => $edu['degree']],
                array_merge($edu, ['is_active' => true])
            );
        }
    }

    private function seedExperiences(): void
    {
        $experiences = [
            [
                'job_title' => 'Asisten Laboratorium Struktur Data Informatika 2025',
                'organization' => 'Universitas Jenderal Soedirman',
                'type' => 'work',
                'start_date' => '2025-03-01',
                'end_date' => '2025-06-30',
                'is_current' => false,
                'location' => 'Purbalingga, Jawa Tengah, Indonesia',
                'employment_type' => 'Part-time',
                'description' => "Sebagai Asisten Laboratorium Struktur Data, saya membantu dosen pengampu dalam pelaksanaan praktikum dan membimbing mahasiswa dalam memahami konsep dasar dan implementasi struktur data menggunakan bahasa pemrograman.\n\nPencapaian Utama:\n• Berhasil membantu mahasiswa memahami konsep dasar struktur data dan implementasinya dengan baik\n• Membantu mahasiswa dalam memecahkan masalah praktikum dan memberikan bimbingan pemrograman\n• Mengevaluasi hasil praktikum mahasiswa secara objektif dan memberikan penilaian yang akurat\n• Memberikan solusi dan penjelasan tambahan untuk memperkuat pemahaman mahasiswa\n• Menjaga ketertiban dan kelancaran saat berlangsungnya sesi praktikum\n• Menyelesaikan periode pengajaran intensif 3 bulan dengan feedback positif dari mahasiswa\n\nKeterampilan & Kompetensi:\nC Programming Language • Communication • Teaching",
                'order' => 1,
            ],
            [
                'job_title' => 'Ketua Divisi Pengembangan Sumber Daya Manusia',
                'organization' => 'HMIF UNSOED',
                'type' => 'organization',
                'start_date' => '2025-03-01',
                'end_date' => null,
                'is_current' => true,
                'location' => 'Purbalingga, Jawa Tengah, Indonesia',
                'employment_type' => 'Volunteer',
                'description' => "Sebagai Ketua Divisi Pengembangan Sumber Daya Manusia di HMIF UNSOED (Himpunan Mahasiswa Informatika), saya memimpin divisi yang bertanggung jawab mengembangkan sumber daya manusia, menyelenggarakan program pelatihan, dan meningkatkan kemampuan mahasiswa Informatika.\n\nPencapaian Utama:\n• Berhasil merancang dan mengimplementasikan program pelatihan komprehensif untuk mahasiswa Informatika\n• Mengembangkan program mentoring yang memadukan mahasiswa senior dan junior untuk transfer knowledge\n• Merancang dan mengembangkan acara kaderisasi jurusan Informatika untuk membangun karakter dan jiwa kepemimpinan\n• Mengkoordinasikan seminar pengembangan profesional dengan pakar industri dan alumni\n• Memimpin program rekrutmen dan orientasi anggota baru HMIF\n• Mengimplementasikan sistem penilaian kemampuan dan tracking sertifikasi untuk anggota\n\nKeterampilan & Kompetensi:\nLeadership • Training Management • Human Resource Development • Program Coordination",
                'order' => 2,
            ],
            [
                'job_title' => 'Koordinator Fakultas untuk Acara PORSOED',
                'organization' => 'BEM FT UNSOED',
                'type' => 'organization',
                'start_date' => '2024-09-01',
                'end_date' => '2024-11-30',
                'is_current' => false,
                'location' => 'Purwokerto, Jawa Tengah, Indonesia',
                'employment_type' => 'Volunteer',
                'description' => "Sebagai Koordinator Fakultas dalam PORSOED (Pekan Olahraga Soedirman) mewakili BEM FT UNSOED, saya bertanggung jawab penuh atas koordinasi dan manajemen kontingen Fakultas Teknik Universitas Jenderal Soedirman dalam mengikuti kompetisi olahraga antar fakultas.\n\nPencapaian Utama:\n• Berhasil mengkoordinasikan 40+ atlet dan official dari Fakultas Teknik dalam 16 cabang olahraga\n• Mengantarkan Fakultas Teknik meraih peringkat 2 setelah akumulasi poin PORSOED 2024\n• Menyusun strategi efektif dan memotivasi atlet sehingga meningkatkan jumlah perolehan medali\n• Menyelesaikan seluruh persiapan logistik dan teknis secara profesional dan tepat waktu\n• Memperkuat solidaritas, semangat sportivitas, dan kebanggaan mahasiswa Fakultas Teknik\n\nKeterampilan & Kompetensi:\nCommunication • Coordination Skills • Event Management",
                'order' => 3,
            ],
            [
                'job_title' => 'Staff Kementerian Minat dan Bakat',
                'organization' => 'BEM FT UNSOED',
                'type' => 'organization',
                'start_date' => '2024-03-01',
                'end_date' => '2024-12-31',
                'is_current' => false,
                'location' => 'Purbalingga, Jawa Tengah, Indonesia',
                'employment_type' => 'Volunteer',
                'description' => "Sebagai Staff Minat dan Bakat di Badan Eksekutif Mahasiswa Fakultas Teknik UNSOED (BEM FT UNSOED), saya berkontribusi dalam merancang dan melaksanakan berbagai program pengembangan minat dan bakat mahasiswa Fakultas Teknik Universitas Jenderal Soedirman.\n\nPencapaian Utama:\n• Mengidentifikasi potensi mahasiswa untuk persiapan lomba\n• Menyusun program tahunan seperti POST dan kegiatan lainnya\n• Membuat proposal untuk sponsorship dan pendanaan\n• Koordinator FT dalam ajang PORSOED\n• Membimbing mahasiswa menghadapi kompetisi di tingkat universitas dan antar-universitas\n• Mendapat penghargaan Staff Terbaik Bulan Juni 2024 karena kerja keras dan dedikasi yang luar biasa\n\nKeterampilan & Kompetensi:\nEvent Management • Leadership • Project Management",
                'order' => 4,
            ],
            [
                'job_title' => 'Search Engine Optimization Team Lead',
                'organization' => 'SARI Teknologi',
                'type' => 'work',
                'start_date' => '2022-02-01',
                'end_date' => '2022-07-31',
                'is_current' => false,
                'location' => 'Jakarta Barat, Jakarta Raya, Indonesia',
                'employment_type' => 'Internship',
                'description' => "Seorang SEO Team Lead adalah seseorang yang memimpin tim dalam mengembangkan dan melaksanakan strategi optimasi mesin pencari untuk meningkatkan visibilitas online dan lalu lintas organik.\n\nPencapaian Utama:\n• Pengembangan Strategi: Merancang strategi SEO yang efektif\n• Analisis dan Pelaporan: Menganalisis performa situs dan melaporkan hasilnya\n• Penelitian Kata Kunci: Mengidentifikasi kata kunci yang relevan\n• Optimasi On-Page dan Off-Page: Mengoptimalkan halaman situs dan membangun tautan balik\n• Pengelolaan Tim: Memimpin dan melatih tim SEO\n• Kolaborasi Antar Tim: Bekerja sama dengan tim pemasaran dan pengembang web\n• Pemantauan Tren: Mengikuti perkembangan terbaru dalam SEO\n• Manajemen Proyek: Mengelola proyek SEO dari awal hingga akhir\n\nKeterampilan & Kompetensi:\nSEO • Digital Marketing • Team Leadership • Analytics",
                'order' => 5,
            ],
        ];

        foreach ($experiences as $exp) {
            Experience::updateOrCreate(
                ['job_title' => $exp['job_title'], 'organization' => $exp['organization']],
                array_merge($exp, ['is_active' => true])
            );
        }
    }

    private function seedSkills(): void
    {
        $skills = [
            // UI/UX Design
            ['name' => 'Figma', 'category' => 'Desain UI/UX', 'proficiency_level' => 90, 'order' => 1],
            ['name' => 'Prototyping', 'category' => 'Desain UI/UX', 'proficiency_level' => 88, 'order' => 2],
            ['name' => 'Canva', 'category' => 'Desain UI/UX', 'proficiency_level' => 85, 'order' => 3],
            ['name' => 'Adobe Illustrator', 'category' => 'Desain UI/UX', 'proficiency_level' => 82, 'order' => 4],

            // Web Development
            ['name' => 'HTML', 'category' => 'Pengembangan Web', 'proficiency_level' => 95, 'order' => 5],
            ['name' => 'CSS', 'category' => 'Pengembangan Web', 'proficiency_level' => 90, 'order' => 6],
            ['name' => 'JavaScript', 'category' => 'Pengembangan Web', 'proficiency_level' => 88, 'order' => 7],
            ['name' => 'Web APIs', 'category' => 'Pengembangan Web', 'proficiency_level' => 80, 'order' => 8],

            // JavaScript Frameworks
            ['name' => 'ReactJS', 'category' => 'JavaScript Frameworks', 'proficiency_level' => 85, 'order' => 9],
            ['name' => 'VueJS', 'category' => 'JavaScript Frameworks', 'proficiency_level' => 50, 'order' => 10],
            ['name' => 'Component Architecture', 'category' => 'JavaScript Frameworks', 'proficiency_level' => 82, 'order' => 11],
            ['name' => 'State Management', 'category' => 'JavaScript Frameworks', 'proficiency_level' => 78, 'order' => 12],

            // Frontend Frameworks
            ['name' => 'Bootstrap', 'category' => 'Framework Frontend', 'proficiency_level' => 88, 'order' => 13],
            ['name' => 'Tailwind CSS', 'category' => 'Framework Frontend', 'proficiency_level' => 85, 'order' => 14],
            ['name' => 'Bulma', 'category' => 'Framework Frontend', 'proficiency_level' => 15, 'order' => 15],
            ['name' => 'Material-UI', 'category' => 'Framework Frontend', 'proficiency_level' => 10, 'order' => 16],

            // Backend Frameworks
            ['name' => 'CodeIgniter', 'category' => 'Framework Backend', 'proficiency_level' => 82, 'order' => 17],
            ['name' => 'Laravel', 'category' => 'Framework Backend', 'proficiency_level' => 80, 'order' => 18],
            ['name' => 'AdonisJS', 'category' => 'Framework Backend', 'proficiency_level' => 75, 'order' => 19],

            // Programming Languages
            ['name' => 'C', 'category' => 'Pemrograman Logika', 'proficiency_level' => 95, 'order' => 20],
            ['name' => 'C++', 'category' => 'Pemrograman Logika', 'proficiency_level' => 88, 'order' => 21],
            ['name' => 'Python', 'category' => 'Pemrograman Logika', 'proficiency_level' => 85, 'order' => 22],
            ['name' => 'Java (OOP)', 'category' => 'Pemrograman Logika', 'proficiency_level' => 82, 'order' => 23],

            // Database
            ['name' => 'MySQL', 'category' => 'Database & SQL', 'proficiency_level' => 88, 'order' => 24],
            ['name' => 'SQL Queries', 'category' => 'Database & SQL', 'proficiency_level' => 85, 'order' => 25],
            ['name' => 'Database Design', 'category' => 'Database & SQL', 'proficiency_level' => 80, 'order' => 26],
            ['name' => 'Data Modeling', 'category' => 'Database & SQL', 'proficiency_level' => 78, 'order' => 27],

            // Version Control
            ['name' => 'Git', 'category' => 'Version Control', 'proficiency_level' => 92, 'order' => 28],
            ['name' => 'GitHub', 'category' => 'Version Control', 'proficiency_level' => 88, 'order' => 29],
            ['name' => 'Collaboration', 'category' => 'Version Control', 'proficiency_level' => 85, 'order' => 30],
            ['name' => 'Branch Management', 'category' => 'Version Control', 'proficiency_level' => 82, 'order' => 31],

            // Digital Marketing
            ['name' => 'Social Media', 'category' => 'Digital Marketing', 'proficiency_level' => 90, 'order' => 32],
            ['name' => 'Google Ads', 'category' => 'Digital Marketing', 'proficiency_level' => 88, 'order' => 33],
            ['name' => 'Analytics', 'category' => 'Digital Marketing', 'proficiency_level' => 85, 'order' => 34],
            ['name' => 'Content Strategy', 'category' => 'Digital Marketing', 'proficiency_level' => 83, 'order' => 35],

            // SEO
            ['name' => 'Keyword Research', 'category' => 'SEO', 'proficiency_level' => 95, 'order' => 36],
            ['name' => 'On-Page SEO', 'category' => 'SEO', 'proficiency_level' => 92, 'order' => 37],
            ['name' => 'Technical SEO', 'category' => 'SEO', 'proficiency_level' => 88, 'order' => 38],
            ['name' => 'SEO Analytics', 'category' => 'SEO', 'proficiency_level' => 85, 'order' => 39],

            // Microsoft Office
            ['name' => 'Excel', 'category' => 'Microsoft Office', 'proficiency_level' => 92, 'order' => 40],
            ['name' => 'Word', 'category' => 'Microsoft Office', 'proficiency_level' => 88, 'order' => 41],
            ['name' => 'PowerPoint', 'category' => 'Microsoft Office', 'proficiency_level' => 85, 'order' => 42],
            ['name' => 'Outlook', 'category' => 'Microsoft Office', 'proficiency_level' => 82, 'order' => 43],
        ];

        foreach ($skills as $skill) {
            Skill::updateOrCreate(
                ['name' => $skill['name'], 'category' => $skill['category']],
                array_merge($skill, ['is_active' => true])
            );
        }
    }

    private function seedProjects(): void
    {
        $projects = [
            [
                'title' => 'To-DoList GUI Python',
                'description' => 'Aplikasi To-Do List desktop yang dibuat dengan Python dan Tkinter, memiliki tampilan GUI modern untuk manajemen tugas. Open source dan tersedia di GitHub.',
                'tech_stack' => 'Python,Tkinter,GUI',
                'github_link' => 'https://github.com/tsaqif/todolist-python',
                'demo_link' => null,
                'category' => 'Desktop App',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'ASPIRASI UNSOED',
                'description' => 'Perancangan Aplikasi web aspirasi mahasiswa Universitas Jenderal Soedirman. UI/UX didesain di Figma, fokus pada aksesibilitas dan desain modern.',
                'tech_stack' => 'Figma,UI/UX,Web App',
                'github_link' => null,
                'demo_link' => 'https://figma.com/design/aspirasi-unsoed',
                'category' => 'UI/UX Design',
                'is_featured' => true,
                'order' => 2,
            ],
        ];

        foreach ($projects as $project) {
            Project::updateOrCreate(
                ['title' => $project['title']],
                array_merge($project, ['is_active' => true])
            );
        }
    }

    private function seedCertifications(): void
    {
        $certifications = [
            [
                'title' => 'Digital Marketing',
                'issuer' => 'Badan Nasional Sertifikasi Profesi (BNSP)',
                'year' => '2022',
                'credential_id' => 'No. 62090 2431 0 0034390 2022',
                'credential_url' => null,
                'description' => "Sertifikasi profesional dalam strategi pemasaran digital, manajemen media sosial, dan kampanye iklan online.\n\nKeterampilan Utama:\n• Pemasaran Digital\n• Manajemen Media Sosial\n• Periklanan Online\n• Analitik Pemasaran",
                'order' => 1,
            ],
            [
                'title' => 'Software Engineering',
                'issuer' => 'Badan Nasional Sertifikasi Profesi (BNSP)',
                'year' => '2023',
                'credential_id' => 'No. 62010 3514 2 0001413 2023',
                'credential_url' => null,
                'description' => "Sertifikasi profesional dalam software engineering dengan kualifikasi dalam pengembangan perangkat lunak dan praktik rekayasa.\n\nKeterampilan Utama:\n• Pengembangan Perangkat Lunak\n• Pemrograman\n• Desain Sistem\n• Rekayasa Perangkat Lunak",
                'order' => 2,
            ],
            [
                'title' => 'Asisten Laboratorium Struktur Data',
                'issuer' => 'Universitas Jenderal Soedirman - Fakultas Teknik/Informatika',
                'year' => '2025',
                'credential_id' => 'Tahun Akademik 2024/2025',
                'credential_url' => null,
                'description' => "Sertifikat resmi sebagai Asisten Laboratorium Struktur Data untuk Tahun Akademik 2024/2025, berhasil menyelesaikan tugas bantuan pengajaran dalam praktikum mata kuliah Struktur Data di bawah pengawasan Bangun Wijayanto dari Maret hingga Juni 2025.\n\nKeterampilan Utama:\n• Struktur Data\n• Pemrograman C\n• Pengajaran\n• Manajemen Laboratorium",
                'order' => 3,
            ],
        ];

        foreach ($certifications as $cert) {
            Certification::updateOrCreate(
                ['title' => $cert['title'], 'issuer' => $cert['issuer']],
                array_merge($cert, ['is_active' => true])
            );
        }
    }
}
