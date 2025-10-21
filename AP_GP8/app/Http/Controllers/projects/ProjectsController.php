<?php

namespace App\Http\Controllers\projects;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Program;
use App\Models\Facility;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the projects.
     */
    public function index()
    {
        $projects = Project::with('program')->get();
        return view('projects.index', compact('projects'));
    }

    /**
     * Show the form for creating a new project.
     */
    public function create()
    {
        $programs = Program::all();
        $facilities = Facility::orderBy('name')->get();
        return view('projects.create', compact('programs', 'facilities'));
    }

    /**
     * Store a newly created project in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'facility' => $request->input('facility') ?: null,
        ]);
        $validated = $request->validate([
            'program_id' => 'required|string|exists:programs,program_id',
            'facility' => 'nullable|string|exists:facilities,facility_id',
            'title' => 'required|string|max:255',
            'nature_of_project' => 'required|string|max:255',
            'description' => 'nullable|string',
            'innovation_focus' => 'nullable|string|max:255',
            'prototype_stage' => 'nullable|string|max:255',
            'testing_requirements' => 'nullable|string',
            'commercialization_plan' => 'nullable|string',
        ]);

        if (array_key_exists('facility', $validated)) {
            $validated['facility_id'] = $validated['facility'];
            unset($validated['facility']);
        }
        Project::create(['project_id' => (string) Str::uuid()] + $validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified project.
     */
    public function show(Project $project)
    {
        $project->load('program');
        return view('projects.show', compact('project'));
    }

    /**
     * Show the form for editing the specified project.
     */
    public function edit(Project $project)
    {
        $programs = Program::all();
        $facilities = Facility::orderBy('name')->get();
        return view('projects.edit', compact('project', 'programs', 'facilities'));
    }

    /**
     * Update the specified project in storage.
     */
    public function update(Request $request, Project $project)
    {
        $request->merge([
            'facility' => $request->input('facility') ?: null,
        ]);
        $validated = $request->validate([
            'program_id' => 'required|string|exists:programs,program_id',
            'facility' => 'nullable|string|exists:facilities,facility_id',
            'title' => 'required|string|max:255',
            'nature_of_project' => 'required|string|max:255',
            'description' => 'nullable|string',
            'innovation_focus' => 'nullable|string|max:255',
            'prototype_stage' => 'nullable|string|max:255',
            'testing_requirements' => 'nullable|string',
            'commercialization_plan' => 'nullable|string',
        ]);

        if (array_key_exists('facility', $validated)) {
            $validated['facility_id'] = $validated['facility'];
            unset($validated['facility']);
        }
        $project->update($validated);

        return redirect()->route('projects.index')
            ->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified project from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
            ->with('success', 'Project deleted successfully.');
    }
}
