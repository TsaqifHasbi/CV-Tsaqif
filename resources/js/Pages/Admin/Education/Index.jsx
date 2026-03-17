import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ education }) {
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this entry?')) {
            router.delete(route('admin.education.destroy', id));
        }
    };

    return (
        <AdminLayout title="Education">
            <Head title="Education" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-500">Manage your education history</p>
                    <Link href={route('admin.education.create')} className="btn-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        Add Education
                    </Link>
                </div>

                <div className="glass-card rounded-xl overflow-hidden">
                    {education && education.length > 0 ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Institution</th>
                                    <th>Degree</th>
                                    <th>Year</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {education.map((item) => (
                                    <tr key={item.id}>
                                        <td className="text-gray-900 font-medium">{item.institution}</td>
                                        <td className="text-gray-600">{item.degree}</td>
                                        <td className="text-gray-600">{item.start_year} - {item.end_year || 'Present'}</td>
                                        <td><span className={`badge ${item.is_active ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{item.is_active ? 'Active' : 'Inactive'}</span></td>
                                        <td className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.education.edit', item.id)} className="btn-icon w-8 h-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></Link>
                                                <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-500 hover:text-red-600"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 14l9-5-9-5-9 5 9 5z" /></svg>
                            <p className="text-gray-500 mb-4">No education entries yet</p>
                            <Link href={route('admin.education.create')} className="btn-primary">Add Your First Entry</Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
