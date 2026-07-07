<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\GoogleSheetsService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobApplicationController extends Controller
{
    protected GoogleSheetsService $sheets;

    public function __construct(GoogleSheetsService $sheets)
    {
        $this->sheets = $sheets;
    }

    /**
     * Display a listing of job applications (read from Google Sheets).
     */
    public function index(): Response
    {
        $isConfigured = $this->sheets->isConfigured();
        $result = $isConfigured ? $this->sheets->getAll() : ['data' => [], 'error' => null];

        $applications = $result['data'];

        // Calculate stats from live data
        $stats = [
            'total' => count($applications),
            'seleksi' => count(array_filter($applications, fn($a) => str_contains(strtolower($a['tahapan']), 'seleksi'))),
            'interview' => count(array_filter($applications, fn($a) => str_contains(strtolower($a['tahapan']), 'interview'))),
            'ditolak' => count(array_filter($applications, fn($a) => str_contains(strtolower($a['tahapan']), 'ditolak') || str_contains(strtolower($a['tahapan']), 'rejected'))),
            'diterima' => count(array_filter($applications, fn($a) => str_contains(strtolower($a['tahapan']), 'diterima') || str_contains(strtolower($a['tahapan']), 'accepted'))),
        ];

        return Inertia::render('Admin/JobApplications/Index', [
            'applications' => $applications,
            'stats' => $stats,
            'isConfigured' => $isConfigured,
            'error' => $result['error'],
            'spreadsheetUrl' => 'https://docs.google.com/spreadsheets/d/' . config('services.google_sheets.spreadsheet_id', ''),
        ]);
    }

    /**
     * Store a new job application (append to Google Sheets).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'perusahaan' => 'required|string|max:255',
            'posisi' => 'required|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'tahapan' => 'required|string|max:100',
            'web' => 'nullable|string|max:255',
            'url' => 'nullable|string|max:2000',
        ]);

        $result = $this->sheets->appendRow($validated);

        if ($result['success']) {
            return redirect()->route('admin.job-applications.index')->with('success', 'Lamaran berhasil ditambahkan ke Google Sheets.');
        }

        return back()->withErrors(['sheets' => $result['error']]);
    }

    /**
     * Update the specified job application (update row in Google Sheets).
     */
    public function update(Request $request, int $row): RedirectResponse
    {
        $validated = $request->validate([
            'no' => 'required|string|max:10',
            'perusahaan' => 'required|string|max:255',
            'posisi' => 'required|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'tahapan' => 'required|string|max:100',
            'web' => 'nullable|string|max:255',
            'url' => 'nullable|string|max:2000',
        ]);

        $result = $this->sheets->updateRow($row, $validated);

        if ($result['success']) {
            return redirect()->route('admin.job-applications.index')->with('success', 'Lamaran berhasil diperbarui di Google Sheets.');
        }

        return back()->withErrors(['sheets' => $result['error']]);
    }

    /**
     * Remove the specified job application (clear row in Google Sheets).
     */
    public function destroy(int $row): RedirectResponse
    {
        $result = $this->sheets->deleteRow($row);

        if ($result['success']) {
            return redirect()->route('admin.job-applications.index')->with('success', 'Lamaran berhasil dihapus dari Google Sheets.');
        }

        return back()->withErrors(['sheets' => $result['error']]);
    }
}
