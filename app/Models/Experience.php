<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'organization',
        'type',
        'start_date',
        'end_date',
        'is_current',
        'description',
        'location',
        'employment_type',
        'order',
        'is_active',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'is_current' => 'boolean',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope for active experience entries
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope for ordered experience entries
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('start_date', 'desc');
    }

    /**
     * Get formatted date range
     */
    public function getDateRangeAttribute(): string
    {
        $start = $this->start_date->format('M Y');
        $end = $this->is_current ? 'Present' : ($this->end_date ? $this->end_date->format('M Y') : 'Present');
        return "{$start} - {$end}";
    }
}
