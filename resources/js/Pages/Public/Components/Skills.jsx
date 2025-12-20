import { useState, useEffect } from 'react';

export default function Skills({ skills }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        const element = document.getElementById('skills');
        if (element) observer.observe(element);
        return () => observer.disconnect();
    }, []);

    if (!skills || typeof skills !== 'object' || Object.keys(skills).length === 0) return null;

    const categoryColors = {
        'Programming': 'from-blue-500 to-cyan-500',
        'Framework': 'from-purple-500 to-pink-500',
        'Tools': 'from-orange-500 to-yellow-500',
        'Database': 'from-green-500 to-emerald-500',
        'Soft Skill': 'from-rose-500 to-pink-500',
        'Language': 'from-indigo-500 to-violet-500',
    };

    const getCategoryColor = (category) => categoryColors[category] || 'from-primary-500 to-accent-500';

    return (
        <section id="skills" className="py-20 md:py-32 bg-dark-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
                    <p className="section-subtitle mx-auto">Technologies and tools I work with</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {Object.entries(skills).map(([category, categorySkills], catIndex) => (
                        <div key={category} className="glass-card p-6 rounded-xl">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></span>
                                {category}
                            </h3>
                            <div className="space-y-4">
                                {categorySkills.map((skill, index) => (
                                    <div key={skill.id}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-300 text-sm">{skill.name}</span>
                                            <span className="text-gray-500 text-sm">{skill.proficiency_level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <div
                                                className={`skill-progress bg-gradient-to-r ${getCategoryColor(category)}`}
                                                style={{ width: isVisible ? `${skill.proficiency_level}%` : '0%', transitionDelay: `${index * 100}ms` }}
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
    );
}
