import { Head, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import PublicLayout from './Components/PublicLayout';
import SocialLinks from './Components/SocialLinks';
import Swal from 'sweetalert2';

export default function Contact({
    profile = null,
    socialLinks = [],
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        message: '',
        _honey: ''
    });

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                title: 'Success!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#f43f5e',
            });
        }
        if (flash?.error) {
            Swal.fire({
                title: 'Error',
                text: flash.error,
                icon: 'error',
                confirmButtonColor: '#f43f5e',
            });
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.send'), {
            onSuccess: () => reset('name', 'email', 'message', '_honey'),
        });
    };

    const safeProfile = profile || {};
    const safeSocialLinks = Array.isArray(socialLinks) ? socialLinks : [];

    return (
        <>
            <Head title={`Contact - ${safeProfile.full_name || 'Portfolio'}`}>
                <meta name="description" content="Get in touch with me for collaborations or opportunities" />
            </Head>

            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <PublicLayout profile={safeProfile} socialLinks={safeSocialLinks}>
                    <section className="py-12 sm:py-20 md:py-32 pt-20 sm:pt-28 min-h-screen">
                        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
                            <div className="mb-8 sm:mb-12">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
                                    Get In <span className="text-rose-500">Touch</span>
                                </h1>
                                <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
                                    Feel free to reach out to me for collaborations, opportunities, or just to say hi!
                                </p>
                            </div>

                            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                                {/* Contact Info */}
                                <div className="space-y-3.5 sm:space-y-4">
                                    {safeProfile.email && (
                                        <div className="p-4 sm:p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex items-center gap-4 group">
                                            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                                                <a
                                                    href={`mailto:${safeProfile.email}`}
                                                    className="text-base font-semibold text-gray-900 hover:text-rose-500 transition-colors truncate block"
                                                >
                                                    {safeProfile.email}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {safeProfile.phone && (
                                        <div className="p-4 sm:p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex items-center gap-4 group">
                                            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Phone</p>
                                                <a
                                                    href={`tel:${safeProfile.phone}`}
                                                    className="text-base font-semibold text-gray-900 hover:text-rose-500 transition-colors truncate block"
                                                >
                                                    {safeProfile.phone}
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    {safeProfile.location && (
                                        <div className="p-4 sm:p-5 bg-white border border-gray-200/80 rounded-2xl shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 flex items-center gap-4 group">
                                            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Location</p>
                                                <p className="text-base font-semibold text-gray-900 truncate">{safeProfile.location}</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Social Links */}
                                    <div className="pt-2 sm:pt-3">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Find me on social media</p>
                                        <SocialLinks socialLinks={safeSocialLinks} size="large" />
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <div className="p-5 sm:p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                        Send Message
                                    </h3>

                                    <form onSubmit={submit} className="space-y-6">
                                        {/* Honeypot for spam protection */}
                                        <input 
                                            type="text" 
                                            name="_honey" 
                                            style={{ display: 'none' }} 
                                            value={data._honey}
                                            onChange={e => setData('_honey', e.target.value)}
                                        />

                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                                placeholder="Enter your name"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                                placeholder="example@gmail.com"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                                Message
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                                placeholder="Write your message here..."
                                            ></textarea>
                                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full py-3 px-6 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition-colors duration-200 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        >
                                            {processing ? 'Sending...' : 'Send Message'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </PublicLayout>
            </div>
        </>
    );
}
