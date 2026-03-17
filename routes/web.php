<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes - Multi-Page CV/Portfolio
|--------------------------------------------------------------------------
*/

// Home / Hero page
Route::get('/', [PublicController::class, 'index'])->name('home');

// About page
Route::get('/about', [PublicController::class, 'about'])->name('about');

// Education & Skills page (combined)
Route::get('/education', [PublicController::class, 'education'])->name('education');

// Experience, Projects & Certifications page (combined)
Route::get('/experience', [PublicController::class, 'experience'])->name('experience');

// Contact page
Route::get('/contact', [PublicController::class, 'contact'])->name('contact');

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Auth Middleware)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Profile Management
    Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/photo', [AdminProfileController::class, 'deletePhoto'])->name('profile.delete-photo');
    Route::delete('/profile/cv', [AdminProfileController::class, 'deleteCv'])->name('profile.delete-cv');
    
    // Education CRUD
    Route::resource('education', EducationController::class);
    
    // Experience CRUD
    Route::resource('experience', ExperienceController::class);
    
    // Skills CRUD
    Route::resource('skills', SkillController::class);
    
    // Projects CRUD
    Route::resource('projects', ProjectController::class);
    Route::delete('/projects/{project}/image', [ProjectController::class, 'deleteImage'])->name('projects.delete-image');
    
    // Certifications CRUD
    Route::resource('certifications', CertificationController::class);
    Route::delete('/certifications/{certification}/image', [CertificationController::class, 'deleteImage'])->name('certifications.delete-image');
    
    // Social Links CRUD
    Route::resource('social-links', SocialLinkController::class);
});

// Redirect /dashboard to admin dashboard for authenticated users
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Breeze Profile Routes (User Account Settings)
Route::middleware('auth')->group(function () {
    Route::get('/settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
