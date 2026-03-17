import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function Edit({ certification }) {
    const { data, setData, post, processing } = useForm({ title: certification.title || '', issuer: certification.issuer || '', year: certification.year || '', credential_id: certification.credential_id || '', credential_url: certification.credential_url || '', description: certification.description || '', image: null, order: certification.order || 0, is_active: certification.is_active ?? true, _method: 'PUT' });
    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.certifications.update', certification.id), { forceFormData: true }); };
    const deleteImage = () => { if (confirm('Delete image?')) router.delete(route('admin.certifications.delete-image', certification.id)); };

    return (
        <AdminLayout title="Edit Certification">
            <Head title="Edit Certification" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Title *</label><input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Issuer *</label><input type="text" value={data.issuer} onChange={(e) => setData('issuer', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Year *</label><input type="text" value={data.year} onChange={(e) => setData('year', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Credential ID</label><input type="text" value={data.credential_id} onChange={(e) => setData('credential_id', e.target.value)} className="form-input" /></div>
                        <div className="md:col-span-2"><label className="form-label">Credential URL</label><input type="url" value={data.credential_url} onChange={(e) => setData('credential_url', e.target.value)} className="form-input" /></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="3"></textarea></div>
                    <div><label className="form-label">Certificate Image</label>{certification.image && <div className="flex items-center gap-4 mb-2"><img src={`/storage/${certification.image}`} alt="Certificate" className="h-20 rounded" /><button type="button" onClick={deleteImage} className="text-red-500 text-sm hover:underline">Remove</button></div>}<input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files[0])} className="form-input text-sm" /></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Certification'}</button><Link href={route('admin.certifications.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
