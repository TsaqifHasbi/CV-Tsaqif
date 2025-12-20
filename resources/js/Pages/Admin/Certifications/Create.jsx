import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({ title: '', issuer: '', year: new Date().getFullYear().toString(), credential_id: '', credential_url: '', description: '', image: null, order: 0, is_active: true });
    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.certifications.store'), { forceFormData: true }); };

    return (
        <AdminLayout title="Add Certification">
            <Head title="Add Certification" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Title *</label><input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="form-input" required placeholder="e.g., AWS Solutions Architect" />{errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}</div>
                        <div><label className="form-label">Issuer *</label><input type="text" value={data.issuer} onChange={(e) => setData('issuer', e.target.value)} className="form-input" required placeholder="e.g., Amazon Web Services" /></div>
                        <div><label className="form-label">Year *</label><input type="text" value={data.year} onChange={(e) => setData('year', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Credential ID</label><input type="text" value={data.credential_id} onChange={(e) => setData('credential_id', e.target.value)} className="form-input" /></div>
                        <div className="md:col-span-2"><label className="form-label">Credential URL</label><input type="url" value={data.credential_url} onChange={(e) => setData('credential_url', e.target.value)} className="form-input" placeholder="https://..." /></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="3"></textarea></div>
                    <div><label className="form-label">Certificate Image</label><input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} className="form-input text-sm" /></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded bg-dark-700 border-dark-600" /><label htmlFor="is_active" className="text-gray-300">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Certification'}</button><Link href={route('admin.certifications.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
