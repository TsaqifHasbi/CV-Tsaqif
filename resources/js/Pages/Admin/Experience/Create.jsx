import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        type: 'work', job_title: '', organization: '', start_date: '', end_date: '', is_current: false, description: '', location: '', employment_type: '', order: 0, is_active: true,
    });

    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.experience.store')); };

    return (
        <AdminLayout title="Add Experience">
            <Head title="Add Experience" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Job/Role Title *</label><input type="text" value={data.job_title} onChange={(e) => setData('job_title', e.target.value)} className="form-input" required />{errors.job_title && <p className="text-red-500 text-sm mt-1">{errors.job_title}</p>}</div>
                        <div><label className="form-label">Organization/Company *</label><input type="text" value={data.organization} onChange={(e) => setData('organization', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Start Date *</label><input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">End Date</label><input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className="form-input" disabled={data.is_current} /></div>
                        <div><label className="form-label">Location</label><input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Type *</label><select value={data.type} onChange={(e) => setData('type', e.target.value)} className="form-input" required><option value="work">Work Experience</option><option value="organization">Organizational Experience</option></select>{errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}</div>
                        <div><label className="form-label">Employment Type</label><select value={data.employment_type} onChange={(e) => setData('employment_type', e.target.value)} className="form-input"><option value="">Select...</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Internship">Internship</option><option value="Freelance">Freelance</option></select></div>
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-4 pt-8"><div className="flex items-center gap-2"><input type="checkbox" id="is_current" checked={data.is_current} onChange={(e) => setData('is_current', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_current" className="text-gray-700">Current Position</label></div></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="5" placeholder="Responsibilities and achievements..."></textarea></div>
                    <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Experience'}</button><Link href={route('admin.experience.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
