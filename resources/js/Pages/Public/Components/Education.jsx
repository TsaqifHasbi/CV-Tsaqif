export default function Education({ education }) {
    if (!education || education.length === 0) return null;

    return (
        <section id="education" className="py-20 md:py-32 bg-dark-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="section-title">
                        My <span className="gradient-text">Education</span>
                    </h2>
                    <p className="section-subtitle mx-auto">
                        Academic background and qualifications
                    </p>
                </div>

                {/* Timeline */}
                <div className="max-w-3xl mx-auto">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500/20"></div>

                        {/* Timeline Items */}
                        {education.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex items-start mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary-500 shadow-glow z-10"></div>

                                {/* Content */}
                                <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                                    <div className="glass-card p-6 rounded-xl card-hover group">
                                        {/* Year Badge */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="badge">
                                                {item.start_year} - {item.end_year || 'Present'}
                                            </span>
                                            {item.gpa && (
                                                <span className="badge bg-accent-500/10 text-accent-400 border-accent-500/20">
                                                    GPA: {item.gpa}
                                                </span>
                                            )}
                                        </div>

                                        {/* Degree & Institution */}
                                        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">
                                            {item.degree}
                                        </h3>
                                        {item.field_of_study && (
                                            <p className="text-gray-400 mt-1">{item.field_of_study}</p>
                                        )}

                                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span>{item.institution}</span>
                                        </div>

                                        {item.location && (
                                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{item.location}</span>
                                            </div>
                                        )}

                                        {/* Description */}
                                        {item.description && (
                                            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
