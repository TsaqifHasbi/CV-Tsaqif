import Navigation from './Navigation';
import Footer from './Footer';

export default function PublicLayout({ children, profile, socialLinks, fullHeight = false }) {
    return (
        <div className={`bg-white flex flex-col ${fullHeight ? 'min-h-screen lg:h-screen lg:overflow-hidden' : 'min-h-screen'}`}>
            {/* Navigation */}
            <Navigation profile={profile} />

            {/* Main Content */}
            <main className={`flex-1 flex flex-col ${fullHeight ? 'pt-16 sm:pt-20' : ''}`}>
                {children}
            </main>

            {/* Footer - Hidden on fullHeight (Hero page) on desktop, always visible on mobile */}
            {!fullHeight && <Footer profile={profile} />}
        </div>
    );
}
