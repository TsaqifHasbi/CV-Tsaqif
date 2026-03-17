import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ skills, skillsByCategory }) {
    const handleDelete = (id) => { if (confirm('Delete this skill?')) router.delete(route('admin.skills.destroy', id)); };

    return (
        <AdminLayout title="Skills">
            <Head title="Skills" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-500">Manage your skills and proficiencies</p>
                    <Link href={route('admin.skills.create')} className="btn-primary"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Skill</Link>
                </div>
                <div className="glass-card rounded-xl overflow-hidden">
                    {skills?.length ? (
                        <table className="data-table">
                            <thead><tr><th>Skill</th><th>Category</th><th>Proficiency</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
                            <tbody>
                                {skills.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-gray-900 font-medium">{item.name}</td>
                                        <td><span className="badge">{item.category}</span></td>
                                        <td><div className="flex items-center gap-2"><div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-rose-400" style={{ width: `${item.proficiency_level}%` }}></div></div><span className="text-gray-600 text-sm">{item.proficiency_level}%</span></div></td>
                                        <td><span className={`badge ${item.is_active ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></td>
                                        <td className="text-right"><div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.skills.edit', item.id)} className="btn-icon w-8 h-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-500 hover:text-red-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center"><p className="text-gray-500 mb-4">No skills added yet</p><Link href={route('admin.skills.create')} className="btn-primary">Add Your First Skill</Link></div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
