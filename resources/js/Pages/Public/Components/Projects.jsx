import { useState } from 'react';

export default function Projects({ projects }) {
    const [filter, setFilter] = useState('all');

    if (!projects || projects.length === 0) return null;

    const categories = ['all', ...new Set(projects.filter(p => p.category).map(p => p.category))];
    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle mx-auto">Showcase of my recent work and side projects</p>
                </div>

                {categories.length > 1 && (
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilter(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? 'bg-primary-500 text-white' : 'bg-dark-700/50 text-gray-400 hover:text-white'}`}>
                                {cat === 'all' ? 'All Projects' : cat}
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((project) => (
                        <div key={project.id} className="glass-card rounded-xl overflow-hidden card-hover group">
                            <div className="aspect-video bg-dark-700 overflow-hidden">
                                {project.image ? (
                                    <img src={`/storage/${project.image}`} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
                                    {project.is_featured && <span className="badge">Featured</span>}
                                </div>
                                {project.description && <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>}
                                {project.tech_stack && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech_stack.split(',').slice(0, 4).map((tech, i) => (
                                            <span key={i} className="px-2 py-1 text-xs bg-dark-700 text-gray-400 rounded">{tech.trim()}</span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-3">
                                    {project.github_link && (
                                        <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="btn-icon w-9 h-9">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                    )}
                                    {project.demo_link && (
                                        <a href={project.demo_link} target="_blank" rel="noopener noreferrer" className="btn-icon w-9 h-9">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
