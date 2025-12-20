import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ socialLinks }) {
    const handleDelete = (id) => { if (confirm('Delete this social link?')) router.delete(route('admin.social-links.destroy', id)); };

    return (
        <AdminLayout title="Social Links">
            <Head title="Social Links" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-400">Manage your social media links</p>
                    <Link href={route('admin.social-links.create')} className="btn-primary"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Link</Link>
                </div>
                <div className="glass-card rounded-xl overflow-hidden">
                    {socialLinks?.length ? (
                        <table className="data-table">
                            <thead><tr><th>Platform</th><th>URL</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
                            <tbody>
                                {socialLinks.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-white font-medium capitalize">{item.platform}</td>
                                        <td className="text-gray-400 truncate max-w-xs"><a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-400">{item.url}</a></td>
                                        <td><span className={`badge ${item.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></td>
                                        <td className="text-right"><div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.social-links.edit', item.id)} className="btn-icon w-8 h-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                                            <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center"><p className="text-gray-400 mb-4">No social links yet</p><Link href={route('admin.social-links.create')} className="btn-primary">Add Your First Link</Link></div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
