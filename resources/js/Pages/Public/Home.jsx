import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Navigation from './Components/Navigation';
import Hero from './Components/Hero';
import About from './Components/About';
import Education from './Components/Education';
import Experience from './Components/Experience';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Certifications from './Components/Certifications';
import Contact from './Components/Contact';
import Footer from './Components/Footer';

export default function Home({
    profile = null,
    socialLinks = [],
    education = [],
    experiences = [],
    skills = {},
    projects = [],
    certifications = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Ensure data is in correct format with null safety
    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeExperiences = Array.isArray(experiences) ? experiences : [];
    const safeSkills = (skills && typeof skills === 'object' && !Array.isArray(skills)) ? skills : {};
    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeCertifications = Array.isArray(certifications) ? certifications : [];

    const siteName = safeProfile.full_name || 'Portfolio';
    const siteDescription = safeProfile.short_intro || 'Professional portfolio and CV';

    return (
        <>
            <Head title={`${siteName} - Portfolio`}>
                <meta name="description" content={siteDescription} />
            </Head>

            <div className={`min-h-screen bg-dark-950 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Background Effects */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl"></div>
                </div>

                {/* Navigation */}
                <Navigation profile={safeProfile} />

                {/* Main Content */}
                <main className="relative">
                    <Hero profile={safeProfile} socialLinks={safeSocialLinks} />
                    <About profile={safeProfile} />
                    <Education education={safeEducation} />
                    <Experience experiences={safeExperiences} />
                    <Skills skills={safeSkills} />
                    <Projects projects={safeProjects} />
                    <Certifications certifications={safeCertifications} />
                    <Contact profile={safeProfile} socialLinks={safeSocialLinks} />
                </main>

                {/* Footer */}
                <Footer profile={safeProfile} socialLinks={safeSocialLinks} />
            </div>
        </>
    );
}
