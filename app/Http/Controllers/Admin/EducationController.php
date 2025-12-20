<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    /**
     * Display a listing of education entries
     */
    public function index(): Response
    {
        $education = Education::ordered()->get();

        return Inertia::render('Admin/Education/Index', [
            'education' => $education,
        ]);
    }

    /**
     * Show the form for creating a new education entry
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Education/Create');
    }

    /**
     * Store a newly created education entry
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
            'start_year' => 'required|string|max:10',
            'end_year' => 'nullable|string|max:10',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:20',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        Education::create($validated);

        return redirect()->route('admin.education.index')->with('success', 'Education entry created successfully.');
    }

    /**
     * Show the form for editing an education entry
     */
    public function edit(Education $education): Response
    {
        return Inertia::render('Admin/Education/Edit', [
            'education' => $education,
        ]);
    }

    /**
     * Update the specified education entry
     */
    public function update(Request $request, Education $education): RedirectResponse
    {
        $validated = $request->validate([
            'institution' => 'required|string|max:255',
            'degree' => 'required|string|max:255',
            'field_of_study' => 'nullable|string|max:255',
            'start_year' => 'required|string|max:10',
            'end_year' => 'nullable|string|max:10',
            'description' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:20',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        $education->update($validated);

        return redirect()->route('admin.education.index')->with('success', 'Education entry updated successfully.');
    }

    /**
     * Remove the specified education entry
     */
    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return redirect()->route('admin.education.index')->with('success', 'Education entry deleted successfully.');
    }
}
