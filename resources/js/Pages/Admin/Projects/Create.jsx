import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ categories }) {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({ title: '', description: '', tech_stack: '', image: null, github_link: '', demo_link: '', category: '', completion_date: '', is_featured: false, order: 0, is_active: true });
    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.projects.store'), { forceFormData: true }); };
    const handleImageChange = (e) => { const file = e.target.files[0]; if (file) { setData('image', file); setImagePreview(URL.createObjectURL(file)); } };

    return (
        <AdminLayout title="Add Project">
            <Head title="Add Project" />
            <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div><label className="form-label">Project Image</label><div className="flex items-center gap-4"><div className="w-32 h-20 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">{imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-500"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>}</div><input type="file" accept="image/*" onChange={handleImageChange} className="form-input text-sm" /></div></div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">Title *</label><input type="text" value={data.title} onChange={(e) => setData('title', e.target.value)} className="form-input" required /></div>
                        <div><label className="form-label">Category</label><input type="text" value={data.category} onChange={(e) => setData('category', e.target.value)} className="form-input" list="categories" placeholder="e.g., Web, Mobile, API" /><datalist id="categories">{categories?.map(c => <option key={c} value={c} />)}</datalist></div>
                    </div>
                    <div><label className="form-label">Description</label><textarea value={data.description} onChange={(e) => setData('description', e.target.value)} className="form-input" rows="4"></textarea></div>
                    <div><label className="form-label">Tech Stack</label><input type="text" value={data.tech_stack} onChange={(e) => setData('tech_stack', e.target.value)} className="form-input" placeholder="e.g., Laravel, React, MySQL (comma-separated)" /></div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div><label className="form-label">GitHub Link</label><input type="url" value={data.github_link} onChange={(e) => setData('github_link', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Demo Link</label><input type="url" value={data.demo_link} onChange={(e) => setData('demo_link', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Completion Date</label><input type="date" value={data.completion_date} onChange={(e) => setData('completion_date', e.target.value)} className="form-input" /></div>
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                    </div>
                    <div className="flex items-center gap-6"><div className="flex items-center gap-2"><input type="checkbox" id="is_featured" checked={data.is_featured} onChange={(e) => setData('is_featured', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_featured" className="text-gray-700">Featured</label></div><div className="flex items-center gap-2"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div></div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Project'}</button><Link href={route('admin.projects.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
