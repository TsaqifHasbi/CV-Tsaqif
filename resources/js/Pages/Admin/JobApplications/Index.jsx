import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

// Tahapan status badge colors
const tahapanColors = {
    'seleksi administratif': 'bg-blue-50 text-blue-700 border-blue-200',
    'test online': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'interview': 'bg-amber-50 text-amber-700 border-amber-200',
    'interview hr': 'bg-amber-50 text-amber-700 border-amber-200',
    'interview user': 'bg-orange-50 text-orange-700 border-orange-200',
    'offering': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'diterima': 'bg-green-50 text-green-700 border-green-200',
    'accepted': 'bg-green-50 text-green-700 border-green-200',
    'ditolak': 'bg-red-50 text-red-600 border-red-200',
    'rejected': 'bg-red-50 text-red-600 border-red-200',
    'ghosted': 'bg-gray-50 text-gray-500 border-gray-200',
    'pending': 'bg-yellow-50 text-yellow-700 border-yellow-200',
};

function getTahapanColor(tahapan) {
    const key = (tahapan || '').toLowerCase().trim();
    for (const [match, color] of Object.entries(tahapanColors)) {
        if (key.includes(match)) return color;
    }
    return 'bg-gray-50 text-gray-600 border-gray-200';
}

// Add/Edit Modal Form
function FormModal({ isOpen, onClose, onSubmit, initialData, isEditing }) {
    const [form, setForm] = useState(initialData || {
        perusahaan: '', posisi: '', lokasi: '', tahapan: 'Seleksi Administratif', web: '', url: ''
    });
    const [submitting, setSubmitting] = useState(false);

    React.useEffect(() => {
        if (initialData) setForm(initialData);
        else setForm({ perusahaan: '', posisi: '', lokasi: '', tahapan: 'Seleksi Administratif', web: '', url: '' });
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        onSubmit(form, () => setSubmitting(false));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                        {isEditing ? 'Edit Lamaran' : 'Tambah Lamaran Baru'}
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Perusahaan <span className="text-red-500">*</span></label>
                        <input type="text" required value={form.perusahaan} onChange={e => setForm({...form, perusahaan: e.target.value})} className="form-input" placeholder="Nama perusahaan" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Posisi <span className="text-red-500">*</span></label>
                            <input type="text" required value={form.posisi} onChange={e => setForm({...form, posisi: e.target.value})} className="form-input" placeholder="Frontend Developer" />
                        </div>
                        <div>
                            <label className="form-label">Lokasi</label>
                            <input type="text" value={form.lokasi} onChange={e => setForm({...form, lokasi: e.target.value})} className="form-input" placeholder="Jakarta" />
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Tahapan <span className="text-red-500">*</span></label>
                        <select value={form.tahapan} onChange={e => setForm({...form, tahapan: e.target.value})} className="form-input">
                            <option value="Seleksi Administratif">Seleksi Administratif</option>
                            <option value="Test Online">Test Online</option>
                            <option value="Interview HR">Interview HR</option>
                            <option value="Interview User">Interview User</option>
                            <option value="Offering">Offering</option>
                            <option value="Diterima">Diterima</option>
                            <option value="Ditolak">Ditolak</option>
                            <option value="Ghosted">Ghosted</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Website</label>
                            <input type="text" value={form.web} onChange={e => setForm({...form, web: e.target.value})} className="form-input" placeholder="company.com" />
                        </div>
                        <div>
                            <label className="form-label">URL Lamaran</label>
                            <input type="text" value={form.url} onChange={e => setForm({...form, url: e.target.value})} className="form-input" placeholder="https://..." />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary text-sm py-2 px-4">Batal</button>
                        <button type="submit" disabled={submitting} className="btn-primary text-sm py-2 px-4">
                            {submitting ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                                    Menyimpan...
                                </span>
                            ) : (isEditing ? 'Perbarui' : 'Simpan')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Index({ applications, stats, isConfigured, error, spreadsheetUrl }) {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTahapan, setFilterTahapan] = useState('');

    // Filter applications
    const filtered = (applications || []).filter(app => {
        const q = searchQuery.toLowerCase();
        const matchSearch = !q || 
            (app.perusahaan || '').toLowerCase().includes(q) ||
            (app.posisi || '').toLowerCase().includes(q) ||
            (app.lokasi || '').toLowerCase().includes(q);
        const matchFilter = !filterTahapan || 
            (app.tahapan || '').toLowerCase().includes(filterTahapan.toLowerCase());
        return matchSearch && matchFilter;
    });

    const handleAdd = (formData, done) => {
        router.post(route('admin.job-applications.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                setShowForm(false);
                done();
                Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true })
                    .fire({ icon: 'success', title: 'Lamaran berhasil ditambahkan ke Google Sheets!' });
            },
            onError: () => done(),
        });
    };

    const handleEdit = (formData, done) => {
        router.put(route('admin.job-applications.update', editData._row), { ...formData, no: editData.no }, {
            preserveScroll: true,
            onSuccess: () => {
                setEditData(null);
                done();
                Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, timerProgressBar: true })
                    .fire({ icon: 'success', title: 'Data berhasil diperbarui di Google Sheets!' });
            },
            onError: () => done(),
        });
    };

    const handleDelete = (app) => {
        Swal.fire({
            title: `Hapus lamaran di ${app.perusahaan}?`,
            text: 'Data akan dihapus dari Google Sheets.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f43f5e',
            cancelButtonColor: '#9ca3af',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        }).then(result => {
            if (result.isConfirmed) {
                router.delete(route('admin.job-applications.destroy', app._row), {
                    preserveScroll: true,
                    onSuccess: () => Swal.fire('Terhapus!', 'Data dihapus dari Google Sheets.', 'success'),
                });
            }
        });
    };

    // Setup Guide if not configured
    if (!isConfigured) {
        return (
            <AdminLayout title="Lamaran Magang">
                <Head title="Lamaran Magang" />
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="glass-card p-8 rounded-2xl border-l-4 border-amber-500">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold text-gray-900">Setup Google Sheets Integration</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Halaman ini terintegrasi langsung dengan Google Spreadsheet Anda. Untuk mengaktifkannya, pilih salah satu metode berikut:
                                </p>
                                <div className="space-y-4 mt-4">
                                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                                        <h4 className="font-semibold text-emerald-800 text-sm mb-2">✅ Metode 1: Google Apps Script Web App (Recommended)</h4>
                                        <ol className="text-xs text-emerald-700 space-y-1 list-decimal list-inside">
                                            <li>Buka Google Spreadsheet Anda</li>
                                            <li>Klik <strong>Extensions → Apps Script</strong></li>
                                            <li>Paste kode Apps Script yang disediakan</li>
                                            <li>Deploy sebagai <strong>Web App</strong> (Execute as: Me, Access: Anyone)</li>
                                            <li>Copy URL dan tambahkan ke file <code className="bg-emerald-100 px-1 rounded">.env</code>:</li>
                                        </ol>
                                        <code className="block mt-2 text-xs bg-emerald-100 p-2 rounded font-mono">GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec</code>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                                        <h4 className="font-semibold text-blue-800 text-sm mb-2">Metode 2: Google Service Account API</h4>
                                        <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                                            <li>Buat project di Google Cloud Console</li>
                                            <li>Aktifkan Google Sheets API</li>
                                            <li>Buat Service Account & download JSON key</li>
                                            <li>Share spreadsheet ke email service account</li>
                                            <li>Letakkan file JSON di <code className="bg-blue-100 px-1 rounded">storage/app/google-credentials.json</code></li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Lamaran Magang">
            <Head title="Lamaran Magang" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <p className="text-gray-500 text-sm">
                            Data terintegrasi langsung dengan Google Sheets — perubahan akan sinkron otomatis.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {spreadsheetUrl && (
                            <a href={spreadsheetUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                Buka Spreadsheet
                            </a>
                        )}
                        <button onClick={() => router.reload()} className="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh
                        </button>
                        <button onClick={() => { setEditData(null); setShowForm(true); }} className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                            Tambah Lamaran
                        </button>
                    </div>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="glass-card p-4 rounded-xl border-l-4 border-red-500 bg-red-50">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div className="glass-card p-4 rounded-xl">
                        <p className="text-2xl font-bold text-gray-900">{stats?.total || 0}</p>
                        <p className="text-xs text-gray-500 font-medium mt-1">Total Lamaran</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mb-2"><span className="text-blue-600 text-sm">📋</span></div>
                        <p className="text-xl font-bold text-gray-900">{stats?.seleksi || 0}</p>
                        <p className="text-xs text-gray-500 font-medium">Seleksi</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mb-2"><span className="text-amber-600 text-sm">🎙️</span></div>
                        <p className="text-xl font-bold text-gray-900">{stats?.interview || 0}</p>
                        <p className="text-xs text-gray-500 font-medium">Interview</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center mb-2"><span className="text-green-600 text-sm">✅</span></div>
                        <p className="text-xl font-bold text-gray-900">{stats?.diterima || 0}</p>
                        <p className="text-xs text-gray-500 font-medium">Diterima</p>
                    </div>
                    <div className="glass-card p-4 rounded-xl">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center mb-2"><span className="text-red-500 text-sm">❌</span></div>
                        <p className="text-xl font-bold text-gray-900">{stats?.ditolak || 0}</p>
                        <p className="text-xs text-gray-500 font-medium">Ditolak</p>
                    </div>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-grow">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Cari perusahaan, posisi, atau lokasi..."
                            className="form-input pl-10 text-sm"
                        />
                    </div>
                    <select value={filterTahapan} onChange={e => setFilterTahapan(e.target.value)} className="form-input text-sm w-full sm:w-48">
                        <option value="">Semua Tahapan</option>
                        <option value="Seleksi">Seleksi</option>
                        <option value="Test">Test Online</option>
                        <option value="Interview">Interview</option>
                        <option value="Offering">Offering</option>
                        <option value="Diterima">Diterima</option>
                        <option value="Ditolak">Ditolak</option>
                        <option value="Ghosted">Ghosted</option>
                    </select>
                </div>

                {/* Data Table */}
                <div className="glass-card rounded-2xl overflow-hidden border border-gray-200">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs w-12">NO</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs">PERUSAHAAN</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs">POSISI</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs">LOKASI</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs">TAHAPAN</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs">WEB</th>
                                    <th className="py-3 px-4 font-semibold text-gray-500 text-xs text-right">AKSI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filtered.length > 0 ? filtered.map((app, idx) => (
                                    <tr key={app._row || idx} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="py-3 px-4 text-gray-400 font-medium text-xs">{app.no || idx + 1}</td>
                                        <td className="py-3 px-4">
                                            <span className="font-semibold text-gray-900">{app.perusahaan}</span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-600">{app.posisi}</td>
                                        <td className="py-3 px-4 text-gray-500 text-xs">{app.lokasi || '-'}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getTahapanColor(app.tahapan)}`}>
                                                {app.tahapan || '-'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-xs">
                                            {app.url ? (
                                                <a href={app.url.startsWith('http') ? app.url : `https://${app.url}`} target="_blank" rel="noopener noreferrer" className="text-rose-500 hover:text-rose-600 hover:underline font-medium truncate block max-w-[120px]">
                                                    {app.web || 'Link'}
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">{app.web || '-'}</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    onClick={() => { setEditData(app); setShowForm(false); }}
                                                    className="text-gray-500 hover:text-gray-900 p-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(app)}
                                                    className="text-red-500 hover:text-red-700 p-1.5 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                                                    title="Hapus"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={7} className="py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                                <p className="text-gray-400 text-sm">
                                                    {searchQuery || filterTahapan ? 'Tidak ada lamaran yang cocok dengan filter.' : 'Belum ada data lamaran.'}
                                                </p>
                                                {!searchQuery && !filterTahapan && (
                                                    <button onClick={() => setShowForm(true)} className="btn-primary text-xs py-2 px-4 mt-2">
                                                        Tambah Lamaran Pertama
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {filtered.length > 0 && (
                        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50 text-xs text-gray-500">
                            Menampilkan {filtered.length} dari {(applications || []).length} lamaran
                        </div>
                    )}
                </div>

                {/* Sync Info */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    <span>Terhubung langsung dengan Google Sheets — Klik <strong>Refresh</strong> untuk melihat perubahan terbaru dari spreadsheet.</span>
                </div>

            </div>

            {/* Add Modal */}
            <FormModal
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                onSubmit={handleAdd}
                initialData={null}
                isEditing={false}
            />

            {/* Edit Modal */}
            <FormModal
                isOpen={!!editData}
                onClose={() => setEditData(null)}
                onSubmit={handleEdit}
                initialData={editData}
                isEditing={true}
            />

        </AdminLayout>
    );
}
