<?php

use App\Http\Controllers\Programs\ProgramController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('dashboard');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


Route::resource('programs', ProgramController::class);

// Nested route: list all projects under a program
Route::get('programs/{program}/projects', [ProgramController::class, 'projects'])->name('programs.projects.index');

// Projects resource routes
use App\Http\Controllers\projects\ProjectsController;
Route::resource('projects', ProjectsController::class);

// Outcomes nested under projects
use App\Http\Controllers\outcomes\OutcomesController;
Route::get('projects/{project}/outcomes', [OutcomesController::class, 'index'])->name('projects.outcomes.index');
Route::get('projects/{project}/outcomes/create', [OutcomesController::class, 'create'])->name('projects.outcomes.create');
Route::post('projects/{project}/outcomes', [OutcomesController::class, 'store'])->name('projects.outcomes.store');
Route::get('projects/{project}/outcomes/{outcome}/edit', [OutcomesController::class, 'edit'])->name('projects.outcomes.edit');
Route::put('projects/{project}/outcomes/{outcome}', [OutcomesController::class, 'update'])->name('projects.outcomes.update');
Route::delete('projects/{project}/outcomes/{outcome}', [OutcomesController::class, 'destroy'])->name('projects.outcomes.destroy');
Route::get('projects/{project}/outcomes/{outcome}/download', [OutcomesController::class, 'download'])->name('projects.outcomes.download');

// Outcomes resource routes (standalone)
Route::resource('outcomes', OutcomesController::class);
Route::get('outcomes/{outcome}/download', [OutcomesController::class, 'download'])->name('outcomes.download');

// Services resource routes
use App\Http\Controllers\services\ServicesController;
Route::resource('services', ServicesController::class);

// Facilities resource routes
use App\Http\Controllers\facilities\FacilitiesController;
Route::resource('facilities', FacilitiesController::class);

// Equipment resource routes
use App\Http\Controllers\equipment\EquipmentController;
Route::get('facilities/{facility}/equipment', [EquipmentController::class, 'byFacility'])->name('facilities.equipment.index');
Route::resource('equipment', EquipmentController::class);

// Participants resource routes
use App\Http\Controllers\participants\ParticipantsController;
Route::resource('participants', ParticipantsController::class);
Route::post('participants/{participant}/assign', [ParticipantsController::class, 'assignToProject'])->name('participants.assign');
Route::delete('participants/{participant}/projects/{project}', [ParticipantsController::class, 'removeFromProject'])->name('participants.projects.remove');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
