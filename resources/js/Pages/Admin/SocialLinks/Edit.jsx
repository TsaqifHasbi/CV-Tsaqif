import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ socialLink, platforms }) {
    const { data, setData, put, processing } = useForm({ platform: socialLink.platform || '', url: socialLink.url || '', icon: socialLink.icon || '', order: socialLink.order || 0, is_active: socialLink.is_active ?? true });
    const handleSubmit = (e) => { e.preventDefault(); put(route('admin.social-links.update', socialLink.id)); };

    return (
        <AdminLayout title="Edit Social Link">
            <Head title="Edit Social Link" />
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div><label className="form-label">Platform *</label><select value={data.platform} onChange={(e) => setData('platform', e.target.value)} className="form-input" required><option value="">Select platform...</option>{Object.entries(platforms).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></div>
                    <div><label className="form-label">URL *</label><input type="text" value={data.url} onChange={(e) => setData('url', e.target.value)} className="form-input" required /></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded bg-dark-700 border-dark-600" /><label htmlFor="is_active" className="text-gray-300">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Link'}</button><Link href={route('admin.social-links.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
