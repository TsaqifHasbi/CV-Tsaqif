import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ education }) {
    const { data, setData, put, processing, errors } = useForm({
        institution: education.institution || '', degree: education.degree || '', field_of_study: education.field_of_study || '', start_year: education.start_year || '', end_year: education.end_year || '', description: education.description || '', location: education.location || '', gpa: education.gpa || '', order: education.order || 0, is_active: education.is_active ?? true,
    });

    const handleSubmit = (e) => { e.preventDefault(); put(route('admin.education.update', education.id)); };

    return (
        <AdminLayout title="Edit Education">
            <Head title="Edit Education" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Institution *</label><input type="text" value={data.institution} onChange={(e) => setData('institution', e.target.value)} className="form-input" required />{errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}</div>
                        <div><label className="form-label">Degree *</label><input type="text" value={data.degree} onChange={(e) => setData('degree', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Field of Study</label><input type="text" value={data.field_of_study} onChange={(e) => setData('field_of_study', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Location</label><input type="text" value={data.location} onChange={(e) => setData('location', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Start Year *</label><input type="text" value={data.start_year} onChange={(e) => setData('start_year', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">End Year</label><input type="text" value={data.end_year} onChange={(e) => setData('end_year', e.target.value)} className="form-input" placeholder="Leave empty for Present" /></div>
                        <div><label className="form-label">GPA</label><input type="text" value={data.gpa} onChange={(e) => setData('gpa', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="4"></textarea></div>
                    <div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                </div>
                <div className="flex items-center gap-4">
                    <button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Entry'}</button>
                    <Link href={route('admin.education.index')} className="btn-secondary">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
