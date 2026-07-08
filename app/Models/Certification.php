<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certification extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'issuer',
        'year',
        'credential_id',
        'credential_url',
        'description',
        'image',
        'order',
        'is_active',
    ];

    protected $hidden = ['image'];

    protected $appends = ['image_url'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope for active certifications
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered certifications
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('year', 'desc');
    }

    /**
     * Get the certification image URL
     */
    public function getImageUrlAttribute(): ?string
    {
        if ($this->image) {
            if (str_starts_with($this->image, 'data:')) {
                return route('certifications.image', $this, false);
            }
            return asset('storage/' . $this->image);
        }
        return null;
    }
}
