export default function About({ profile }) {
    if (!profile) return null;

    return (
        <section id="about" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Get to know more about my background and passion
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative glass-card overflow-hidden rounded-2xl">
                            {profile.profile_photo ? (
                                <img
                                    src={`/storage/${profile.profile_photo}`}
                                    alt={profile.full_name}
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                            ) : (
                                <div className="w-full h-[400px] lg:h-[500px] bg-gradient-to-br from-dark-700 to-dark-800 flex items-center justify-center">
                                    <svg className="w-32 h-32 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-display font-bold text-white">
                                {profile.full_name}
                            </h3>
                            {profile.headline && (
                                <p className="text-lg text-primary-400 font-medium">
                                    {profile.headline}
                                </p>
                            )}
                        </div>

                        {profile.biography && (
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                                    {profile.biography}
                                </p>
                            </div>
                        )}

                        {/* Info Cards */}
                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {profile.email && (
                                <div className="glass-card p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Email</p>
                                            <p className="text-sm text-gray-300">{profile.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {profile.location && (
                                <div className="glass-card p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-accent-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Location</p>
                                            <p className="text-sm text-gray-300">{profile.location}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {profile.phone && (
                                <div className="glass-card p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Phone</p>
                                            <p className="text-sm text-gray-300">{profile.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {profile.website && (
                                <div className="glass-card p-4 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wider">Website</p>
                                            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-300 hover:text-primary-400 transition-colors">
                                                {profile.website.replace(/^https?:\/\//, '')}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Download CV Button */}
                        {profile.cv_file && (
                            <div className="pt-4">
                                <a
                                    href={`/storage/${profile.cv_file}`}
                                    download
                                    className="btn-primary"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download CV
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
