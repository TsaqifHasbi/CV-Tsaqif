import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

// Switch Toggle Component
function Toggle({ checked, onChange, label, disabled = false }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => !disabled && onChange(!checked)}
            className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-250 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${checked ? 'bg-rose-500' : 'bg-gray-200'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-250 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
            {label && <span className="sr-only">{label}</span>}
        </button>
    );
}

export default function Dashboard({
    stats,
    profile,
    profileCompletion,
    recentProjects,
    recentExperiences,
    recentSkills,
    recentCertifications,
    memo
}) {
    const [activeTab, setActiveTab] = useState('projects');
    const [memoText, setMemoText] = useState(memo || '');
    const [isSavingMemo, setIsSavingMemo] = useState(false);

    // Local lists for immediate visual updates on toggle
    const [projectsList, setProjectsList] = useState(recentProjects || []);
    const [experiencesList, setExperiencesList] = useState(recentExperiences || []);
    const [skillsList, setSkillsList] = useState(recentSkills || []);
    const [certificationsList, setCertificationsList] = useState(recentCertifications || []);

    // Sync state when props update
    useEffect(() => { setProjectsList(recentProjects || []); }, [recentProjects]);
    useEffect(() => { setExperiencesList(recentExperiences || []); }, [recentExperiences]);
    useEffect(() => { setSkillsList(recentSkills || []); }, [recentSkills]);
    useEffect(() => { setCertificationsList(recentCertifications || []); }, [recentCertifications]);

    // Dynamic greeting based on current local hour
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 4 && hour < 11) return 'Selamat Pagi';
        if (hour >= 11 && hour < 15) return 'Selamat Siang';
        if (hour >= 15 && hour < 18.5) return 'Selamat Sore';
        return 'Selamat Malam';
    };

    // Generic Toggle Status Handler
    const handleStatusToggle = async (modelKey, id, field, list, setList) => {
        const currentItem = list.find(item => item.id === id);
        if (!currentItem) return;

        // Optimistic UI update
        const updatedList = list.map(item => {
            if (item.id === id) {
                return { ...item, [field]: !item[field] };
            }
            return item;
        });
        setList(updatedList);

        try {
            const response = await axios.patch(route('admin.toggle', { model: modelKey, id, field }));
            if (response.data.success) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: 'success',
                    title: response.data.message
                });

                // Dynamically refresh counts on the stats block
                router.reload({ only: ['stats'] });
            } else {
                throw new Error(response.data.message || 'Operation failed');
            }
        } catch (error) {
            // Revert state on error
            setList(list);
            Swal.fire({
                title: 'Error',
                text: error.response?.data?.message || error.message || 'Failed to update status',
                icon: 'error',
                confirmButtonColor: '#f43f5e',
            });
        }
    };

    // Save Scratchpad Memo
    const handleSaveMemo = () => {
        setIsSavingMemo(true);
        router.post(route('admin.dashboard.memo.update'), { memo: memoText }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSavingMemo(false);
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Memo disimpan successfully!'
                });
            },
            onError: () => {
                setIsSavingMemo(false);
                Swal.fire('Error', 'Gagal menyimpan memo.', 'error');
            }
        });
    };

    // Item Deletion Confirmations
    const handleDeleteItem = (modelKey, id, title) => {
        Swal.fire({
            title: `Hapus ${title}?`,
            text: 'Tindakan ini tidak dapat dibatalkan.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route(`admin.${modelKey}.destroy`, id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire('Terhapus!', `${title} berhasil dihapus.`, 'success');
                    }
                });
            }
        });
    };

    // Stat Cards configuration
    const statCards = [
        {
            label: 'Projects',
            total: stats?.projects?.total || 0,
            active: stats?.projects?.active || 0,
            subText: stats?.projects?.featured ? `${stats.projects.featured} Featured` : '0 Featured',
            icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
            color: 'from-orange-500 to-amber-500',
            bg: 'bg-orange-50 text-orange-600',
            route: 'admin.projects.index'
        },
        {
            label: 'Experience',
            total: stats?.experiences?.total || 0,
            active: stats?.experiences?.active || 0,
            subText: 'Timeline history',
            icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
            color: 'from-purple-500 to-pink-500',
            bg: 'bg-purple-50 text-purple-600',
            route: 'admin.experience.index'
        },
        {
            label: 'Skills',
            total: stats?.skills?.total || 0,
            active: stats?.skills?.active || 0,
            subText: 'Categories & tools',
            icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
            color: 'from-green-500 to-emerald-500',
            bg: 'bg-green-50 text-green-600',
            route: 'admin.skills.index'
        },
        {
            label: 'Education',
            total: stats?.education?.total || 0,
            active: stats?.education?.active || 0,
            subText: 'Schools & Degrees',
            icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
            color: 'from-blue-500 to-cyan-500',
            bg: 'bg-blue-50 text-blue-600',
            route: 'admin.education.index'
        },
        {
            label: 'Certifications',
            total: stats?.certifications?.total || 0,
            active: stats?.certifications?.active || 0,
            subText: 'Badges & credentials',
            icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 013.138-3.138z',
            color: 'from-rose-500 to-pink-500',
            bg: 'bg-rose-50 text-rose-600',
            route: 'admin.certifications.index'
        },
        {
            label: 'Social Links',
            total: stats?.socialLinks?.total || 0,
            active: stats?.socialLinks?.active || 0,
            subText: 'Active contacts',
            icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1',
            color: 'from-indigo-500 to-violet-500',
            bg: 'bg-indigo-50 text-indigo-600',
            route: 'admin.social-links.index'
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-8">

                {/* Modern Welcome Banner */}
                <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-md">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl"></div>
                    <div className="absolute left-1/3 bottom-0 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-550/20 text-rose-300 border border-rose-500/30 mb-3">
                                {getGreeting()} 👋
                            </span>
                            <h2 className="text-3xl font-display font-extrabold tracking-tight">
                                Halo, {profile?.full_name ? profile.full_name : 'Admin'}
                            </h2>
                            <p className="text-gray-300 mt-1 max-w-lg text-sm md:text-base leading-relaxed">
                                Kelola konten portofolio Anda dengan mudah, atur visibilitas data, dan perbarui info langsung dari panel utama ini.
                            </p>
                        </div>
                        {profile?.profile_photo ? (
                            <img
                                src={profile.profile_photo}
                                alt={profile.full_name}
                                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md flex-shrink-0"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-2xl bg-rose-500 flex items-center justify-center font-display font-bold text-white text-xl shadow-md flex-shrink-0">
                                {profile?.full_name ? profile.full_name.charAt(0) : 'A'}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Section with Advanced Hover & Ratio Details */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Ringkasan Portofolio
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                        {statCards.map((stat) => (
                            <Link
                                key={stat.label}
                                href={route(stat.route)}
                                className="glass-card p-5 rounded-xl block transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100 hover:border-gray-200"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`w-9 h-9 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={stat.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                        Ratio: {stat.active}/{stat.total}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{stat.total}</p>
                                <p className="text-xs font-semibold text-gray-900 mt-1">{stat.label}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{stat.subText}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Main Content Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left & Middle Area: Interactive Recent Tabs */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="glass-card rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            <div className="px-6 py-5 border-b border-gray-100 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                        </svg>
                                        Pengelola Cepat Data Terbaru
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5">Toggle aktif/visibilitas data portofolio secara instan di bawah ini.</p>
                                </div>

                                {/* Tabs Selectors */}
                                <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold border border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('projects')}
                                        className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'projects' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Proyek
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('experiences')}
                                        className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'experiences' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Pengalaman
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('skills')}
                                        className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'skills' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Skill
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('certifications')}
                                        className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === 'certifications' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                                    >
                                        Sertifikat
                                    </button>
                                </div>
                            </div>

                            {/* Tab Panels */}
                            <div className="p-6 bg-white">

                                {/* PROJECTS PANEL */}
                                {activeTab === 'projects' && (
                                    <div className="overflow-x-auto">
                                        {projectsList.length > 0 ? (
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs bg-gray-50/50">
                                                        <th className="py-3 px-4">Proyek</th>
                                                        <th className="py-3 px-4">Kategori</th>
                                                        <th className="py-3 px-4 text-center">Aktif</th>
                                                        <th className="py-3 px-4 text-center">Featured</th>
                                                        <th className="py-3 px-4 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {projectsList.map(project => (
                                                        <tr key={project.id} className="hover:bg-gray-50/40 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    {project.image_url ? (
                                                                        <img src={project.image_url} className="w-10 h-7 rounded object-cover bg-gray-100 flex-shrink-0" alt="" />
                                                                    ) : (
                                                                        <div className="w-10 h-7 rounded bg-gray-100 flex items-center justify-center text-gray-400 flex-shrink-0">
                                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                                        </div>
                                                                    )}
                                                                    <span className="font-semibold text-gray-900 max-w-[150px] truncate block" title={project.title}>
                                                                        {project.title}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-500 text-xs">
                                                                {project.category || '-'}
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <Toggle
                                                                    checked={project.is_active}
                                                                    onChange={() => handleStatusToggle('project', project.id, 'is_active', projectsList, setProjectsList)}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <Toggle
                                                                    checked={project.is_featured}
                                                                    onChange={() => handleStatusToggle('project', project.id, 'is_featured', projectsList, setProjectsList)}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link href={route('admin.projects.edit', project.id)} className="text-gray-500 hover:text-gray-900 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('projects', project.id, project.title)}
                                                                        className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-xs">Belum ada proyek yang ditambahkan.</div>
                                        )}
                                    </div>
                                )}

                                {/* EXPERIENCES PANEL */}
                                {activeTab === 'experiences' && (
                                    <div className="overflow-x-auto">
                                        {experiencesList.length > 0 ? (
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs bg-gray-50/50">
                                                        <th className="py-3 px-4">Pekerjaan</th>
                                                        <th className="py-3 px-4">Instansi</th>
                                                        <th className="py-3 px-4">Tipe</th>
                                                        <th className="py-3 px-4 text-center">Aktif</th>
                                                        <th className="py-3 px-4 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {experiencesList.map(exp => (
                                                        <tr key={exp.id} className="hover:bg-gray-50/40 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div>
                                                                    <span className="font-semibold text-gray-900 block truncate max-w-[180px]">{exp.job_title}</span>
                                                                    <span className="text-[10px] text-gray-400 font-medium">
                                                                        {exp.start_date ? new Date(exp.start_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : ''} - {exp.is_current ? 'Present' : (exp.end_date ? new Date(exp.end_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short' }) : 'Present')}
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-550 font-medium text-xs">
                                                                {exp.organization}
                                                            </td>
                                                            <td className="py-3 px-4">
                                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${exp.type === 'work' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-amber-50 text-amber-600 border-amber-200'}`}>
                                                                    {exp.type === 'work' ? 'Kerja' : 'Organisasi'}
                                                                </span>
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <Toggle
                                                                    checked={exp.is_active}
                                                                    onChange={() => handleStatusToggle('experience', exp.id, 'is_active', experiencesList, setExperiencesList)}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link href={route('admin.experience.edit', exp.id)} className="text-gray-500 hover:text-gray-900 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('experience', exp.id, exp.job_title)}
                                                                        className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-xs">Belum ada riwayat pengalaman.</div>
                                        )}
                                    </div>
                                )}

                                {/* SKILLS PANEL */}
                                {activeTab === 'skills' && (
                                    <div className="overflow-x-auto">
                                        {skillsList.length > 0 ? (
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs bg-gray-50/50">
                                                        <th className="py-3 px-4">Skill</th>
                                                        <th className="py-3 px-4">Kategori</th>
                                                        <th className="py-3 px-4 text-center">Aktif</th>
                                                        <th className="py-3 px-4 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {skillsList.map(skill => (
                                                        <tr key={skill.id} className="hover:bg-gray-50/40 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-2">
                                                                    {skill.logo_url ? (
                                                                        <img src={skill.logo_url} className="w-6 h-6 rounded bg-gray-100 object-contain p-0.5 flex-shrink-0" alt="" />
                                                                    ) : (
                                                                        <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-bold flex-shrink-0">
                                                                            {skill.name.charAt(0)}
                                                                        </div>
                                                                    )}
                                                                    <span className="font-semibold text-gray-900 block truncate max-w-[150px]">{skill.name}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-500 text-xs">
                                                                {skill.category || 'Uncategorized'}
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <Toggle
                                                                    checked={skill.is_active}
                                                                    onChange={() => handleStatusToggle('skill', skill.id, 'is_active', skillsList, setSkillsList)}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link href={route('admin.skills.edit', skill.id)} className="text-gray-500 hover:text-gray-900 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('skills', skill.id, skill.name)}
                                                                        className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-xs">Belum ada skill yang ditambahkan.</div>
                                        )}
                                    </div>
                                )}

                                {/* CERTIFICATIONS PANEL */}
                                {activeTab === 'certifications' && (
                                    <div className="overflow-x-auto">
                                        {certificationsList.length > 0 ? (
                                            <table className="w-full text-left text-sm border-collapse">
                                                <thead>
                                                    <tr className="border-b border-gray-100 text-gray-400 font-semibold text-xs bg-gray-50/50">
                                                        <th className="py-3 px-4">Sertifikat</th>
                                                        <th className="py-3 px-4">Penerbit</th>
                                                        <th className="py-3 px-4 text-center">Aktif</th>
                                                        <th className="py-3 px-4 text-right">Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-50">
                                                    {certificationsList.map(cert => (
                                                        <tr key={cert.id} className="hover:bg-gray-50/40 transition-colors">
                                                            <td className="py-3 px-4">
                                                                <div>
                                                                    <span className="font-semibold text-gray-900 block truncate max-w-[180px]">{cert.title}</span>
                                                                    <span className="text-[10px] text-gray-400 font-medium">{cert.year}</span>
                                                                </div>
                                                            </td>
                                                            <td className="py-3 px-4 text-gray-550 font-medium text-xs">
                                                                {cert.issuer}
                                                            </td>
                                                            <td className="py-3 px-4 text-center">
                                                                <Toggle
                                                                    checked={cert.is_active}
                                                                    onChange={() => handleStatusToggle('certification', cert.id, 'is_active', certificationsList, setCertificationsList)}
                                                                />
                                                            </td>
                                                            <td className="py-3 px-4 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <Link href={route('admin.certifications.edit', cert.id)} className="text-gray-500 hover:text-gray-900 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                                    </Link>
                                                                    <button
                                                                        onClick={() => handleDeleteItem('certifications', cert.id, cert.title)}
                                                                        className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                                    >
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center py-10 text-gray-400 text-xs">Belum ada sertifikat.</div>
                                        )}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    {/* Right Area: Memo Widget & Profile completeness */}
                    <div className="space-y-6">

                        <div className="glass-card p-6 rounded-2xl border border-gray-205 shadow-sm bg-white">
                            <h4 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                                <svg className="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Kelengkapan Profil Portofolio
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="text-gray-500">Persentase</span>
                                    <span className={profileCompletion >= 80 ? 'text-green-600' : 'text-amber-600'}>
                                        {profileCompletion}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${profileCompletion >= 85 ? 'bg-green-500' : 'bg-amber-500'
                                            }`}
                                        style={{ width: `${profileCompletion}%` }}
                                    ></div>
                                </div>
                                <p className="text-[11px] text-gray-400 leading-normal">
                                    {profileCompletion >= 80
                                        ? 'Profil Anda sudah sangat lengkap! Bagus sekali untuk reputasi digital.'
                                        : 'Lengkapi avatar, deskripsi about me, berkas CV, dan info kontak agar portofolio Anda semakin profesional.'
                                    }
                                </p>
                                {profileCompletion < 100 && (
                                    <Link href={route('admin.profile.edit')} className="inline-flex text-xs font-semibold text-rose-500 hover:text-rose-600 items-center gap-1 mt-1 group">
                                        Perbarui Profil
                                        <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Scratchpad Memo Card */}
                        <div className="glass-card p-6 rounded-2xl border border-gray-205 shadow-sm bg-white flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                                    <svg className="w-4.5 h-4.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Dashboard Memo
                                </h4>
                                <span className="text-[10px] text-gray-450 font-medium">Auto-save off</span>
                            </div>
                            <textarea
                                value={memoText}
                                onChange={(e) => setMemoText(e.target.value)}
                                placeholder="Tulis catatan, ide, atau draft pekerjaan di sini..."
                                rows={6}
                                className="w-full text-xs text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 resize-none font-sans leading-relaxed bg-gray-50/50"
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    onClick={handleSaveMemo}
                                    disabled={isSavingMemo}
                                    className="btn-primary text-xs py-2 px-4 shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center gap-1.5"
                                >
                                    {isSavingMemo ? (
                                        <>
                                            <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                                            </svg>
                                            Simpan Catatan
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Quick Shortcuts */}
                        <div className="glass-card p-6 rounded-2xl border border-gray-205 shadow-sm bg-white">
                            <h4 className="font-bold text-gray-900 text-sm mb-3">Pintasan Cepat</h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <Link href={route('admin.profile.edit')} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 flex flex-col gap-1 transition-all">
                                    <span className="font-semibold text-gray-800">Edit Profil</span>
                                    <span className="text-[10px] text-gray-400">Atur info dasar</span>
                                </Link>
                                <Link href={route('admin.projects.create')} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 flex flex-col gap-1 transition-all">
                                    <span className="font-semibold text-gray-800">+ Proyek</span>
                                    <span className="text-[10px] text-gray-400">Tambah karya baru</span>
                                </Link>
                                <Link href={route('admin.experience.create')} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 flex flex-col gap-1 transition-all">
                                    <span className="font-semibold text-gray-800">+ Pengalaman</span>
                                    <span className="text-[10px] text-gray-400">Tambah riwayat karir</span>
                                </Link>
                                <Link href={route('admin.skills.create')} className="p-2.5 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 flex flex-col gap-1 transition-all">
                                    <span className="font-semibold text-gray-800">+ Skill</span>
                                    <span className="text-[10px] text-gray-400">Tambah kemampuan</span>
                                </Link>
                            </div>
                            <div className="border-t border-gray-100 mt-4 pt-4">
                                <Link href={route('home')} target="_blank" className="w-full btn-secondary text-xs py-2.5 text-center flex items-center justify-center gap-1.5">
                                    Lihat Website Portofolio
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
