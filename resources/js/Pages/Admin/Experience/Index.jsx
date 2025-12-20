import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ experiences }) {
    const handleDelete = (id) => { if (confirm('Delete this experience?')) router.delete(route('admin.experience.destroy', id)); };
    const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present';

    return (
        <AdminLayout title="Experience">
            <Head title="Experience" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-400">Manage your work experience</p>
                    <Link href={route('admin.experience.create')} className="btn-primary"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Experience</Link>
                </div>
                <div className="glass-card rounded-xl overflow-hidden">
                    {experiences?.length ? (
                        <table className="data-table">
                            <thead><tr><th>Position</th><th>Organization</th><th>Period</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
                            <tbody>
                                {experiences.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-white font-medium">{item.job_title}</td>
                                        <td className="text-gray-400">{item.organization}</td>
                                        <td className="text-gray-400">{formatDate(item.start_date)} - {item.is_current ? 'Present' : formatDate(item.end_date)}</td>
                                        <td><span className={`badge ${item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></td>
                                        <td className="text-right"><div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.experience.edit', item.id)} className="btn-icon w-8 h-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center"><p className="text-gray-400 mb-4">No experience entries yet</p><Link href={route('admin.experience.create')} className="btn-primary">Add Your First Experience</Link></div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
