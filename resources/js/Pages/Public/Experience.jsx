import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';

export default function Experience({
    profile = null,
    socialLinks = [],
    experiences = [],
    projects = [],
    certifications = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        setIsLoaded(true);
        setTimeout(() => setIsVisible(true), 300);
    }, []);

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];
    const safeExperiences = Array.isArray(experiences) ? experiences : [];
    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeCertifications = Array.isArray(certifications) ? certifications : [];

    const workExperiences = safeExperiences.filter(exp => exp.type === 'work' || (!exp.type && exp.employment_type?.toLowerCase() !== 'volunteer'));
    const organizationExperiences = safeExperiences.filter(exp => exp.type === 'organization' || (!exp.type && exp.employment_type?.toLowerCase() === 'volunteer'));

    const formatDate = (dateString) => {
        if (!dateString) return 'Sekarang';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    const renderTimeline = (items, prefix) => {
        if (!items || items.length === 0) return null;
        
        return (
            <div className="w-[85%] md:w-[80%] max-w-4xl mx-auto">
                {items.map((item, index) => {
                    const uniqueId = `${prefix}-${item.id}`;
                    const isExpanded = expandedId === uniqueId;
                    const isLast = index === items.length - 1;

                    return (
                        <div
                            key={item.id}
                            className="flex group/item"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                                transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 120}ms`
                            }}
                        >
                            {/* Dot + Line Column — structurally aligned */}
                            <div className="flex flex-col items-center flex-shrink-0 w-6">
                                {/* Line above dot */}
                                <div className={`w-[2px] flex-1 ${index === 0 ? 'bg-transparent' : 'bg-rose-200'}`}></div>
                                {/* Dot */}
                                <div className={`w-3 h-3 rounded-full flex-shrink-0 transition-all duration-300 ${
                                    item.is_current 
                                        ? 'bg-rose-500 shadow-[0_0_0_4px_rgba(244,63,94,0.15),0_0_10px_rgba(244,63,94,0.25)]' 
                                        : 'bg-rose-300 group-hover/item:bg-rose-500 group-hover/item:shadow-[0_0_0_3px_rgba(244,63,94,0.1)]'
                                }`}></div>
                                {/* Line below dot */}
                                <div className={`w-[2px] flex-1 ${isLast ? 'bg-gradient-to-b from-rose-200 to-transparent' : 'bg-rose-200'}`}></div>
                            </div>

                            {/* Card */}
                            <div className="flex-1 pb-5 pl-4 md:pl-5">
                                <div
                                    className={`relative rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden
                                        ${item.is_current 
                                            ? 'bg-white shadow-[0_2px_16px_rgba(244,63,94,0.08)] border border-rose-100 hover:shadow-[0_8px_32px_rgba(244,63,94,0.12)] hover:-translate-y-0.5' 
                                            : 'bg-white shadow-sm border border-gray-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 hover:border-gray-200'
                                        }`}
                                    onClick={() => setExpandedId(isExpanded ? null : uniqueId)}
                                >
                                    {/* Left Accent Bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl ${
                                        item.is_current 
                                            ? 'bg-gradient-to-b from-rose-500 to-pink-400' 
                                            : 'bg-gradient-to-b from-rose-200 to-rose-100 group-hover/item:from-rose-400 group-hover/item:to-rose-300'
                                    } transition-all duration-300`}></div>

                                    <div className="p-5 md:p-6 pl-6 md:pl-7">
                                        {/* Top Row: Date Badge + Chevron */}
                                        <div className="flex items-center justify-between mb-2.5">
                                            <div className="flex items-center gap-2.5 flex-wrap">
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-50 text-[11px] font-semibold text-gray-500 tracking-wide">
                                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    {formatDate(item.start_date)} — {item.is_current ? 'Sekarang' : formatDate(item.end_date)}
                                                </span>
                                                {item.is_current && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <div className={`p-1.5 rounded-lg transition-all duration-300 ${isExpanded ? 'bg-rose-50 rotate-180' : 'bg-transparent group-hover/item:bg-gray-50'}`}>
                                                <svg className={`w-4 h-4 transition-colors duration-300 ${isExpanded ? 'text-rose-400' : 'text-gray-300 group-hover/item:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[15px] md:text-lg font-bold text-gray-900 leading-snug group-hover/item:text-rose-600 transition-colors duration-200">
                                            {item.job_title}
                                        </h3>

                                        {/* Organization & Location */}
                                        <div className="flex items-center gap-1.5 mt-1 text-sm flex-wrap">
                                            <svg className="w-3.5 h-3.5 text-rose-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <span className="text-gray-500 font-medium">{item.organization}</span>
                                            {item.location && (
                                                <>
                                                    <span className="text-gray-200 mx-0.5">•</span>
                                                    <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    </svg>
                                                    <span className="text-gray-400">{item.location}</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Preview (collapsed) */}
                                        {!isExpanded && item.description && (
                                            <p className="text-[13px] text-gray-400 line-clamp-1 mt-3">
                                                {item.description.split('\n')[0]}
                                            </p>
                                        )}

                                        {/* Expanded Description */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                            {item.description && (
                                                <div className="pt-3.5 border-t border-gray-100/80">
                                                    <p className="text-[13px] text-gray-600 leading-[1.8] whitespace-pre-line">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <>
            <Head title={`Experience - ${safeProfile.full_name || 'Portfolio'}`}>
                <meta name="description" content="My professional experience, projects, and certifications" />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    {/* Experience Section with Enhanced Cards */}
                    <section className="py-20 md:py-32 pt-28">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            {workExperiences.length > 0 && (
                                <div className="mb-20">
                                    <div className="mb-12 text-center">
                                        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                                            Work <span className="text-rose-500">Experience</span>
                                        </h1>
                                        <p className="text-gray-600 max-w-2xl mx-auto">
                                            Perjalanan profesional dan karir saya
                                        </p>
                                    </div>
                                    {renderTimeline(workExperiences, 'work')}
                                </div>
                            )}

                            {organizationExperiences.length > 0 && (
                                <div>
                                    <div className="mb-12 text-center">
                                        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                                            Organizational <span className="text-rose-500">Experience</span>
                                        </h1>
                                        <p className="text-gray-600 max-w-2xl mx-auto">
                                            Kontribusi dan peran aktif dalam organisasi
                                        </p>
                                    </div>
                                    {renderTimeline(organizationExperiences, 'org')}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Projects Section */}
                    {safeProjects.length > 0 && (
                        <section className="py-20 md:py-32 bg-gray-50">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-12 text-center">
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                        Featured <span className="text-rose-500">Projects</span>
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {safeProjects.map((project, index) => (
                                        <div
                                            key={project.id}
                                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                                transition: `all 0.5s ease ${index * 100}ms`
                                            }}
                                        >
                                            <div className="aspect-video bg-gradient-to-br from-rose-100 to-pink-50 overflow-hidden relative">
                                                {project.image_url ? (
                                                    <img
                                                        src={project.image_url}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <div className="text-center">
                                                            <svg className="w-16 h-16 text-rose-200 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                            </svg>
                                                            <span className="text-rose-300 text-sm font-medium">Project</span>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* Overlay on hover */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                                                    {project.title}
                                                </h3>
                                                {project.description && (
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                )}
                                                {project.tech_stack && (
                                                    <div className="flex flex-wrap gap-2 mb-4">
                                                        {project.tech_stack.split(',').map((tech, i) => (
                                                            <span key={i} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="flex gap-4 pt-4 border-t border-gray-100">
                                                    {project.github_link && (
                                                        <a
                                                            href={project.github_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                            </svg>
                                                            GitHub
                                                        </a>
                                                    )}
                                                    {project.demo_link && (
                                                        <a
                                                            href={project.demo_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                            Live Demo
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Certifications Section */}
                    {safeCertifications.length > 0 && (
                        <section className="py-20 md:py-32">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-16 text-center">
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                        <span className="text-rose-500">Certifications</span> & Awards
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {safeCertifications.map((cert, index) => (
                                        <div
                                            key={cert.id}
                                            className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                                            style={{
                                                opacity: isVisible ? 1 : 0,
                                                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                                                transition: `all 0.5s ease ${index * 100}ms`
                                            }}
                                        >
                                            {/* Decorative gradient */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-pink-50 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>

                                            <div className="relative">
                                                {/* Badge Icon */}
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4 shadow-lg">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                </div>

                                                {/* Year & Status */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-rose-500 font-semibold text-sm">{cert.year}</span>
                                                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-50 text-green-600">
                                                        Aktif
                                                    </span>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                                                    {cert.title}
                                                </h3>

                                                {/* Issuer */}
                                                <p className="text-gray-600 text-sm font-medium mb-2">
                                                    {cert.issuer}
                                                </p>

                                                {/* Credential ID */}
                                                {cert.credential_id && (
                                                    <p className="text-gray-400 text-xs">
                                                        ID: {cert.credential_id}
                                                    </p>
                                                )}

                                                {/* View Link */}
                                                {cert.credential_url && (
                                                    <a
                                                        href={cert.credential_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-rose-500 text-sm mt-4 font-medium hover:underline"
                                                    >
                                                        View Credential
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </PublicLayout>
            </div>
        </>
    );
}
