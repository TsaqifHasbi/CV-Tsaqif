import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';
import SocialLinks from './Components/SocialLinks';

export default function About({
    profile = null,
    socialLinks = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    return (
        <>
            <Head title={`About - ${safeProfile.full_name || 'Portfolio'}`}>
                <meta name="description" content={safeProfile.biography || 'About me'} />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    <section className="py-20 md:py-32 pt-28">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            {/* Section Header */}
                            <div className="mb-12">
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                                    About <span className="text-rose-500">Me</span>
                                </h1>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12 items-start">
                                {/* Image */}
                                <div className="relative">
                                    <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                        {safeProfile.profile_photo ? (
                                            <img
                                                src={safeProfile.profile_photo}
                                                alt={safeProfile.full_name}
                                                className="w-full h-[300px] lg:h-[400px] object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-[300px] lg:h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-4">
                                        <SocialLinks socialLinks={safeSocialLinks} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <h2 className="text-2xl font-display font-bold text-gray-900">
                                            {safeProfile.full_name || 'Your Name'}
                                        </h2>
                                        {safeProfile.headline && (
                                            <p className="text-lg text-rose-500 font-medium">
                                                {safeProfile.headline}
                                            </p>
                                        )}
                                    </div>

                                    {safeProfile.biography && (
                                        <div className="prose prose-lg max-w-none">
                                            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                                                {safeProfile.biography}
                                            </p>
                                        </div>
                                    )}

                                    {/* Contact Info - Compact */}
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                                        {safeProfile.email && (
                                            <a href={`mailto:${safeProfile.email}`} className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {safeProfile.email}
                                            </a>
                                        )}
                                        {safeProfile.phone && (
                                            <a href={`tel:${safeProfile.phone}`} className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                {safeProfile.phone}
                                            </a>
                                        )}
                                        {safeProfile.location && (
                                            <span className="flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {safeProfile.location}
                                            </span>
                                        )}
                                        {safeProfile.website && (
                                            <a href={safeProfile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-rose-500 transition-colors">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                                </svg>
                                                {safeProfile.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        )}
                                    </div>

                                    {/* Download CV Button */}
                                    {safeProfile.cv_file && (
                                        <div className="pt-2">
                                            <a
                                                href={safeProfile.cv_file}
                                                download
                                                className="btn-primary"
                                            >
                                                Download CV
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </PublicLayout>
            </div>
        </>
    );
}
