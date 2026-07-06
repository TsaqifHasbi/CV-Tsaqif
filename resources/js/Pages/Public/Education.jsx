import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';

export default function Education({
    profile = null,
    socialLinks = [],
    education = [],
    skills = {},
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        setTimeout(() => setIsVisible(true), 300);
    }, []);

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];
    const safeEducation = Array.isArray(education) ? education : [];
    const safeSkills = (skills && typeof skills === 'object' && !Array.isArray(skills)) ? skills : {};

    const categoryColors = {
        'Desain UI/UX': 'from-pink-400 to-rose-400',
        'Pengembangan Web': 'from-blue-400 to-cyan-400',
        'JavaScript Frameworks': 'from-yellow-400 to-orange-400',
        'Framework Frontend': 'from-purple-400 to-pink-400',
        'Framework Backend': 'from-red-400 to-orange-400',
        'Pemrograman Logika': 'from-green-400 to-emerald-400',
        'Database & SQL': 'from-cyan-400 to-blue-400',
        'Version Control': 'from-gray-400 to-slate-400',
        'Digital Marketing': 'from-indigo-400 to-violet-400',
        'SEO': 'from-teal-400 to-cyan-400',
        'Microsoft Office': 'from-blue-500 to-blue-400',
    };

    const getCategoryColor = (category) => categoryColors[category] || 'from-rose-400 to-pink-400';

    return (
        <>
            <Head title={`Education & Skills - ${safeProfile.full_name || 'Portfolio'}`}>
                <meta name="description" content="My educational background and technical skills" />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    {/* Education Section */}
                    <section className="py-20 md:py-32 pt-28">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-16">
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                                    <span className="text-rose-500">Education</span>
                                </h1>
                            </div>

                            {/* Timeline */}
                            {safeEducation.length > 0 && (
                                <div className="relative max-w-3xl">
                                    {/* Timeline Line */}
                                    <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-rose-500 via-rose-300 to-rose-100"></div>

                                    {/* Timeline Items */}
                                    <div className="space-y-12">
                                        {safeEducation.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="relative pl-10 group"
                                                style={{
                                                    opacity: isVisible ? 1 : 0,
                                                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                                                    transition: `all 0.5s ease ${index * 150}ms`
                                                }}
                                            >
                                                {/* Timeline Dot */}
                                                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-[3px] border-rose-500 group-hover:scale-125 group-hover:bg-rose-500 transition-all duration-300 shadow-sm">
                                                    {/* Inner Pulse Animation */}
                                                    <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-20"></div>
                                                </div>

                                                {/* Content */}
                                                <div className="group-hover:translate-x-1 transition-transform duration-300">
                                                    {/* Date */}
                                                    <p className="text-rose-500 font-semibold text-sm mb-1">
                                                        {item.start_year} - {item.end_year || 'Sekarang'}
                                                    </p>

                                                    {/* Institution */}
                                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                        {item.institution}
                                                    </h3>

                                                    {/* Degree */}
                                                    <p className="text-gray-700 font-medium">
                                                        {item.degree}
                                                        {item.field_of_study && ` - ${item.field_of_study}`}
                                                    </p>

                                                    {/* GPA Badge */}
                                                    {item.gpa && (
                                                        <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-rose-50 text-rose-600 border border-rose-200">
                                                            IPK: {item.gpa}
                                                        </span>
                                                    )}

                                                    {/* Description */}
                                                    {item.description && (
                                                        <p className="mt-3 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills Section */}
                    {Object.keys(safeSkills).length > 0 && (
                        <section className="py-20 md:py-32 bg-gray-50 overflow-hidden">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                                <div>
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-2">
                                        My <span className="text-rose-500">Skills</span>
                                    </h2>
                                    <p className="text-gray-500 text-sm">Hover over logos to pause scrolling</p>
                                </div>
                            </div>

                            <div className="space-y-12">
                                {Object.entries(safeSkills).map(([category, categorySkills], categoryIndex) => {
                                    const isOdd = categoryIndex % 2 === 0; // 1st is odd (index 0) -> scroll right, 2nd is even (index 1) -> scroll left

                                    // Helper to duplicate skills for seamless looping
                                    const getDuplicatedSkills = (items) => {
                                        if (!items || items.length === 0) return [];
                                        let duplicated = [...items];
                                        while (duplicated.length < 12) {
                                            duplicated = [...duplicated, ...items];
                                        }
                                        return [...duplicated, ...duplicated];
                                    };

                                    const duplicatedList = getDuplicatedSkills(categorySkills);

                                    return (
                                        <div key={category} className="space-y-4">
                                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                                <h3 className="text-lg font-bold text-gray-800 border-l-4 border-rose-500 pl-3">
                                                    {category}
                                                </h3>
                                            </div>

                                            <div className="w-full marquee-container">
                                                <div className={isOdd ? 'marquee-track-right' : 'marquee-track-left'}>
                                                    {duplicatedList.map((skill, idx) => (
                                                        <div
                                                            key={`${skill.id || idx}-${idx}`}
                                                            className="inline-flex items-center gap-3 px-5 py-3 mx-3 bg-white border border-gray-150 rounded-xl shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300 cursor-default"
                                                        >
                                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
                                                                {skill.logo_url ? (
                                                                    <img
                                                                        src={skill.logo_url}
                                                                        alt={skill.name}
                                                                        className="w-6 h-6 object-contain"
                                                                    />
                                                                ) : (
                                                                    <span className="text-xs font-bold text-rose-500 bg-rose-50 w-full h-full flex items-center justify-center">
                                                                        {skill.name.substring(0, 2).toUpperCase()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">
                                                                {skill.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </PublicLayout>
            </div>
        </>
    );
}
