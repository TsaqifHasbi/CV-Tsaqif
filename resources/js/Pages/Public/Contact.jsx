import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';
import SocialLinks from './Components/SocialLinks';

export default function Contact({
    profile = null,
    socialLinks = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    return (
        <>
            <Head title={`Contact - ${safeProfile.full_name || 'Portfolio'}`}>
                <meta name="description" content="Get in touch with me for collaborations or opportunities" />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    <section className="py-20 md:py-32 pt-28 min-h-screen">
                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="mb-12">
                                <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
                                    Get In <span className="text-rose-500">Touch</span>
                                </h1>
                                <p className="text-lg text-gray-600 max-w-2xl">
                                    Jangan ragu untuk menghubungi saya untuk kolaborasi atau sekedar menyapa
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                                {/* Contact Info */}
                                <div className="space-y-6">
                                    {safeProfile.email && (
                                        <div className="p-6 bg-white border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Email</p>
                                            <a
                                                href={`mailto:${safeProfile.email}`}
                                                className="text-lg text-gray-900 hover:text-rose-500 transition-colors"
                                            >
                                                {safeProfile.email}
                                            </a>
                                        </div>
                                    )}

                                    {safeProfile.phone && (
                                        <div className="p-6 bg-white border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Telepon</p>
                                            <a
                                                href={`tel:${safeProfile.phone}`}
                                                className="text-lg text-gray-900 hover:text-rose-500 transition-colors"
                                            >
                                                {safeProfile.phone}
                                            </a>
                                        </div>
                                    )}

                                    {safeProfile.location && (
                                        <div className="p-6 bg-white border border-gray-200 rounded-xl">
                                            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">Lokasi</p>
                                            <p className="text-lg text-gray-900">{safeProfile.location}</p>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="pt-4">
                                        <p className="text-sm text-gray-500 mb-4">Temukan saya di media sosial</p>
                                        <SocialLinks socialLinks={safeSocialLinks} size="large" />
                                    </div>
                                </div>

                                {/* CTA Card */}
                                <div className="p-8 bg-gray-50 border border-gray-200 rounded-xl text-center flex flex-col justify-center">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                                        Mari Berkolaborasi!
                                    </h3>
                                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                        Saya terbuka untuk peluang kerja, proyek freelance, atau kolaborasi menarik lainnya.
                                    </p>

                                    {safeProfile.email && (
                                        <a
                                            href={`mailto:${safeProfile.email}`}
                                            className="btn-primary mx-auto"
                                        >
                                            Kirim Email
                                        </a>
                                    )}

                                    {safeProfile.cv_file && (
                                        <div className="mt-4">
                                            <a
                                                href={safeProfile.cv_file}
                                                download
                                                className="btn-secondary"
                                            >
                                                Download CV
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </PublicLayout>
            </div>
        </>
    );
}
