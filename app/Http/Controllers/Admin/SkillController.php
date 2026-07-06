<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    /**
     * Display a listing of skills
     */
    public function index(): Response
    {
        $skills = Skill::groupedByCategory()->get();
        $skillsByCategory = $skills->groupBy('category');

        return Inertia::render('Admin/Skills/Index', [
            'skills' => $skills,
            'skillsByCategory' => $skillsByCategory,
        ]);
    }

    /**
     * Show the form for creating a new skill
     */
    public function create(): Response
    {
        $categories = Skill::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Skills/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created skill
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['order'] = $validated['order'] ?? 0;

        // Convert logo image to base64 string
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $base64 = base64_encode(file_get_contents($file->path()));
            $mime = $file->getClientMimeType();
            $validated['logo'] = 'data:' . $mime . ';base64,' . $base64;
        }

        Skill::create($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill created successfully.');
    }

    /**
     * Show the form for editing a skill
     */
    public function edit(Skill $skill): Response
    {
        $categories = Skill::distinct()->pluck('category')->filter()->values();

        return Inertia::render('Admin/Skills/Edit', [
            'skill' => $skill,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified skill
     */
    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:100',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp|max:2048',
            'order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $request->boolean('is_active', true);

        // Remove logo by default unless a new file is uploaded
        unset($validated['logo']);

        // Convert logo image to base64 string
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $base64 = base64_encode(file_get_contents($file->path()));
            $mime = $file->getClientMimeType();
            $validated['logo'] = 'data:' . $mime . ';base64,' . $base64;
        }

        $skill->update($validated);

        return redirect()->route('admin.skills.index')->with('success', 'Skill updated successfully.');
    }

    /**
     * Remove the specified skill
     */
    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return redirect()->route('admin.skills.index')->with('success', 'Skill deleted successfully.');
    }

    /**
     * Delete the skill logo
     */
    public function deleteLogo(Skill $skill): RedirectResponse
    {
        $skill->update(['logo' => null]);

        return redirect()->route('admin.skills.edit', $skill)->with('success', 'Logo deleted successfully.');
    }
}
