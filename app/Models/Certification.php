<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

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
        'valid_from',
        'valid_until',
        'order',
        'is_active',
    ];

    protected $hidden = ['image'];

    protected $appends = ['image_url', 'is_expired', 'validity_status'];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'valid_from' => 'date',
        'valid_until' => 'date',
    ];

    /**
     * Check if the certification has expired
     */
    public function getIsExpiredAttribute(): bool
    {
        if (!$this->valid_until) {
            return false; // No expiry date means it never expires
        }

        return Carbon::now()->greaterThan($this->valid_until);
    }

    /**
     * Get the validity status label
     * Returns: 'active', 'expired', 'not_yet_valid', or 'no_expiry'
     */
    public function getValidityStatusAttribute(): string
    {
        $now = Carbon::now();

        if ($this->valid_from && $now->lessThan($this->valid_from)) {
            return 'not_yet_valid';
        }

        if ($this->valid_until && $now->greaterThan($this->valid_until)) {
            return 'expired';
        }

        if (!$this->valid_from && !$this->valid_until) {
            return 'no_expiry';
        }

        return 'active';
    }

    /**
     * Scope for active certifications (checks is_active AND validity period)
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('valid_until')
                  ->orWhere('valid_until', '>=', Carbon::now()->toDateString());
            });
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
