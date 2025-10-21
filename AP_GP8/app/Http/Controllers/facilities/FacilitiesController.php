<?php

namespace App\Http\Controllers\facilities;

use App\Application\Facilities\DTOs\FacilityData;
use App\Application\Facilities\Services\CreateFacilityService;
use App\Application\Facilities\Services\DeleteFacilityService;
use App\Application\Facilities\Services\UpdateFacilityService;
use App\Domain\Facilities\Exceptions\FacilityException;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;
use App\Http\Controllers\Controller;
use App\Http\Requests\Facilities\FacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;



class FacilitiesController extends Controller
{
    public function __construct(
        private readonly FacilityRepositoryInterface $facilityRepository,
        private readonly CreateFacilityService $createFacilityService,
        private readonly UpdateFacilityService $updateFacilityService,
        private readonly DeleteFacilityService $deleteFacilityService
    ) {
    }

    /**
     * Display a listing of facilities.
     */
    public function index(): View
{
    $facilities = $this->facilityRepository->findAll();
    
    // Get unique partner organizations
    $partners = array_values(array_unique(array_filter(
        array_map(fn($facility) => $facility->partner_organization ?? null, $facilities)
    )));
    sort($partners);

    return view('facilities.index', [
        'facilities' => $facilities, // Remove array_map
        'types' => Facility::FACILITY_TYPES,
        'partners' => $partners,
    ]);
}

    /**
     * Show the form for creating a new facility.
     */
    public function create(): View
{
    return view('facilities.create', [
        'types' => Facility::FACILITY_TYPES,
    ]);
}

    /**
     * Store a newly created facility in storage.
     */
    public function store(FacilityRequest $request): RedirectResponse
    {
        try {
            $data = FacilityData::fromRequest($request->validated());
            $facility = $this->createFacilityService->execute($data);

            return redirect()
                ->route('facilities.index')
                ->with('success', 'Facility created successfully.');
        } catch (FacilityException $e) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified facility.
     */
    public function show(string $facility_id): View
    {
        $facility = $this->facilityRepository->findById($facility_id);

        if (!$facility) {
            abort(404);
        }
        $projectsCount = $this->facilityRepository->countRelatedProjects($facility_id);
        $servicesCount = $this->facilityRepository->countRelatedServices($facility_id);

        return view('facilities.show', [
            'facility' => $facility,
            'projectsCount' => $projectsCount,
            'servicesCount' => $servicesCount,
        ]);
    }

    /**
     * Show the form for editing the specified facility.
     */
    public function edit(string $facility_id): View
    {
        $facility = $this->facilityRepository->findById($facility_id);

        if (!$facility) {
            abort(404);
        }
        $facilityCapabilities = is_array($facility->getFacilityCapabilities()) 
        ? implode(', ', $facility->getFacilityCapabilities()) 
        : $facility->getFacilityCapabilities();

        return view('facilities.edit', [
            'facility' => $facility,
            'types' => Facility::FACILITY_TYPES,
            'facilityCapabilities' => $facilityCapabilities,
        ]);
    }

    /**
     * Update the specified facility in storage.
     */
    public function update(FacilityRequest $request, string $facility_id): RedirectResponse
    {
        try {
            $data = FacilityData::fromRequest($request->validated());
            $facility = $this->updateFacilityService->execute($facility_id, $data);

            return redirect()
                ->route('facilities.index')
                ->with('success', 'Facility updated successfully.');
        } catch (FacilityException $e) {
            return redirect()
                ->back()
                ->withInput()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Remove the specified facility from storage.
     */
    public function destroy(string $facility_id): RedirectResponse
    {
        try {
            $this->deleteFacilityService->execute($facility_id);

            return redirect()
                ->route('facilities.index')
                ->with('success', 'Facility deleted successfully.');
        } catch (FacilityException $e) {
            return redirect()
                ->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }
}