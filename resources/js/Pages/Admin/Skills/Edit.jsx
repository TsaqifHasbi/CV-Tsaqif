import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function Edit({ skill, categories }) {
    const [logoPreview, setLogoPreview] = useState(null);
    const { data, setData, post, processing, errors } = useForm({
        name: skill.name || '',
        category: skill.category || '',
        logo: null,
        order: skill.order || 0,
        is_active: skill.is_active ?? true,
        _method: 'PUT' // Method spoofing for file uploads on update
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.skills.update', skill.id), {
            forceFormData: true,
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('logo', file);
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const deleteLogo = () => {
        Swal.fire({
            title: 'Delete logo?',
            text: "This action will remove the skill logo.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.skills.delete-logo', skill.id), {
                    onSuccess: () => {
                        setLogoPreview(null);
                        Swal.fire('Deleted!', 'Skill logo has been deleted.', 'success');
                    }
                });
            }
        });
    };

    const defaultCategories = ['Programming', 'Framework', 'Database', 'Tools', 'Soft Skill', 'Language'];

    return (
        <AdminLayout title="Edit Skill">
            <Head title="Edit Skill" />
            <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
                <div className="glass-card p-6 rounded-xl space-y-6">
                    {/* Skill Logo */}
                    <div>
                        <label className="form-label">Skill Logo / Icon</label>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {logoPreview || skill.logo ? (
                                    <img 
                                        src={logoPreview || `/storage/${skill.logo}`} 
                                        alt={skill.name} 
                                        className="w-12 h-12 object-contain" 
                                    />
                                ) : (
                                    <div className="text-gray-300">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleLogoChange} 
                                className="form-input text-sm" 
                            />
                            {skill.logo && (
                                <button 
                                    type="button" 
                                    onClick={deleteLogo} 
                                    className="text-red-500 text-sm hover:underline font-semibold"
                                >
                                    Remove Current Logo
                                </button>
                            )}
                        </div>
                        {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label className="form-label">Skill Name *</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={(e) => setData('name', e.target.value)} 
                            className="form-input" 
                            required 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="form-label">Category *</label>
                        <input 
                            type="text" 
                            value={data.category} 
                            onChange={(e) => setData('category', e.target.value)} 
                            className="form-input" 
                            required 
                            list="categories" 
                        />
                        <datalist id="categories">
                            {[...new Set([...defaultCategories, ...(categories || [])])].map(c => (
                                <option key={c} value={c} />
                            ))}
                        </datalist>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    {/* Order & Active */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="form-label">Order</label>
                            <input 
                                type="number" 
                                value={data.order} 
                                onChange={(e) => setData('order', parseInt(e.target.value))} 
                                className="form-input" 
                                min="0" 
                            />
                            {errors.order && <p className="text-red-500 text-sm mt-1">{errors.order}</p>}
                        </div>
                        <div className="flex items-center gap-2 pt-8">
                            <input 
                                type="checkbox" 
                                id="is_active" 
                                checked={data.is_active} 
                                onChange={(e) => setData('is_active', e.target.checked)} 
                                className="rounded border-gray-300 text-rose-500 focus:ring-rose-500" 
                            />
                            <label htmlFor="is_active" className="text-gray-700 font-medium">Active Status</label>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button type="submit" disabled={processing} className="btn-primary">
                        {processing ? 'Saving...' : 'Update Skill'}
                    </button>
                    <Link href={route('admin.skills.index')} className="btn-secondary">Cancel</Link>
                </div>
            </form>
        </AdminLayout>
    );
}
