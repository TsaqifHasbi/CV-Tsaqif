import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ projects }) {
    const handleDelete = (id) => { if (confirm('Delete this project?')) router.delete(route('admin.projects.destroy', id)); };

    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-gray-500">Manage your portfolio projects</p>
                    <Link href={route('admin.projects.create')} className="btn-primary"><svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Project</Link>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects?.length ? projects.map((project) => (
                        <div key={project.id} className="glass-card rounded-xl overflow-hidden">
                            <div className="aspect-video bg-gray-100 overflow-hidden">{project.image ? <img src={`/storage/${project.image}`} alt={project.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400"><svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>}</div>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-gray-900 font-semibold">{project.title}</h3>
                                    <div className="flex gap-1">{project.is_featured && <span className="badge text-xs">Featured</span>}<span className={`badge text-xs ${project.is_active ? 'bg-green-50 text-green-600 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>{project.is_active ? 'Active' : 'Inactive'}</span></div>
                                </div>
                                {project.category && <span className="text-xs text-gray-500">{project.category}</span>}
                                <div className="flex items-center gap-2 mt-4">
                                    <Link href={route('admin.projects.edit', project.id)} className="btn-secondary text-xs px-3 py-1.5">Edit</Link>
                                    <button onClick={() => handleDelete(project.id)} className="text-red-500 text-xs hover:underline">Delete</button>
                                </div>
                            </div>
                        </div>
                    )) : <div className="col-span-full glass-card p-12 rounded-xl text-center"><p className="text-gray-500 mb-4">No projects yet</p><Link href={route('admin.projects.create')} className="btn-primary">Add Your First Project</Link></div>}
                </div>
            </div>
        </AdminLayout>
    );
}
