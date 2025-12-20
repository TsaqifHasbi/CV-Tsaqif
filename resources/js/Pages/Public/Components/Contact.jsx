import SocialLinks from './SocialLinks';

export default function Contact({ profile, socialLinks }) {
    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="section-title">Get In <span className="gradient-text">Touch</span></h2>
                    <p className="section-subtitle mx-auto">Feel free to reach out for collaborations or just a friendly hello</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="glass-card p-8 md:p-12 rounded-2xl text-center">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                            <svg className="w-10 h-10 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white mb-4">Let's Work Together</h3>
                        <p className="text-gray-400 mb-8">I'm currently available for freelance work and full-time positions. If you have a project that needs some creative touch, I'd love to hear about it.</p>

                        {profile?.email && (
                            <a href={`mailto:${profile.email}`} className="btn-primary text-lg px-8 py-4 mb-8 inline-flex">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {profile.email}
                            </a>
                        )}

                        <div className="pt-8 border-t border-dark-700">
                            <p className="text-gray-500 text-sm mb-4">Or find me on social media</p>
                            <div className="flex justify-center">
                                <SocialLinks socialLinks={socialLinks} size="large" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
