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

    const workExperiences = safeExperiences.filter(exp => exp.organization && exp.organization.toLowerCase().includes('sari teknologi'));
    const organizationExperiences = safeExperiences.filter(exp => !(exp.organization && exp.organization.toLowerCase().includes('sari teknologi')));

    const formatDate = (dateString) => {
        if (!dateString) return 'Sekarang';
        const date = new Date(dateString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
    };

    // Icons for different types of work
    const getWorkIcon = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('asisten') || lowerTitle.includes('lab')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            );
        }
        if (lowerTitle.includes('ketua') || lowerTitle.includes('lead') || lowerTitle.includes('koordinator')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            );
        }
        if (lowerTitle.includes('staff')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            );
        }
        if (lowerTitle.includes('seo') || lowerTitle.includes('marketing')) {
            return (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            );
        }
        return (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        );
    };

    // Color variants for cards
    const cardColors = [
        { bg: 'from-rose-50 to-pink-50', border: 'border-rose-200', accent: 'bg-rose-500', text: 'text-rose-600' },
        { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', accent: 'bg-blue-500', text: 'text-blue-600' },
        { bg: 'from-amber-50 to-orange-50', border: 'border-amber-200', accent: 'bg-amber-500', text: 'text-amber-600' },
        { bg: 'from-emerald-50 to-green-50', border: 'border-emerald-200', accent: 'bg-emerald-500', text: 'text-emerald-600' },
        { bg: 'from-violet-50 to-purple-50', border: 'border-violet-200', accent: 'bg-violet-500', text: 'text-violet-600' },
    ];

    const renderTimeline = (items, prefix) => {
        if (!items || items.length === 0) return null;
        
        return (
            <div className="relative">
                {/* Center Timeline Line */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-500 from-[95%] to-rose-500/20 rounded-full"></div>

                {/* Mobile Timeline Line */}
                <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-500 from-[95%] to-rose-500/20"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                    {items.map((item, index) => {
                        const colorScheme = cardColors[index % cardColors.length];
                        const isEven = index % 2 === 0;
                        const uniqueId = `${prefix}-${item.id}`;
                        const isExpanded = expandedId === uniqueId;

                        return (
                            <div
                                key={item.id}
                                className={`relative flex items-start ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                style={{
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 150}ms`
                                }}
                            >
                                {/* Timeline Dot - Center */}
                                <div className="hidden md:flex absolute left-1/2 top-8 transform -translate-x-1/2 z-10">
                                    <div className="w-5 h-5 rounded-full bg-rose-500 border-4 border-white shadow-md"></div>
                                </div>

                                {/* Mobile Timeline Dot */}
                                <div className="md:hidden absolute left-2 top-8 transform -translate-x-1/2 z-10">
                                    <div className="w-5 h-5 rounded-full bg-rose-500 border-4 border-white shadow-md"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[calc(50%-40px)] ${isEven ? 'md:pr-8' : 'md:pl-8'} pl-10 md:pl-0`}>
                                    <div
                                        className={`bg-gradient-to-br ${colorScheme.bg} border ${colorScheme.border} rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                                        onClick={() => setExpandedId(isExpanded ? null : uniqueId)}
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                {/* Date Badge */}
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${colorScheme.text} bg-white shadow-sm`}>
                                                        {formatDate(item.start_date)} - {item.is_current ? 'Sekarang' : formatDate(item.end_date)}
                                                    </span>
                                                    {item.is_current && (
                                                        <span className="relative flex h-3 w-3">
                                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Job Title */}
                                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors">
                                                    {item.job_title}
                                                </h3>

                                                {/* Organization */}
                                                <p className="text-gray-700 font-semibold flex items-center gap-2">
                                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    {item.organization}
                                                </p>

                                                {/* Location */}
                                                {item.location && (
                                                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {item.location}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Expand Icon */}
                                            <button className={`p-2 rounded-full bg-white shadow-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>
                                        </div>

                                        {/* Description - Expandable */}
                                        <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            {item.description && (
                                                <div className="pt-4 border-t border-gray-200/50">
                                                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Preview Description (when collapsed) */}
                                        {!isExpanded && item.description && (
                                            <p className="text-gray-500 text-sm line-clamp-2 mt-3">
                                                {item.description.split('\n')[0]}
                                            </p>
                                        )}

                                        {/* Click hint */}
                                        <p className="text-xs text-gray-400 mt-3 text-center">
                                            {isExpanded ? 'Klik untuk menutup' : 'Klik untuk detail'}
                                        </p>
                                    </div>
                                </div>

                                {/* Empty space for alternating layout */}
                                <div className="hidden md:block w-[calc(50%-40px)]"></div>
                            </div>
                        );
                    })}
                </div>
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
                                                {project.image ? (
                                                    <img
                                                        src={`/storage/${project.image}`}
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
