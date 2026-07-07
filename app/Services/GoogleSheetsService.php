<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class GoogleSheetsService
{
    protected ?string $webAppUrl;

    public function __construct()
    {
        $this->webAppUrl = env('GOOGLE_SHEETS_WEBAPP_URL');
    }

    /**
     * Check if the service is properly configured (via WebApp URL).
     */
    public function isConfigured(): bool
    {
        return !empty($this->webAppUrl);
    }

    /**
     * Read all job application rows from the sheet.
     *
     * @return array ['data' => [...], 'error' => null|string]
     */
    public function getAll(): array
    {
        if (empty($this->webAppUrl)) {
            return ['data' => [], 'error' => 'Google Sheets integration tidak terkonfigurasi. Silakan setup GOOGLE_SHEETS_WEBAPP_URL di file .env.'];
        }

        try {
            $response = Http::timeout(15)->get($this->webAppUrl);
            if ($response->successful()) {
                return ['data' => $response->json(), 'error' => null];
            }
            return ['data' => [], 'error' => 'Google Apps Script WebApp error: Code ' . $response->status()];
        } catch (\Exception $e) {
            Log::error('Google Sheets WebApp read error: ' . $e->getMessage());
            return ['data' => [], 'error' => 'Gagal membaca spreadsheet: ' . $e->getMessage()];
        }
    }

    /**
     * Append a new row to the sheet.
     */
    public function appendRow(array $values): array
    {
        if (empty($this->webAppUrl)) {
            return ['success' => false, 'error' => 'Google Sheets integration tidak terkonfigurasi.'];
        }

        try {
            $payload = array_merge($values, ['action' => 'create']);
            $response = Http::timeout(15)->post($this->webAppUrl, $payload);
            if ($response->successful() && isset($response->json()['success']) && $response->json()['success']) {
                return ['success' => true, 'error' => null];
            }
            return ['success' => false, 'error' => 'Gagal menyimpan data via WebApp: ' . ($response->json()['error'] ?? 'Unknown error')];
        } catch (\Exception $e) {
            Log::error('Google Sheets WebApp append error: ' . $e->getMessage());
            return ['success' => false, 'error' => 'Gagal menyimpan data via WebApp: ' . $e->getMessage()];
        }
    }

    /**
     * Update a specific row in the sheet.
     */
    public function updateRow(int $rowNumber, array $values): array
    {
        if (empty($this->webAppUrl)) {
            return ['success' => false, 'error' => 'Google Sheets integration tidak terkonfigurasi.'];
        }

        try {
            $payload = array_merge($values, ['action' => 'update', '_row' => $rowNumber]);
            $response = Http::timeout(15)->post($this->webAppUrl, $payload);
            if ($response->successful() && isset($response->json()['success']) && $response->json()['success']) {
                return ['success' => true, 'error' => null];
            }
            return ['success' => false, 'error' => 'Gagal memperbarui data via WebApp: ' . ($response->json()['error'] ?? 'Unknown error')];
        } catch (\Exception $e) {
            Log::error('Google Sheets WebApp update error: ' . $e->getMessage());
            return ['success' => false, 'error' => 'Gagal memperbarui data via WebApp: ' . $e->getMessage()];
        }
    }

    /**
     * Delete (clear or delete) a specific row in the sheet.
     */
    public function deleteRow(int $rowNumber): array
    {
        if (empty($this->webAppUrl)) {
            return ['success' => false, 'error' => 'Google Sheets integration tidak terkonfigurasi.'];
        }

        try {
            $payload = ['action' => 'delete', '_row' => $rowNumber];
            $response = Http::timeout(15)->post($this->webAppUrl, $payload);
            if ($response->successful() && isset($response->json()['success']) && $response->json()['success']) {
                return ['success' => true, 'error' => null];
            }
            return ['success' => false, 'error' => 'Gagal menghapus data via WebApp: ' . ($response->json()['error'] ?? 'Unknown error')];
        } catch (\Exception $e) {
            Log::error('Google Sheets WebApp delete error: ' . $e->getMessage());
            return ['success' => false, 'error' => 'Gagal menghapus data via WebApp: ' . $e->getMessage()];
        }
    }
}
