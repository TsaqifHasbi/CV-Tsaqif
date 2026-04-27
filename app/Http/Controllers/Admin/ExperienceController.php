<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    /**
     * Display a listing of experiences
     */
    public function index(): Response
    {
        $experiences = Experience::ordered()->get();

        return Inertia::render('Admin/Experience/Index', [
            'experiences' => $experiences,
        ]);
    }

    /**
     * Show the form for creating a new experience
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Experience/Create');
    }

    /**
     * Store a newly created experience
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:work,organization',
            'job_title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:50',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_current'] = $request->boolean('is_current', false);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        if ($validated['is_current']) {
            $validated['end_date'] = null;
        }

        Experience::create($validated);

        return redirect()->route('admin.experience.index')->with('success', 'Experience created successfully.');
    }

    /**
     * Show the form for editing an experience
     */
    public function edit(Experience $experience): Response
    {
        return Inertia::render('Admin/Experience/Edit', [
            'experience' => $experience,
        ]);
    }

    /**
     * Update the specified experience
     */
    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $validated = $request->validate([
            'type' => 'required|in:work,organization',
            'job_title' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'is_current' => 'boolean',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:50',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_current'] = $request->boolean('is_current', false);
        $validated['is_active'] = $request->boolean('is_active', true);

        if ($validated['is_current']) {
            $validated['end_date'] = null;
        }

        $experience->update($validated);

        return redirect()->route('admin.experience.index')->with('success', 'Experience updated successfully.');
    }

    /**
     * Remove the specified experience
     */
    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return redirect()->route('admin.experience.index')->with('success', 'Experience deleted successfully.');
    }
}
