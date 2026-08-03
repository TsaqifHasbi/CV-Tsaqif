import { Link } from '@inertiajs/react';
import SocialLinks from './SocialLinks';

export default function Hero({ profile, socialLinks }) {
    return (
        <section className="relative flex-1 flex items-center justify-center py-8 sm:py-0">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Profile Image - Shows FIRST on mobile (order-first), SECOND on desktop */}
                    <div className="flex justify-center lg:justify-end order-first lg:order-last animate-fade-in">
                        <div className="relative">
                            {/* Profile Image */}
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-2xl overflow-hidden shadow-2xl">
                                {profile?.profile_photo ? (
                                    <img
                                        src={profile.profile_photo}
                                        alt={profile.full_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                        <svg className="w-20 h-20 sm:w-32 sm:h-32 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Left Content - Shows SECOND on mobile (order-last), FIRST on desktop */}
                    <div className="space-y-4 sm:space-y-6 animate-fade-in text-center lg:text-left order-last lg:order-first">
                        {/* Greeting */}
                        <div className="space-y-3 sm:space-y-4">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 leading-tight">
                                Hi, I am{' '}
                                <span className="text-rose-500">
                                    {profile?.nickname || profile?.full_name || 'Your Name'}
                                </span>!
                            </h1>
                            {profile?.headline && (
                                <p className="text-base sm:text-lg text-rose-500 font-medium">
                                    {profile.headline}
                                </p>
                            )}
                        </div>

                        {/* Introduction */}
                        {profile?.short_intro && (
                            <div className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                                <p>
                                    <span className="text-rose-500 font-medium">{profile?.full_name}</span>
                                    {' '}{profile.short_intro}
                                </p>
                            </div>
                        )}

                        {/* Download CV Button */}
                        {profile?.cv_file && (
                            <div>
                                <a
                                    href={profile.cv_file}
                                    download="CV of Tsaqif Hasbi Aghna Syarief"
                                    className="btn-primary"
                                >
                                    Download CV
                                </a>
                            </div>
                        )}

                        {/* Social Links */}
                        <div className="flex justify-center lg:justify-start">
                            <SocialLinks socialLinks={socialLinks} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
