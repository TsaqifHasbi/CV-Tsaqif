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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Navigation Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-gray-500">
                        ©{currentYear} {profile?.full_name || 'Portfolio'}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
