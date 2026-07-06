<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('skill_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('type')->default('skill'); // 'skill' or 'tool'
            $table->integer('order')->default(0);
            $table->timestamps();
        });

        // Seed from existing skills
        try {
            $existingCategories = DB::table('skills_with_logos')
                ->distinct()
                ->pluck('category');

            foreach ($existingCategories as $index => $category) {
                if (empty($category)) continue;

                $lower = strtolower($category);
                // Guess type: if name contains 'tool', 'control', 'office' then it's probably 'tool'
                $type = (str_contains($lower, 'tool') || str_contains($lower, 'control') || str_contains($lower, 'office')) ? 'tool' : 'skill';

                DB::table('skill_categories')->insert([
                    'name' => $category,
                    'type' => $type,
                    'order' => $index,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        } catch (\Exception $e) {
            // Log or ignore if the skills table doesn't exist yet
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('skill_categories');
    }
};
