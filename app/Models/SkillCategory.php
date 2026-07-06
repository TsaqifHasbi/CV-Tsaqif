<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkillCategory extends Model
{
    use HasFactory;

    protected $table = 'skill_categories';

    protected $fillable = [
        'name',
        'type',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Get the skills in this category
     */
    public function skills()
    {
        return $this->hasMany(Skill::class, 'category', 'name')->ordered();
    }
}
