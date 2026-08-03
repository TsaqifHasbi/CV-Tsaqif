import { Link } from '@inertiajs/react';

export default function Footer({ profile }) {
    const currentYear = new Date().getFullYear();

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/education', label: 'Education' },
        { href: '/experience', label: 'Experience' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <footer className="border-t border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-xs sm:text-sm text-gray-500 text-center">
                        ©{currentYear} {profile?.full_name || 'Portfolio'}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
