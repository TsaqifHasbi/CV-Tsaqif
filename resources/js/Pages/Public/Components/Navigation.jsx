import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function Navigation({ profile }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/education', label: 'Education' },
        { href: '/experience', label: 'Experience' },
        { href: '/contact', label: 'Contact' },
        { href: 'https://teknocode01.wordpress.com/', label: 'Blog', external: true }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change or resize
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [url]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    const isActive = (href) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Pill Navigation - hidden on mobile */}
                <nav className="hidden lg:flex justify-center">
                    <div className={`inline-flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-300 ${isScrolled
                            ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-lg'
                            : 'bg-white border-gray-200 shadow-sm'
                        }`}>
                        {navItems.map((item) => (
                            item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${isActive(item.href)
                                            ? 'text-rose-500'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>
                </nav>

                {/* Mobile Header Bar */}
                <div className="flex lg:hidden items-center justify-between">
                    {/* Logo / Name */}
                    <Link href="/" className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${isScrolled
                            ? 'bg-white/90 backdrop-blur-md shadow-md border border-gray-200'
                            : 'bg-white shadow-sm border border-gray-200'
                        }`}>
                        <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white font-bold text-xs">
                            {profile?.full_name?.charAt(0) || 'P'}
                        </span>
                        <span className="font-display font-semibold text-gray-900 text-sm">
                            {profile?.nickname || profile?.full_name?.split(' ')[0] || 'Portfolio'}
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`relative z-50 p-2.5 rounded-full border transition-all duration-300 ${isMobileMenuOpen
                                ? 'bg-rose-50 border-rose-200 text-rose-500'
                                : isScrolled
                                    ? 'bg-white/90 backdrop-blur-md border-gray-200 shadow-md text-gray-600 hover:text-gray-900'
                                    : 'bg-white border-gray-200 shadow-sm text-gray-600 hover:text-gray-900'
                            }`}
                        aria-label="Toggle navigation menu"
                    >
                        <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>

                {/* Menu Panel */}
                <nav className={`absolute top-16 left-3 right-3 sm:left-4 sm:right-4 bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-[0.98]'
                    }`}>
                    <div className="p-2">
                        {navItems.map((item, index) => (
                            item.external ? (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200 ${isActive(item.href)
                                            ? 'bg-rose-50 text-rose-500'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 active:bg-gray-100'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>
                </nav>
            </div>
        </header>
    );
}
