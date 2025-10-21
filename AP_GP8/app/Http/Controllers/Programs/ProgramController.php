<?php

namespace App\Http\Controllers\Programs;

use App\Http\Controllers\Controller;
use App\Http\Requests\Programs\ProgramRequest;
use App\Application\Programs\DTOs\ProgramData;
use App\Application\Programs\Services\CreateProgramService;
use App\Application\Programs\Services\UpdateProgramService;
use App\Application\Programs\Services\DeleteProgramService;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use Illuminate\Validation\ValidationException;

class ProgramController extends Controller
{
    private CreateProgramService $createService;
    private UpdateProgramService $updateService;
    private DeleteProgramService $deleteService;
    private ProgramRepositoryInterface $repo;

    public function __construct(
        CreateProgramService $createService,
        UpdateProgramService $updateService,
        DeleteProgramService $deleteService,
        ProgramRepositoryInterface $repo
    ) {
        $this->createService = $createService;
        $this->updateService = $updateService;
        $this->deleteService = $deleteService;
        $this->repo = $repo;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = $this->repo->all();
        return view('programs.index', compact('programs'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('programs.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProgramRequest $request)
    {
        try {
            $data = new ProgramData($request->validated());
            $this->createService->execute($data);
            
            return redirect()->route('programs.index')
                ->with('success', 'Program created successfully.');
        } catch (ValidationException $e) {
            return back()->withInput()->withErrors($e->validator);
        } catch (ProgramExceptions $e) {
            return back()->withInput()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'An unexpected error occurred.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $program = $this->repo->findById($id);
        
        if (!$program) {
            return redirect()->route('programs.index')
                ->with('error', 'Program not found.');
        }
        
        return view('programs.show', compact('program'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $program = $this->repo->findById($id);
        
        if (!$program) {
            return redirect()->route('programs.index')
                ->with('error', 'Program not found.');
        }
        
        return view('programs.edit', compact('program'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProgramRequest $request, string $id)
    {
        try {
            $data = new ProgramData($request->validated());
            $program = $this->updateService->execute($id, $data);
            
            return redirect()->route('programs.show', $program->getProgramId())
                ->with('success', 'Program updated successfully.');
        } catch (ValidationException $e) {
            return back()->withInput()->withErrors($e->validator);
        } catch (ProgramExceptions $e) {
            return back()->withInput()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return back()->withInput()->with('error', 'An unexpected error occurred.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $this->deleteService->execute($id);
            
            return redirect()->route('programs.index')
                ->with('success', 'Program deleted successfully.');
        } catch (ProgramExceptions $e) {
            return back()->with('error', $e->getMessage());
        } catch (\Exception $e) {
            return back()->with('error', 'An unexpected error occurred.');
        }
    }

    /**
     * List all projects under a program.
     */
    public function projects($id)
    {
        $program = $this->repo->findById($id);
        
        if (!$program) {
            return redirect()->route('programs.index')
                ->with('error', 'Program not found.');
        }
        
        $projects = $this->repo->getProjects($id);
        
        return view('programs.projects', compact('projects', 'program'));
    }
}