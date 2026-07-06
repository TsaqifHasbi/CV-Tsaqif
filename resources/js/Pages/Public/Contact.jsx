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
                title: 'Berhasil!',
                text: flash.success,
                icon: 'success',
                confirmButtonColor: '#f43f5e',
            });
        }
        if (flash?.error) {
            Swal.fire({
                title: 'Gagal',
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

                                {/* Contact Form */}
                                <div className="p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
                                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-6">
                                        Kirim Pesan
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
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                                placeholder="Masukkan nama Anda"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                                Alamat Email
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
                                                Pesan
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={data.message}
                                                onChange={e => setData('message', e.target.value)}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                                                placeholder="Tulis pesan Anda di sini..."
                                            ></textarea>
                                            {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`w-full py-3 px-6 text-white bg-rose-500 hover:bg-rose-600 rounded-lg font-medium transition-colors duration-200 ${processing ? 'opacity-75 cursor-not-allowed' : ''}`}
                                        >
                                            {processing ? 'Mengirim...' : 'Kirim Pesan'}
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
