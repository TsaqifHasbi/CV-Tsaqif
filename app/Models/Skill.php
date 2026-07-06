<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;

    protected $table = 'skills_with_logos';

    protected $fillable = [
        'name',
        'category',
        'logo',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Hide the raw base64 logo from JSON serialization.
     * Use the logo_url accessor instead.
     */
    protected $hidden = ['logo'];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = ['logo_url'];

    /**
     * Scope for active skills
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered skills
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc');
    }

    /**
     * Scope to group by category
     */
    public function scopeGroupedByCategory($query)
    {
        return $query->orderBy('category', 'asc')->orderBy('order', 'asc');
    }

    /**
     * Get the logo URL via the dedicated route (avoids sending base64 in props)
     */
    public function getLogoUrlAttribute(): ?string
    {
        if ($this->logo) {
            return route('skills.logo', $this, false);
        }
        return null;
    }

    /**
     * Get the category detail for this skill
     */
    public function categoryDetail()
    {
        return $this->belongsTo(SkillCategory::class, 'category', 'name');
    }
}
