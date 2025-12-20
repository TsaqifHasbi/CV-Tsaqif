import SocialLinks from './SocialLinks';

export default function Footer({ profile, socialLinks }) {
    const currentYear = new Date().getFullYear();

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'education', label: 'Education' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'projects', label: 'Projects' },
        { id: 'certifications', label: 'Certifications' },
        { id: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark-900 border-t border-dark-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                                {profile?.full_name?.charAt(0) || 'P'}
                            </span>
                            <span className="text-xl font-display font-bold text-white">{profile?.full_name?.split(' ')[0] || 'Portfolio'}</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4">{profile?.headline || 'Building amazing digital experiences'}</p>
                        <SocialLinks socialLinks={socialLinks} />
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <nav className="grid grid-cols-2 gap-2">
                            {navItems.map(item => (
                                <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-gray-400 text-sm hover:text-primary-400 transition-colors text-left">
                                    {item.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2 text-sm text-gray-400">
                            {profile?.email && <p>{profile.email}</p>}
                            {profile?.phone && <p>{profile.phone}</p>}
                            {profile?.location && <p>{profile.location}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-dark-700/50 text-center">
                    <p className="text-gray-500 text-sm">© {currentYear} {profile?.full_name || 'Portfolio'}. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
