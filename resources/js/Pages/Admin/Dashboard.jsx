import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ stats, profile, recentProjects, recentExperiences }) {
    const statCards = [
        { label: 'Education', value: stats?.education || 0, icon: 'M12 14l9-5-9-5-9 5 9 5z', color: 'from-blue-500 to-cyan-500' },
        { label: 'Experience', value: stats?.experiences || 0, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745', color: 'from-purple-500 to-pink-500' },
        { label: 'Skills', value: stats?.skills || 0, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707', color: 'from-green-500 to-emerald-500' },
        { label: 'Projects', value: stats?.projects || 0, icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586', color: 'from-orange-500 to-yellow-500' },
        { label: 'Certifications', value: stats?.certifications || 0, icon: 'M9 12l2 2 4-4', color: 'from-rose-500 to-pink-500' },
        { label: 'Social Links', value: stats?.socialLinks || 0, icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4', color: 'from-indigo-500 to-violet-500' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="glass-card p-6 rounded-xl">
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}!</h2>
                    <p className="text-gray-500">Manage your portfolio content from this dashboard.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {statCards.map((stat) => (
                        <div key={stat.label} className="glass-card p-4 rounded-xl">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} opacity-20 flex items-center justify-center mb-3`}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={stat.icon} />
                                </svg>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href={route('admin.profile.edit')} className="btn-secondary justify-center">Edit Profile</Link>
                        <Link href={route('admin.projects.create')} className="btn-secondary justify-center">Add Project</Link>
                        <Link href={route('admin.experience.create')} className="btn-secondary justify-center">Add Experience</Link>
                        <Link href={route('admin.skills.create')} className="btn-secondary justify-center">Add Skill</Link>
                    </div>
                </div>

                {/* Profile Status */}
                {!profile && (
                    <div className="glass-card p-6 rounded-xl border-l-4 border-yellow-500">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-gray-900 font-semibold">Profile Not Set Up</h4>
                                <p className="text-gray-500 text-sm mt-1">Your public portfolio is missing profile information. Set it up to make your CV visible.</p>
                                <Link href={route('admin.profile.edit')} className="btn-primary mt-4">Set Up Profile</Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
