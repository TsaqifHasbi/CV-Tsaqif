<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CertificationController extends Controller
{
    /**
     * Display a listing of certifications
     */
    public function index(): Response
    {
        $certifications = Certification::ordered()->get();

        return Inertia::render('Admin/Certifications/Index', [
            'certifications' => $certifications,
        ]);
    }

    /**
     * Show the form for creating a new certification
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Certifications/Create');
    }

    /**
     * Store a newly created certification
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('certifications', 'public');
        }

        Certification::create($validated);

        return redirect()->route('admin.certifications.index')->with('success', 'Certification created successfully.');
    }

    /**
     * Show the form for editing a certification
     */
    public function edit(Certification $certification): Response
    {
        return Inertia::render('Admin/Certifications/Edit', [
            'certification' => $certification,
        ]);
    }

    /**
     * Update the specified certification
     */
    public function update(Request $request, Certification $certification): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'issuer' => 'required|string|max:255',
            'year' => 'required|string|max:10',
            'credential_id' => 'nullable|string|max:255',
            'credential_url' => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        if ($request->hasFile('image')) {
            if ($certification->image) {
                Storage::disk('public')->delete($certification->image);
            }
            $validated['image'] = $request->file('image')->store('certifications', 'public');
        }

        $certification->update($validated);

        return redirect()->route('admin.certifications.index')->with('success', 'Certification updated successfully.');
    }

    /**
     * Remove the specified certification
     */
    public function destroy(Certification $certification): RedirectResponse
    {
        if ($certification->image) {
            Storage::disk('public')->delete($certification->image);
        }

        $certification->delete();

        return redirect()->route('admin.certifications.index')->with('success', 'Certification deleted successfully.');
    }

    /**
     * Delete the certification image
     */
    public function deleteImage(Certification $certification): RedirectResponse
    {
        if ($certification->image) {
            Storage::disk('public')->delete($certification->image);
            $certification->update(['image' => null]);
        }

        return redirect()->route('admin.certifications.edit', $certification)->with('success', 'Image deleted successfully.');
    }
}
