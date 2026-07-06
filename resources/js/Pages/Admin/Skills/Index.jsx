import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function Index({ skills }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete this skill?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.skills.destroy', id), {
                    onSuccess: () => {
                        Swal.fire('Deleted!', 'Skill has been deleted.', 'success');
                    }
                });
            }
        });
    };

    return (
        <AdminLayout title="Skills">
            <Head title="Skills" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-500">Manage your skills and categories with their logos</p>
                    <Link href={route('admin.skills.create')} className="btn-primary">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </Link>
                </div>
                <div className="flex border-b border-gray-200">
                    <Link href={route('admin.skills.index')} className="px-4 py-2 border-b-2 border-rose-500 font-semibold text-rose-600 text-sm">
                        Skills List
                    </Link>
                    <Link href={route('admin.skill-categories.index')} className="px-4 py-2 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium text-sm">
                        Categories Settings
                    </Link>
                </div>
                <div className="glass-card rounded-xl overflow-hidden">
                    {skills?.length ? (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th className="w-20">Logo</th>
                                    <th>Skill</th>
                                    <th>Category</th>
                                    <th>Order</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {skills.map((item) => (
                                    <tr key={item.id}>
                                        <td className="py-3 px-6">
                                            <div className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden">
                                                {item.logo_url ? (
                                                    <img src={item.logo_url} alt={item.name} className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                )}
                                            </div>
                                        </td>
                                        <td className="text-gray-900 font-semibold align-middle">{item.name}</td>
                                        <td className="align-middle">
                                            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-rose-50 text-rose-600 border border-rose-100">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="text-gray-500 font-medium align-middle">{item.order}</td>
                                        <td className="align-middle">
                                            <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
                                                item.is_active 
                                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                                    : 'bg-gray-50 text-gray-500 border-gray-200'
                                            }`}>
                                                {item.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="text-right align-middle">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={route('admin.skills.edit', item.id)} className="btn-icon w-8 h-8">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </Link>
                                                <button onClick={() => handleDelete(item.id)} className="btn-icon w-8 h-8 text-red-500 hover:text-red-600">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-gray-500 mb-4">No skills added yet</p>
                            <Link href={route('admin.skills.create')} className="btn-primary">Add Your First Skill</Link>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
