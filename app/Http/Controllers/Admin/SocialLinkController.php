<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SocialLink;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SocialLinkController extends Controller
{
    /**
     * Display a listing of social links
     */
    public function index(): Response
    {
        $socialLinks = SocialLink::ordered()->get();

        return Inertia::render('Admin/SocialLinks/Index', [
            'socialLinks' => $socialLinks,
        ]);
    }

    /**
     * Show the form for creating a new social link
     */
    public function create(): Response
    {
        $platforms = [
            'linkedin' => 'LinkedIn',
            'github' => 'GitHub',
            'twitter' => 'Twitter/X',
            'facebook' => 'Facebook',
            'instagram' => 'Instagram',
            'youtube' => 'YouTube',
            'tiktok' => 'TikTok',
            'dribbble' => 'Dribbble',
            'behance' => 'Behance',
            'medium' => 'Medium',
            'dev' => 'Dev.to',
            'stackoverflow' => 'Stack Overflow',
            'email' => 'Email',
            'website' => 'Website',
            'other' => 'Other',
        ];

        return Inertia::render('Admin/SocialLinks/Create', [
            'platforms' => $platforms,
        ]);
    }

    /**
     * Store a newly created social link
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        SocialLink::create($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link created successfully.');
    }

    /**
     * Show the form for editing a social link
     */
    public function edit(SocialLink $socialLink): Response
    {
        $platforms = [
            'linkedin' => 'LinkedIn',
            'github' => 'GitHub',
            'twitter' => 'Twitter/X',
            'facebook' => 'Facebook',
            'instagram' => 'Instagram',
            'youtube' => 'YouTube',
            'tiktok' => 'TikTok',
            'dribbble' => 'Dribbble',
            'behance' => 'Behance',
            'medium' => 'Medium',
            'dev' => 'Dev.to',
            'stackoverflow' => 'Stack Overflow',
            'email' => 'Email',
            'website' => 'Website',
            'other' => 'Other',
        ];

        return Inertia::render('Admin/SocialLinks/Edit', [
            'socialLink' => $socialLink,
            'platforms' => $platforms,
        ]);
    }

    /**
     * Update the specified social link
     */
    public function update(Request $request, SocialLink $socialLink): RedirectResponse
    {
        $validated = $request->validate([
            'platform' => 'required|string|max:50',
            'url' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        $socialLink->update($validated);

        return redirect()->route('admin.social-links.index')->with('success', 'Social link updated successfully.');
    }

    /**
     * Remove the specified social link
     */
    public function destroy(SocialLink $socialLink): RedirectResponse
    {
        $socialLink->delete();

        return redirect()->route('admin.social-links.index')->with('success', 'Social link deleted successfully.');
    }
}
