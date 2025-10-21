<?php

// namespace App\Http\Controllers\participants;

// use App\Http\Controllers\Controller;
// use App\Models\Participant;
// use App\Models\Project;
// use Illuminate\Http\Request;
// use Illuminate\Support\Str;

// class ParticipantsController extends Controller
// {
//     /**
//      * Display a listing of participants.
//      */
//     public function index()
//     {
//         $participants = Participant::orderBy('full_name')->get();
//         return view('participants.index', compact('participants'));
//     }

//     /**
//      * Show the form for creating a new participant.
//      */
//     public function create()
//     {
//         $affiliations = Participant::AFFILIATIONS;
//         $specializations = Participant::SPECIALIZATIONS;
//         $institutions = Participant::INSTITUTIONS;
//         $participantTypes = Participant::PARTICIPANT_TYPES;
//         $projects = Project::with('program')->orderBy('title')->get();
//         return view('participants.create', compact('affiliations', 'specializations', 'institutions', 'participantTypes', 'projects'));
//     }

//     /**
//      * Store a newly created participant in storage.
//      */
//     public function store(Request $request)
//     {
//         $validated = $request->validate([
//             'full_name' => 'required|string|max:255',
//             'email' => 'required|email|max:255|unique:participants,email',
//             'affiliation' => 'required|string|in:' . implode(',', Participant::AFFILIATIONS),
//             'specialization' => 'required|string|in:' . implode(',', Participant::SPECIALIZATIONS),
//             'participant_type' => 'required|string|in:' . implode(',', Participant::PARTICIPANT_TYPES),
//             'cross_skill_trained' => 'sometimes|boolean',
//             'institution' => 'required|string|in:' . implode(',', Participant::INSTITUTIONS),
//             'project_id' => 'nullable|string|exists:projects,project_id',
//         ]);

//         $validated['cross_skill_trained'] = (bool) ($validated['cross_skill_trained'] ?? false);

//         $data = $validated;
//         unset($data['project_id']);

//         $participant = Participant::create(['participant_id' => (string) Str::uuid()] + $data);

//         if (!empty($validated['project_id'])) {
//             $participant->projects()->syncWithoutDetaching([$validated['project_id']]);
//         }

//         return redirect()->route('participants.index')->with('success', 'Participant created successfully.');
//     }

//     /**
//      * Display the specified participant profile with their projects.
//      */
//     public function show(Participant $participant)
//     {
//         $participant->load('projects');
//         return view('participants.show', compact('participant'));
//     }

//     /**
//      * Show the form for editing the participant.
//      */
//     public function edit(Participant $participant)
//     {
//         $affiliations = Participant::AFFILIATIONS;
//         $specializations = Participant::SPECIALIZATIONS;
//         $institutions = Participant::INSTITUTIONS;
//         $participantTypes = Participant::PARTICIPANT_TYPES;
//         return view('participants.edit', compact('participant', 'affiliations', 'specializations', 'institutions', 'participantTypes'));
//     }

//     /**
//      * Update the participant in storage.
//      */
//     public function update(Request $request, Participant $participant)
//     {
//         $validated = $request->validate([
//             'full_name' => 'required|string|max:255',
//             'email' => 'required|email|max:255|unique:participants,email,' . $participant->participant_id . ',participant_id',
//             'affiliation' => 'required|string|in:' . implode(',', Participant::AFFILIATIONS),
//             'specialization' => 'required|string|in:' . implode(',', Participant::SPECIALIZATIONS),
//             'participant_type' => 'required|string|in:' . implode(',', Participant::PARTICIPANT_TYPES),
//             'cross_skill_trained' => 'sometimes|boolean',
//             'institution' => 'required|string|in:' . implode(',', Participant::INSTITUTIONS),
//         ]);

//         $validated['cross_skill_trained'] = (bool) ($validated['cross_skill_trained'] ?? false);

//         $participant->update($validated);

//         return redirect()->route('participants.index')->with('success', 'Participant updated successfully.');
//     }

//     /**
//      * Remove the participant from storage.
//      */
//     public function destroy(Participant $participant)
//     {
//         $participant->delete();
//         return redirect()->route('participants.index')->with('success', 'Participant deleted successfully.');
//     }

//     /**
//      * Assign a participant to a project.
//      */
//     public function assignToProject(Request $request, Participant $participant)
//     {
//         $data = $request->validate([
//             'project_id' => 'required|string|exists:projects,project_id',
//         ]);

//         $participant->projects()->syncWithoutDetaching([$data['project_id']]);

//         return redirect()->route('participants.show', $participant->participant_id)
//             ->with('success', 'Participant assigned to project successfully.');
//     }

//     /**
//      * Remove a participant from a project.
//      */
//     public function removeFromProject(Participant $participant, Project $project)
//     {
//         $participant->projects()->detach($project->project_id);

//         return redirect()->route('participants.show', $participant->participant_id)
//             ->with('success', 'Participant removed from project successfully.');
//     }
// }




namespace App\Http\Controllers\Participants;

use App\Application\Participants\DTOs\ParticipantData;
use App\Application\Participants\Services\CreateParticipantService;
use App\Application\Participants\Services\DeleteParticipantService;
use App\Application\Participants\Services\UpdateParticipantService;
use App\Domain\Participants\Exceptions\ParticipantExceptions;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;
use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\Participants\ParticipantRequest;
use App\Models\Participant;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class ParticipantsController extends Controller
{
    public function __construct(
        private readonly ParticipantRepositoryInterface $participantRepository,
        private readonly CreateParticipantService $createParticipantService,
        private readonly UpdateParticipantService $updateParticipantService,
        private readonly DeleteParticipantService $deleteParticipantService
    ) {
    }

    /**
     * Display a listing of participants.
     */
    public function index(): View
    {
        $participants = $this->participantRepository->findAll();

        return view('participants.index', [
            'participants' => $participants,
            'affiliations' => Participant::AFFILIATIONS,
            'specializations' => Participant::SPECIALIZATIONS,
            'institutions' => Participant::INSTITUTIONS,
            'participantTypes' => Participant::PARTICIPANT_TYPES,
            'projects' => Project::with('program')->get(),
        ]);
    }

    /**
     * Show the form for creating a new participant.
     */
    public function create(): View
    {
        return view('participants.create', [
            'affiliations' => Participant::AFFILIATIONS,
            'specializations' => Participant::SPECIALIZATIONS,
            'institutions' => Participant::INSTITUTIONS,
            'participantTypes' => Participant::PARTICIPANT_TYPES,
            'projects' => Project::with('program')->get(),
        ]);
    }

    /**
     * Store a newly created participant in storage.
     */
    public function store(ParticipantRequest $request): RedirectResponse
    {
        try {
            $data = ParticipantData::fromRequest($request->validated());
            $participant = $this->createParticipantService->execute($data);

            return redirect()
                ->route('participants.index')
                ->with('success', 'Participant created successfully.');
        } catch (ParticipantExceptions $e) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified participant.
     */
    public function show(string $participant_id): View
    {
        $participant = $this->participantRepository->findById($participant_id);
        // $projects = $this->projectRepository->getByParticipantId($id);

        if (!$participant) {
            abort(404);
        }

        // Get the model for project count
        $model = Participant::with(['projects'])->find($participant_id);

        return view('participants.show', [
            'participant' => $participant,
            'projectsCount' => $model->projects->count(),
            // 'projects' => $projects,
        ]);
    }

    /**
     * Show the form for editing the specified participant.
     */
    public function edit(string $participant_id): View
    {
        $participant = $this->participantRepository->findById($participant_id);

        if (!$participant) {
            abort(404);
        }

        return view('participants.edit', [
            'participant' => $participant,
            'affiliations' => Participant::AFFILIATIONS,
            'specializations' => Participant::SPECIALIZATIONS,
            'institutions' => Participant::INSTITUTIONS,
            'participantTypes' => Participant::PARTICIPANT_TYPES,
        ]);
    }

    /**
     * Update the specified participant in storage.
     */
    public function update(ParticipantRequest $request, string $participant_id): RedirectResponse
    {
        try {
            $data = ParticipantData::fromRequest($request->validated());
            $participant = $this->updateParticipantService->execute($participant_id, $data);

            return redirect()
                ->route('participants.index')
                ->with('success', 'Participant updated successfully.');
        } catch (ParticipantExceptions $e) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified participant from storage.
     */
    public function destroy(string $participant_id): RedirectResponse
    {
        try {
            $this->deleteParticipantService->execute($participant_id);

            return redirect()
                ->route('participants.index')
                ->with('success', 'Participant deleted successfully.');
        } catch (ParticipantExceptions $e) {
            return redirect()
                ->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }
}