export default function Experience({ experiences }) {
    if (!experiences || experiences.length === 0) return null;

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section id="experience" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
                    <p className="section-subtitle mx-auto">Professional journey and career milestones</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {experiences.map((item, index) => (
                        <div key={item.id} className="glass-card p-6 md:p-8 rounded-xl card-hover group">
                            <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                                    <svg className="w-7 h-7 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                        <div>
                                            <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">{item.job_title}</h3>
                                            <p className="text-gray-400 font-medium mt-1">{item.organization}</p>
                                        </div>
                                        {item.is_current && <span className="badge bg-green-500/10 text-green-400 border-green-500/20">Current</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                                        <span>{formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}</span>
                                        {item.location && <span>{item.location}</span>}
                                    </div>
                                    {item.description && <p className="text-gray-400 leading-relaxed whitespace-pre-line text-sm">{item.description}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
