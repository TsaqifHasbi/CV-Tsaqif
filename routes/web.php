<?php

use App\Http\Controllers\Admin\CertificationController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EducationController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\Admin\SkillCategoryController;
use App\Http\Controllers\Admin\SocialLinkController;
use App\Http\Controllers\Admin\ToggleController;
use App\Http\Controllers\Admin\JobApplicationController;
use App\Http\Controllers\FileServeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| File Serve Route (replaces storage:link symlink for cloud hosting)
|--------------------------------------------------------------------------
*/

Route::get('/storage/{path}', [FileServeController::class, 'serve'])
    ->where('path', '.*')
    ->name('storage.serve');

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

// Contact Form Submit
Route::post('/contact/send', [PublicController::class, 'sendContactMessage'])->name('contact.send');

// Skill Logo (serves base64 logo as image response)
Route::get('/skills/{skill}/logo', [PublicController::class, 'serveSkillLogo'])->name('skills.logo');

// Blog page
Route::get('https://teknocode01.wordpress.com/', [PublicController::class, 'blog'])->name('blog');


/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Auth Middleware)
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard/memo', [DashboardController::class, 'updateMemo'])->name('dashboard.memo.update');

    // Generic Toggle Route
    Route::patch('/toggle/{model}/{id}/{field}', [ToggleController::class, 'toggle'])->name('toggle');

    // Profile Management
    Route::get('/profile', [AdminProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [AdminProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/photo', [AdminProfileController::class, 'deletePhoto'])->name('profile.delete-photo');
    Route::delete('/profile/cv', [AdminProfileController::class, 'deleteCv'])->name('profile.delete-cv');

    // Education CRUD
    Route::resource('education', EducationController::class);

    // Experience CRUD
    Route::post('experience/reorder', [ExperienceController::class, 'reorder'])->name('experience.reorder');
    Route::resource('experience', ExperienceController::class);

    // Skills CRUD
    Route::delete('/skills/{skill}/logo', [SkillController::class, 'deleteLogo'])->name('skills.delete-logo');
    Route::resource('skills', SkillController::class);

    // Skill Categories
    Route::get('skill-categories', [SkillCategoryController::class, 'index'])->name('skill-categories.index');
    Route::put('skill-categories/{category}', [SkillCategoryController::class, 'update'])->name('skill-categories.update');
    Route::post('skill-categories/reorder', [SkillCategoryController::class, 'reorder'])->name('skill-categories.reorder');
    Route::delete('skill-categories/{category}', [SkillCategoryController::class, 'destroy'])->name('skill-categories.destroy');

    // Projects CRUD
    Route::resource('projects', ProjectController::class);
    Route::delete('/projects/{project}/image', [ProjectController::class, 'deleteImage'])->name('projects.delete-image');

    // Certifications CRUD
    Route::resource('certifications', CertificationController::class);
    Route::delete('/certifications/{certification}/image', [CertificationController::class, 'deleteImage'])->name('certifications.delete-image');

    // Social Links CRUD
    Route::resource('social-links', SocialLinkController::class);

    // Job Applications Tracking (Google Sheets integration)
    Route::get('job-applications', [JobApplicationController::class, 'index'])->name('job-applications.index');
    Route::post('job-applications', [JobApplicationController::class, 'store'])->name('job-applications.store');
    Route::put('job-applications/{row}', [JobApplicationController::class, 'update'])->name('job-applications.update');
    Route::delete('job-applications/{row}', [JobApplicationController::class, 'destroy'])->name('job-applications.destroy');
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

require __DIR__ . '/auth.php';
