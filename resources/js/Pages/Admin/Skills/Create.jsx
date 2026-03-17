import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({ name: '', category: '', proficiency_level: 80, order: 0, is_active: true });
    const handleSubmit = (e) => { e.preventDefault(); post(route('admin.skills.store')); };
    const defaultCategories = ['Programming', 'Framework', 'Database', 'Tools', 'Soft Skill', 'Language'];

    return (
        <AdminLayout title="Add Skill">
            <Head title="Add Skill" />
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div><label className="form-label">Skill Name *</label><input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="form-input" required placeholder="e.g., JavaScript, Laravel, React" />{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="form-label">Category *</label><input type="text" value={data.category} onChange={(e) => setData('category', e.target.value)} className="form-input" required list="categories" placeholder="Select or type a category" /><datalist id="categories">{[...new Set([...defaultCategories, ...categories])].map(c => <option key={c} value={c} />)}</datalist></div>
                    <div><label className="form-label">Proficiency Level: {data.proficiency_level}%</label><input type="range" value={data.proficiency_level} onChange={(e) => setData('proficiency_level', parseInt(e.target.value))} className="w-full" min="0" max="100" /><div className="skill-bar mt-2"><div className="skill-progress" style={{ width: `${data.proficiency_level}%` }}></div></div></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Save Skill'}</button><Link href={route('admin.skills.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
