import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ skill, categories }) {
    const { data, setData, put, processing, errors } = useForm({ name: skill.name || '', category: skill.category || '', proficiency_level: skill.proficiency_level || 80, order: skill.order || 0, is_active: skill.is_active ?? true });
    const handleSubmit = (e) => { e.preventDefault(); put(route('admin.skills.update', skill.id)); };
    const defaultCategories = ['Programming', 'Framework', 'Database', 'Tools', 'Soft Skill', 'Language'];

    return (
        <AdminLayout title="Edit Skill">
            <Head title="Edit Skill" />
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    <div><label className="form-label">Skill Name *</label><input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} className="form-input" required /></div>
                    <div><label className="form-label">Category *</label><input type="text" value={data.category} onChange={(e) => setData('category', e.target.value)} className="form-input" required list="categories" /><datalist id="categories">{[...new Set([...defaultCategories, ...categories])].map(c => <option key={c} value={c} />)}</datalist></div>
                    <div><label className="form-label">Proficiency Level: {data.proficiency_level}%</label><input type="range" value={data.proficiency_level} onChange={(e) => setData('proficiency_level', parseInt(e.target.value))} className="w-full" min="0" max="100" /><div className="skill-bar mt-2"><div className="skill-progress" style={{ width: `${data.proficiency_level}%` }}></div></div></div>
                    <div className="grid grid-cols-2 gap-6">
                        <div><label className="form-label">Order</label><input type="number" value={data.order} onChange={(e) => setData('order', parseInt(e.target.value))} className="form-input" min="0" /></div>
                        <div className="flex items-center gap-2 pt-8"><input type="checkbox" id="is_active" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="rounded rounded border-gray-300 text-rose-500 focus:ring-rose-500" /><label htmlFor="is_active" className="text-gray-700">Active</label></div>
                    </div>
                </div>
                <div className="flex items-center gap-4"><button type="submit" disabled={processing} className="btn-primary">{processing ? 'Saving...' : 'Update Skill'}</button><Link href={route('admin.skills.index')} className="btn-secondary">Cancel</Link></div>
            </form>
        </AdminLayout>
    );
}
