<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileServeController extends Controller
{
    /**
     * Serve files from storage/app/public directory.
     * This replaces the need for the storage:link symlink,
     * which doesn't persist on ephemeral hosting platforms like Laravel Cloud.
     */
    public function serve(string $path): StreamedResponse
    {
        $disk = Storage::disk('public');

        // Clean path
        $path = ltrim($path, '/');

        if (!$disk->exists($path)) {
            abort(404, "File not found in storage: " . $path);
        }

        $mimeType = $disk->mimeType($path) ?? 'application/octet-stream';
        $fileSize = $disk->size($path);
        $lastModified = $disk->lastModified($path);

        return response()->stream(
            function () use ($disk, $path) {
                $stream = $disk->readStream($path);
                fpassthru($stream);
                if (is_resource($stream)) {
                    fclose($stream);
                }
            },
            200,
            [
                'Content-Type' => $mimeType,
                'Content-Length' => $fileSize,
                'Last-Modified' => gmdate('D, d M Y H:i:s', $lastModified) . ' GMT',
                'Cache-Control' => 'public, max-age=31536000',
                'Content-Disposition' => str_starts_with($mimeType, 'image/') || $mimeType === 'application/pdf'
                    ? 'inline'
                    : 'attachment; filename="' . basename($path) . '"',
            ]
        );
    }
}
