<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SkillCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillCategoryController extends Controller
{
    /**
     * Display a listing of skill categories
     */
    public function index(): Response
    {
        $categories = SkillCategory::orderBy('order', 'asc')->get();

        return Inertia::render('Admin/Skills/Categories', [
            'categories' => $categories,
        ]);
    }

    /**
     * Update the category details (e.g. type or name)
     */
    public function update(Request $request, SkillCategory $category): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:skill_categories,name,' . $category->id,
            'type' => 'required|in:skill,tool',
        ]);

        // If the category name changed, we should update the skills that reference it!
        $oldName = $category->name;
        $newName = $validated['name'];

        if ($oldName !== $newName) {
            \App\Models\Skill::where('category', $oldName)->update(['category' => $newName]);
        }

        $category->update($validated);

        return redirect()->back()->with('success', 'Category updated successfully.');
    }

    /**
     * Reorder categories via drag and drop
     */
    public function reorder(Request $request): \Illuminate\Http\JsonResponse
    {
        $validated = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:skill_categories,id',
        ]);

        foreach ($validated['ids'] as $index => $id) {
            SkillCategory::where('id', $id)->update(['order' => $index]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Delete a category
     */
    public function destroy(SkillCategory $category): RedirectResponse
    {
        // Deleting a category should not delete skills, but we can set their category to empty or keep them
        // Let's set skills referencing this category to 'Uncategorized' or similar
        \App\Models\Skill::where('category', $category->name)->update(['category' => 'Uncategorized']);
        
        $category->delete();

        return redirect()->back()->with('success', 'Category deleted successfully.');
    }
}
