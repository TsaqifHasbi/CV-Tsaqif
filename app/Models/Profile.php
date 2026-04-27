<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'nickname',
        'headline',
        'short_intro',
        'biography',
        'profile_photo',
        'cv_file',
        'email',
        'phone',
        'location',
        'website',
    ];

    /**
     * Get the profile photo URL
     */
    public function getProfilePhotoUrlAttribute(): ?string
    {
        return $this->profile_photo;
    }

    /**
     * Get the CV file URL
     */
    public function getCvFileUrlAttribute(): ?string
    {
        return $this->cv_file;
    }
}
