<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'tech_stack',
        'image',
        'github_link',
        'demo_link',
        'category',
        'completion_date',
        'is_featured',
        'order',
        'is_active',
    ];

    protected $hidden = ['image'];

    protected $appends = ['image_url'];

    protected $casts = [
        'completion_date' => 'date',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope for active projects
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for featured projects
     */
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    /**
     * Scope for ordered projects
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('completion_date', 'desc');
    }

    /**
     * Get the project image URL
     */
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            if (str_starts_with($this->image, 'data:')) {
                return route('projects.image', $this, false);
            }
            return asset('storage/' . $this->image);
        }
        return null;
    }

    /**
     * Get tech stack as array
     */
    public function getTechStackArrayAttribute(): array
    {
        if (!$this->tech_stack) {
            return [];
        }
        return array_map('trim', explode(',', $this->tech_stack));
    }
}
