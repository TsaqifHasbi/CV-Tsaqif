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
                        <section className="py-20 md:py-32 bg-gray-50">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-12">
                                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                                        My <span className="text-rose-500">Skills</span>
                                    </h2>
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Object.entries(safeSkills).map(([category, categorySkills]) => (
                                        <div key={category} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                                {category}
                                            </h3>
                                            <div className="space-y-4">
                                                {categorySkills.map((skill, index) => (
                                                    <div key={skill.id || index}>
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-gray-700 text-sm">{skill.name}</span>
                                                            <span className="text-gray-400 text-sm">{skill.proficiency_level}%</span>
                                                        </div>
                                                        <div className="skill-bar">
                                                            <div
                                                                className={`skill-progress bg-gradient-to-r ${getCategoryColor(category)}`}
                                                                style={{
                                                                    width: isVisible ? `${skill.proficiency_level}%` : '0%',
                                                                    transitionDelay: `${index * 100}ms`
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                ))}
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
