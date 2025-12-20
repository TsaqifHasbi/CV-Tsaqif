import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ platforms }) {
    const { data, setData, post, processing, errors } = useForm({ platform: '', url: '', icon: '', order: 0, is_active: true });
    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.social-links.store')); };

    return (
        <AdminLayout title="Add Social Link">
            <Head title="Add Social Link" />
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div><label className="form-label">Platform *</label><select value={data.platform} onChange={(e) => setData('platform', e.target.value)} className="form-input" required><option value="">Select platform...</option>{Object.entries(platforms).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>{errors.platform && <p className="text-red-400 text-sm mt-1">{errors.platform}</p>}</div>
                    <div><label className="form-label">URL *</label><input type="text" value={data.url} onChange={(e) => setData('url', e.target.value)} className="form-input" required placeholder={data.platform === 'email' ? 'your@email.com' : 'https://...'} />{errors.url && <p className="text-red-400 text-sm mt-1">{errors.url}</p>}</div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded bg-dark-700 border-dark-600" /><label htmlFor="is_active" className="text-gray-300">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Link'}</button><Link href={route('admin.social-links.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
