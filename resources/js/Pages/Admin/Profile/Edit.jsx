import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Edit({ profile }) {
    const [photoPreview, setPhotoPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        full_name: profile?.full_name || '',
        headline: profile?.headline || '',
        short_intro: profile?.short_intro || '',
        biography: profile?.biography || '',
        email: profile?.email || '',
        phone: profile?.phone || '',
        location: profile?.location || '',
        website: profile?.website || '',
        profile_photo: null,
        cv_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.profile.update'), { forceFormData: true });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout title="Edit Profile">
            <Head title="Edit Profile" />
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Photo & CV</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Profile Photo</label>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                                    {photoPreview || profile?.profile_photo ? (
                                        <img src={photoPreview || profile.profile_photo} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500"><svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg></div>
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="form-input text-sm" />
                            </div>
                            {errors.profile_photo && <p className="text-red-500 text-sm mt-1">{errors.profile_photo}</p>}
                        </div>
                        <div>
                            <label className="form-label">CV File (PDF)</label>
                            {profile?.cv_file && <p className="text-sm text-gray-500 mb-2">Current: <a href={profile.cv_file} target="_blank" className="text-rose-500 hover:underline">View CV</a></p>}
                            <input type="file" accept=".pdf" onChange={(e) => setData('cv_file', e.target.files[0])} className="form-input text-sm" />
                            {errors.cv_file && <p className="text-red-500 text-sm mt-1">{errors.cv_file}</p>}
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Full Name *</label>
                            <input type="text" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)} className="form-input" required />
                            {errors.full_name && <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>}
                        </div>
                        <div>
                            <label className="form-label">Headline</label>
                            <input type="text" value={data.headline} onChange={(e) => setData('headline', e.target.value)} className="form-input" placeholder="e.g., Full Stack Developer" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="form-label">Short Introduction</label>
                            <textarea value={data.short_intro} onChange={(e) => setData('short_intro', e.target.value)} className="form-input" rows="3" placeholder="A brief introduction for the hero section"></textarea>
                        </div>
                        <div className="md:col-span-2">
                            <label className="form-label">Biography</label>
                            <textarea value={data.biography} onChange={(e) => setData('biography', e.target.value)} className="form-input" rows="6" placeholder="Detailed biography for the About section"></textarea>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Email</label><input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Phone</label><input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Location</label><input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Website</label><input type="url" value={data.website} onChange={(e) => setData('website', e.target.value)} className="form-input" /></div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Profile'}</button>
                </div>
            </form>
        </AdminLayout>
    );
}
