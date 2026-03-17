import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';
import Hero from './Components/Hero';

export default function Home({
    profile = null,
    socialLinks = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    const siteName = safeProfile.full_name || 'Portfolio';
    const siteDescription = safeProfile.short_intro || 'Professional portfolio and CV';

    return (
        <>
            <Head title={`${siteName} - Portfolio`}>
                <meta name="description" content={siteDescription} />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    <Hero profile={safeProfile} socialLinks={safeSocialLinks} />
                </PublicLayout>
            </div>
        </>
    );
}
