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
                                                src={`/storage/${safeProfile.profile_photo}`}
                                                alt={safeProfile.full_name}
                                                className="w-full h-[400px] lg:h-[500px] object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                                <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Social Links */}
                                    <div className="mt-6">
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

                                    {/* Info Cards */}
                                    <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                        {safeProfile.email && (
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                                                <p className="text-sm text-gray-900">{safeProfile.email}</p>
                                            </div>
                                        )}
                                        {safeProfile.location && (
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Location</p>
                                                <p className="text-sm text-gray-900">{safeProfile.location}</p>
                                            </div>
                                        )}
                                        {safeProfile.phone && (
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                                                <p className="text-sm text-gray-900">{safeProfile.phone}</p>
                                            </div>
                                        )}
                                        {safeProfile.website && (
                                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Website</p>
                                                <a href={safeProfile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-500 hover:underline">
                                                    {safeProfile.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Download CV Button */}
                                    {safeProfile.cv_file && (
                                        <div className="pt-4">
                                            <a
                                                href={`/storage/${safeProfile.cv_file}`}
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
