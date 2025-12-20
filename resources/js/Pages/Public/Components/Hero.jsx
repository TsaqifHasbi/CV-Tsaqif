import SocialLinks from './SocialLinks';

export default function Hero({ profile, socialLinks }) {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8 animate-fade-in">
                        {/* Greeting */}
                        <div className="space-y-2">
                            <p className="text-primary-400 font-medium tracking-wider uppercase text-sm">
                                Welcome to my portfolio
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
                                Hi, I am{' '}
                                <span className="gradient-text">
                                    {profile?.full_name || 'Your Name'}
                                </span>
                            </h1>
                            {profile?.headline && (
                                <p className="text-xl md:text-2xl text-gray-400 font-medium mt-4">
                                    {profile.headline}
                                </p>
                            )}
                        </div>

                        {/* Introduction */}
                        {profile?.short_intro && (
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                {profile.short_intro}
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            {profile?.cv_file && (
                                <a
                                    href={`/storage/${profile.cv_file}`}
                                    download
                                    className="btn-primary group"
                                >
                                    <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download CV
                                </a>
                            )}
                            <button
                                onClick={() => {
                                    const element = document.getElementById('contact');
                                    element?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn-secondary"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                Contact Me
                            </button>
                        </div>

                        {/* Social Links */}
                        <SocialLinks socialLinks={socialLinks} />
                    </div>

                    {/* Right Content - Profile Image */}
                    <div className="flex justify-center lg:justify-end animate-fade-in animation-delay-200">
                        <div className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-20 animate-pulse-slow"></div>
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-50"></div>

                            {/* Profile Image */}
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-dark-700 shadow-2xl">
                                {profile?.profile_photo ? (
                                    <img
                                        src={`/storage/${profile.profile_photo}`}
                                        alt={profile.full_name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                                        <svg className="w-32 h-32 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary-500/20 rounded-lg backdrop-blur-sm border border-primary-500/30 flex items-center justify-center animate-float">
                                <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent-500/20 rounded-lg backdrop-blur-sm border border-accent-500/30 flex items-center justify-center animate-float animation-delay-300">
                                <svg className="w-8 h-8 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <button
                        onClick={() => {
                            const element = document.getElementById('about');
                            element?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-2 rounded-full text-gray-500 hover:text-primary-400 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}
