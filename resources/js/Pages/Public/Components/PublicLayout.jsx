import Navigation from './Navigation';
import Footer from './Footer';

export default function PublicLayout({ children, profile, socialLinks }) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Navigation */}
            <Navigation profile={profile} />

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <Footer profile={profile} />
        </div>
    );
}
