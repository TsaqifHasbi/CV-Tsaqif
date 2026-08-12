export default function Certifications({ certifications }) {
    if (!certifications || certifications.length === 0) return null;

    return (
        <section id="certifications" className="py-20 md:py-32 bg-dark-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">Certifications & <span className="gradient-text">Awards</span></h2>
                    <p className="section-subtitle mx-auto">Recognition and professional certifications</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <div key={cert.id} className={`glass-card p-6 rounded-xl card-hover group relative ${cert.validity_status === 'expired' ? 'opacity-75' : ''}`}>
                            {cert.validity_status === 'expired' && (
                                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wider">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01" /></svg>
                                    Expired
                                </span>
                            )}
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cert.validity_status === 'expired' ? 'bg-gradient-to-br from-red-500/20 to-orange-500/20' : 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'}`}>
                                    <svg className={`w-6 h-6 ${cert.validity_status === 'expired' ? 'text-red-400' : 'text-yellow-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="text-xs text-gray-500">{cert.year}</span>
                                    <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors mt-1">{cert.title}</h3>
                                    <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                                    {(cert.valid_from || cert.valid_until) && (
                                        <div className={`inline-flex items-center gap-1.5 text-xs mt-2 px-2 py-1 rounded-md ${cert.validity_status === 'expired' ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'}`}>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>
                                                {cert.validity_status === 'expired' ? 'Expired' : 'Valid'}:{' '}
                                                {cert.valid_from ? new Date(cert.valid_from).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                                {' – '}
                                                {cert.valid_until ? new Date(cert.valid_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Present'}
                                            </span>
                                        </div>
                                    )}
                                    {cert.description && <p className="text-gray-500 text-sm mt-3 line-clamp-2">{cert.description}</p>}
                                    {cert.credential_url && (
                                        <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary-400 text-sm mt-3 hover:underline">
                                            View Credential
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
