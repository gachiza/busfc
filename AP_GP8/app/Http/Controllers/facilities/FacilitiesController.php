<?php

namespace App\Http\Controllers\facilities;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use App\Models\Project;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FacilitiesController extends Controller
{
    /**
     * Display a listing of the facilities with optional filters.
     * Filters: type (facility_type), partner (partner_organization), capability (LIKE in capabilities).
     */
    public function index(Request $request)
    {
        $query = Facility::query();

        if ($type = $request->query('type')) {
            $query->where('facility_type', $type);
        }

        if ($partner = $request->query('partner')) {
            $query->where('partner_organization', $partner);
        }

        if ($capability = $request->query('capability')) {
            $query->where('capabilities', 'LIKE', "%{$capability}%");
        }

        // Optional general text search across name, location, description
        if ($q = $request->query('q')) {
            $query->where(function ($sub) use ($q) {
                $sub->where('name', 'LIKE', "%{$q}%")
                    ->orWhere('location', 'LIKE', "%{$q}%")
                    ->orWhere('description', 'LIKE', "%{$q}%")
                    ->orWhere('partner_organization', 'LIKE', "%{$q}%");
            });
        }

        $facilities = $query->orderBy('name')->get();

        $types = Facility::FACILITY_TYPES;
        $partners = Facility::query()
            ->select('partner_organization')
            ->whereNotNull('partner_organization')
            ->distinct()
            ->orderBy('partner_organization')
            ->pluck('partner_organization');

        return Inertia::render('facilities/index', [
            'facilities' => $facilities,
            'types' => $types,
            'partners' => $partners
        ]);
    }

    /**
     * Show the form for creating a new facility.
     */
    public function create()
    {
        $types = Facility::FACILITY_TYPES;
        return Inertia::render('facilities/create', [
            'types' => $types
        ]);
    }

    /**
     * Store a newly created facility in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'partner_organization' => 'nullable|string|max:255',
            'facility_type' => 'required|string|in:' . implode(',', Facility::FACILITY_TYPES),
            'capabilities' => 'nullable|string', // comma-separated or free text
        ]);

        Facility::create(['facility_id' => (string) Str::uuid()] + $validated);

        return redirect()->route('facilities.index')
            ->with('success', 'Facility created successfully.');
    }

    /**
     * Display the specified facility.
     */
    public function show(Facility $facility)
    {
        $facility->load(['projects', 'services', 'equipment']);

        return Inertia::render('facilities/show', [
            'facility' => $facility
        ]);
    }

    /**
     * Show the form for editing the specified facility.
     */
    public function edit(Facility $facility)
    {
        $types = Facility::FACILITY_TYPES;
        return Inertia::render('facilities/edit', [
            'facility' => $facility,
            'types' => $types
        ]);
    }

    /**
     * Update the specified facility in storage.
     */
    public function update(Request $request, Facility $facility)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
            'partner_organization' => 'nullable|string|max:255',
            'facility_type' => 'required|string|in:' . implode(',', Facility::FACILITY_TYPES),
            'capabilities' => 'nullable|string',
        ]);

        $facility->update($validated);

        return redirect()->route('facilities.index')
            ->with('success', 'Facility updated successfully.');
    }

    /**
     * Remove the specified facility from storage with safeguards if linked records exist.
     */
    public function destroy(Facility $facility)
    {
        $hasProjects = Project::where('facility_id', $facility->facility_id)->exists();
        $hasServices = Service::where('facility_id', $facility->facility_id)->exists();

        if ($hasProjects || $hasServices) {
            $message = 'Cannot delete facility because it is linked to existing ';
            $links = [];
            if ($hasProjects) $links[] = 'projects';
            if ($hasServices) $links[] = 'services';
            $message .= implode(' and ', $links) . '.';

            return redirect()->route('facilities.index')->with('error', $message);
        }

        $facility->delete();

        return redirect()->route('facilities.index')
            ->with('success', 'Facility deleted successfully.');
    }
}
