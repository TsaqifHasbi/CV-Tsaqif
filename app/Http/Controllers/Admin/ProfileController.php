<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the profile edit page
     */
    public function edit(): Response
    {
        $profile = Profile::first() ?? new Profile();

        return Inertia::render('Admin/Profile/Edit', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the profile
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'headline' => 'nullable|string|max:255',
            'short_intro' => 'nullable|string|max:1000',
            'biography' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|url|max:255',
            'profile_photo' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'cv_file' => 'nullable|mimes:pdf|max:5120',
        ]);

        // Remove file fields from validated data - will be handled separately
        unset($validated['profile_photo']);
        unset($validated['cv_file']);

        $profile = Profile::first();

        // Handle profile photo upload - only if new file is uploaded
        if ($request->hasFile('profile_photo')) {
            if ($profile && $profile->profile_photo) {
                Storage::disk('public')->delete($profile->profile_photo);
            }
            $validated['profile_photo'] = $request->file('profile_photo')->store('profile', 'public');
        }

        // Handle CV file upload - only if new file is uploaded
        if ($request->hasFile('cv_file')) {
            if ($profile && $profile->cv_file) {
                Storage::disk('public')->delete($profile->cv_file);
            }
            $validated['cv_file'] = $request->file('cv_file')->store('cv', 'public');
        }

        if ($profile) {
            $profile->update($validated);
        } else {
            Profile::create($validated);
        }

        return redirect()->route('admin.profile.edit')->with('success', 'Profile updated successfully.');
    }

    /**
     * Delete the profile photo
     */
    public function deletePhoto(): RedirectResponse
    {
        $profile = Profile::first();

        if ($profile && $profile->profile_photo) {
            Storage::disk('public')->delete($profile->profile_photo);
            $profile->update(['profile_photo' => null]);
        }

        return redirect()->route('admin.profile.edit')->with('success', 'Photo deleted successfully.');
    }

    /**
     * Delete the CV file
     */
    public function deleteCv(): RedirectResponse
    {
        $profile = Profile::first();

        if ($profile && $profile->cv_file) {
            Storage::disk('public')->delete($profile->cv_file);
            $profile->update(['cv_file' => null]);
        }

        return redirect()->route('admin.profile.edit')->with('success', 'CV deleted successfully.');
    }
}
