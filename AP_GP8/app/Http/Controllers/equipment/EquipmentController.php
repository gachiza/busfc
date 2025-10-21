<?php

namespace App\Http\Controllers\equipment;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Facility;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    /**
     * Display a listing of equipment with optional filters.
     * Filters: facility_id, usage_domain, capability (LIKE), q for general search.
     */
    public function index(Request $request)
    {
        $query = Equipment::with('facility');

        if ($facilityId = $request->query('facility_id')) {
            $query->where('facility_id', $facilityId);
        }

        if ($usage = $request->query('usage_domain')) {
            $query->where('usage_domain', $usage);
        }

        if ($capability = $request->query('capability')) {
            $query->where('capabilities', 'LIKE', "%{$capability}%");
        }

        if ($q = $request->query('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'LIKE', "%{$q}%")
                    ->orWhere('description', 'LIKE', "%{$q}%")
                    ->orWhere('inventory_code', 'LIKE', "%{$q}%");
            });
        }

        $equipment = $query->orderBy('name')->get();

        return Inertia::render('equipment/index', [
            'equipment' => $equipment
        ]);
    }

    /**
     * Show the form for creating new equipment.
     */
    public function create(Request $request)
    {
        $prefillFacilityId = $request->query('facility_id');
        $usageDomains = Equipment::USAGE_DOMAINS;
        $supportPhases = Equipment::SUPPORT_PHASES;
        $facilities = Facility::orderBy('name')->get();
        
        return Inertia::render('equipment/create', [
            'prefillFacilityId' => $prefillFacilityId,
            'usageDomains' => $usageDomains,
            'supportPhases' => $supportPhases,
            'facilities' => $facilities
        ]);
    }

    /**
     * Store a newly created equipment record in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|string|exists:facilities,facility_id',
            'name' => 'required|string|max:255',
            'capabilities' => 'nullable|string',
            'description' => 'nullable|string',
            'inventory_code' => 'nullable|string|max:255',
            'usage_domain' => 'nullable|string|in:' . implode(',', Equipment::USAGE_DOMAINS),
            'support_phase' => 'nullable|string|in:' . implode(',', Equipment::SUPPORT_PHASES),
        ]);

        Equipment::create(['equipment_id' => (string) Str::uuid()] + $validated);

        return redirect()->route('equipment.index')->with('success', 'Equipment created successfully.');
    }

    /**
     * Display the specified equipment details.
     */
    public function show(Equipment $equipment)
    {
        $equipment->load('facility');

        return Inertia::render('equipment/show', [
            'equipment' => $equipment
        ]);
    }

    /**
     * Show the form for editing equipment.
     */
    public function edit(Equipment $equipment)
    {
        $usageDomains = Equipment::USAGE_DOMAINS;
        $supportPhases = Equipment::SUPPORT_PHASES;
        $facilities = Facility::orderBy('name')->get();
        
        return Inertia::render('equipment/edit', [
            'equipment' => $equipment,
            'usageDomains' => $usageDomains,
            'supportPhases' => $supportPhases,
            'facilities' => $facilities
        ]);
    }

    /**
     * Update the specified equipment in storage.
     */
    public function update(Request $request, Equipment $equipment)
    {
        $validated = $request->validate([
            'facility_id' => 'required|string|exists:facilities,facility_id',
            'name' => 'required|string|max:255',
            'capabilities' => 'nullable|string',
            'description' => 'nullable|string',
            'inventory_code' => 'nullable|string|max:255',
            'usage_domain' => 'nullable|string|in:' . implode(',', Equipment::USAGE_DOMAINS),
            'support_phase' => 'nullable|string|in:' . implode(',', Equipment::SUPPORT_PHASES),
        ]);

        $equipment->update($validated);

        return redirect()->route('equipment.index')->with('success', 'Equipment updated successfully.');
    }

    /**
     * Remove the specified equipment from storage with constraints.
     * Blocks deletion if tied to active projects at its facility.
     * Note: When a project-equipment linkage is introduced, update this check accordingly.
     */
    public function destroy(Equipment $equipment)
    {
        $hasActiveProjectsAtFacility = Project::where('facility_id', $equipment->facility_id)->exists();

        if ($hasActiveProjectsAtFacility) {
            return redirect()->route('equipment.index')
                ->with('error', 'Cannot delete equipment because there are active projects at this equipment\'s facility.');
        }

        $equipment->delete();

        return redirect()->route('equipment.index')->with('success', 'Equipment deleted successfully.');
    }
}
