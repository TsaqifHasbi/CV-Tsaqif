import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ experience }) {
    const formatDate = (d) => d ? new Date(d).toISOString().split('T')[0] : '';
    const { data, setData, put, processing, errors } = useForm({
        type: experience.type || 'work', job_title: experience.job_title || '', organization: experience.organization || '', start_date: formatDate(experience.start_date), end_date: formatDate(experience.end_date), is_current: experience.is_current || false, description: experience.description || '', location: experience.location || '', employment_type: experience.employment_type || '', is_active: experience.is_active ?? true, order: experience.order ?? 0,
    });

    const handleSubmit = (e) => { e.preventDefault(); put(route('admin.experience.update', experience.id)); };

    return (
        <AdminLayout title="Edit Experience">
            <Head title="Edit Experience" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Job/Role Title *</label><input type="text" value={data.job_title} onChange={(e) => setData('job_title', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Organization/Company *</label><input type="text" value={data.organization} onChange={(e) => setData('organization', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Start Date *</label><input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">End Date</label><input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} className="form-input" disabled={data.is_current} /></div>
                        <div><label className="form-label">Location</label><input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Type *</label><select value={data.type} onChange={(e) => setData('type', e.target.value)} className="form-input" required><option value="work">Work Experience</option><option value="organization">Organizational Experience</option></select>{errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}</div>
                        <div><label className="form-label">Employment Type</label><select value={data.employment_type} onChange={(e) => setData('employment_type', e.target.value)} className="form-input"><option value="">Select...</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option><option value="Internship">Internship</option><option value="Freelance">Freelance</option></select></div>
                        <div className="flex items-center gap-4 pt-8"><div className="flex items-center gap-2"><input type="checkbox" id="is_current" checked={data.is_current} onChange={(e) => setData('is_current', e.target.checked)} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_current" className="text-gray-700">Current Position</label></div></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="5"></textarea></div>
                    <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                    <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Current order position: <strong>#{data.order}</strong> — change ordering via drag & drop on the index page.</span>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Experience'}</button><Link href={route('admin.experience.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
