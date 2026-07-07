<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class ToggleController extends Controller
{
    /**
     * Allowed models mapping.
     */
    protected array $allowedModels = [
        'project' => \App\Models\Project::class,
        'experience' => \App\Models\Experience::class,
        'skill' => \App\Models\Skill::class,
        'certification' => \App\Models\Certification::class,
        'education' => \App\Models\Education::class,
        'social-link' => \App\Models\SocialLink::class,
    ];

    /**
     * Allowed boolean fields mapping.
     */
    protected array $allowedFields = [
        'is_active',
        'is_featured',
    ];

    /**
     * Toggle a boolean field on a model instance dynamically.
     *
     * @param string $modelKey
     * @param int $id
     * @param string $field
     * @return JsonResponse
     */
    public function toggle(string $modelKey, int $id, string $field): JsonResponse
    {
        if (!array_key_exists($modelKey, $this->allowedModels)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid model type specified.'
            ], 400);
        }

        if (!in_array($field, $this->allowedFields)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid field specified for toggle.'
            ], 400);
        }

        $modelClass = $this->allowedModels[$modelKey];
        $instance = $modelClass::findOrFail($id);

        // Toggle the boolean value
        $newValue = !$instance->$field;
        $instance->update([
            $field => $newValue
        ]);

        return response()->json([
            'success' => true,
            'message' => ucfirst(str_replace('-', ' ', $modelKey)) . " field '{$field}' updated successfully.",
            'new_value' => $newValue
        ]);
    }
}
