import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ certification }) {
    const formatDate = (d) => d ? new Date(d).toISOString().split('T')[0] : '';

    const { data, setData, post, processing, errors } = useForm({
        title: certification.title || '',
        issuer: certification.issuer || '',
        year: certification.year || '',
        credential_id: certification.credential_id || '',
        credential_url: certification.credential_url || '',
        description: certification.description || '',
        image: null,
        valid_from: formatDate(certification.valid_from),
        valid_until: formatDate(certification.valid_until),
        order: certification.order || 0,
        is_active: certification.is_active ?? true,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.certifications.update', certification.id), { forceFormData: true });
    };

    const deleteImage = () => {
        if (confirm('Delete image?')) router.delete(route('admin.certifications.delete-image', certification.id));
    };

    const hasExpiry = !!data.valid_until;
    const isExpired = hasExpiry && new Date(data.valid_until) < new Date(new Date().toDateString());

    return (
        <AdminLayout title="Edit Certification">
            <Head title="Edit Certification" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Title *</label>
                            <input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="form-input" required />
                        </div>
                        <div>
                            <label className="form-label">Issuer *</label>
                            <input type="text" value={data.issuer} onChange={(e) => setData('issuer', e.target.value)} className="form-input" required />
                        </div>
                        <div>
                            <label className="form-label">Year *</label>
                            <input type="text" value={data.year} onChange={(e) => setData('year', e.target.value)} className="form-input" required />
                        </div>
                        <div>
                            <label className="form-label">Credential ID</label>
                            <input type="text" value={data.credential_id} onChange={(e) => setData('credential_id', e.target.value)} className="form-input" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="form-label">Credential URL</label>
                            <input type="url" value={data.credential_url} onChange={(e) => setData('credential_url', e.target.value)} className="form-input" />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Description</label>
                        <textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="3"></textarea>
                    </div>

                    <div>
                        <label className="form-label">Certificate Image</label>
                        {certification.image_url && (
                            <div className="flex items-center gap-4 mb-2">
                                <img src={certification.image_url} alt="Certificate" className="h-20 rounded" />
                                <button type="button" onClick={deleteImage} className="text-red-500 text-sm hover:underline">Remove</button>
                            </div>
                        )}
                        <input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} className="form-input text-sm" />
                    </div>

                    {/* Validity Period */}
                    <div className="border border-gray-200 rounded-lg p-4 space-y-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <h3 className="font-semibold text-gray-700">Validity Period</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="form-label">Valid From</label>
                                <input type="date" value={data.valid_from} onChange={(e) => setData('valid_from', e.target.value)} className="form-input" />
                                {errors.valid_from && <p className="text-red-500 text-sm mt-1">{errors.valid_from}</p>}
                            </div>
                            <div>
                                <label className="form-label">Valid Until</label>
                                <input type="date" value={data.valid_until} onChange={(e) => setData('valid_until', e.target.value)} className="form-input" />
                                {errors.valid_until && <p className="text-red-500 text-sm mt-1">{errors.valid_until}</p>}
                            </div>
                        </div>
                        {hasExpiry && (
                            <div className={`flex items-center gap-2 text-sm px-3 py-2 rounded-lg ${isExpired ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    {isExpired ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    )}
                                </svg>
                                <span>{isExpired ? 'Certificate has expired — will be automatically set as expired' : 'Certificate is still valid — will be automatically set as active'}</span>
                            </div>
                        )}
                        <p className="text-xs text-gray-400">Leave empty if the certificate has no expiry (lifetime validity)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Order</label>
                            <input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" />
                        </div>
                        {!hasExpiry && (
                            <div className="flex items-center gap-2 pt-8">
                                <input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" />
                                <label htmlFor="is_active" className="text-gray-700">Active</label>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Certification'}</button>
                    <Link href={route('admin.certifications.index')} className="btn-secondary">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
