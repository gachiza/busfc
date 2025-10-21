<?php

namespace App\Http\Controllers\Programs;
use App\Http\Controllers\Controller;

use App\Models\Program;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = Program::withCount('projects')->get();
        return Inertia::render('programs/index', [
            'programs' => $programs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('programs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate( [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'national_alignment' => 'nullable|string',
            'focus_areas' => 'nullable|string',
            'phases' => 'nullable|string',
        ]);

        Program::create([
            'program_id' => (string) Str::uuid(),
        ] + $request->all());

        return redirect()->route('programs.index')
                         ->with('success','Program created successfully.');
    }


    public function show(Program $program)
    {
        $program->load('projects');
        return Inertia::render('programs/show', [
            'program' => $program
        ]);
    }

    public function edit(Program $program)
    {
        return Inertia::render('programs/edit', [
            'program' => $program
        ]);
    }

    public function update(Request $request, Program $program)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'national_alignment' => 'nullable|string',
            'focus_areas' => 'nullable|string',
            'phases' => 'nullable|string',
        ]);

        $program->update($request->except('program_id'));

        return redirect()->route('programs.show', $program)
            ->with('success', 'Program updated successfully.');
    }

    public function destroy(Program $program)
    {
        $program->delete();

        return redirect()->route('programs.index')
            ->with('success', 'Program deleted successfully.');
    }

    /**
     * List all projects under a program.
     */
    public function projects(Program $program)
    {
        $program->load('projects');

        return view('projects.program', compact('program'));
    }
}
