import Navigation from './Navigation';
import Footer from './Footer';

export default function PublicLayout({ children, profile, socialLinks, fullHeight = false }) {
    return (
        <div className={`bg-white flex flex-col ${fullHeight ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
            {/* Navigation */}
            <Navigation profile={profile} />

            {/* Main Content */}
            <main className={`flex-1 flex flex-col ${fullHeight ? 'pt-20' : ''}`}>
                {children}
            </main>

            {/* Footer */}
            <Footer profile={profile} />
        </div>
    );
}
