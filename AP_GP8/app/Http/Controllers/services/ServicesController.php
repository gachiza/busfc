<?php

namespace App\Http\Controllers\services;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\Facility;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServicesController extends Controller
{
    /**
     * Display a listing of services with optional filters.
     * Supports filtering by facility_id and category.
     */
    public function index(Request $request)
    {
        $query = Service::with('facility');

        if ($facilityId = $request->query('facility_id')) {
            $query->where('facility_id', $facilityId);
        }

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

        $services = $query->orderBy('name')->get();

        return Inertia::render('services/index', [
            'services' => $services
        ]);
    }

    /**
     * Show the form for creating a new service under a facility.
     */
    public function create(Request $request)
    {
        $prefillFacilityId = $request->query('facility_id');
        $categories = Service::CATEGORIES;
        $skillTypes = Service::SKILL_TYPES;
        $facilities = Facility::orderBy('name')->get();
        
        return Inertia::render('services/create', [
            'prefillFacilityId' => $prefillFacilityId,
            'categories' => $categories,
            'skillTypes' => $skillTypes,
            'facilities' => $facilities
        ]);
    }

    /**
     * Store a newly created service in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'facility_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:' . implode(',', Service::CATEGORIES),
            'skill_type' => 'required|string|in:' . implode(',', Service::SKILL_TYPES),
        ]);

        Service::create(['service_id' => (string) Str::uuid()] + $validated);

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }

    /**
     * Display the specified service.
     */
    public function show(Service $service)
    {
        $service->load('facility');

        return Inertia::render('services/show', [
            'service' => $service
        ]);
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        $categories = Service::CATEGORIES;
        $skillTypes = Service::SKILL_TYPES;
        $facilities = Facility::orderBy('name')->get();
        
        return Inertia::render('services/edit', [
            'service' => $service,
            'categories' => $categories,
            'skillTypes' => $skillTypes,
            'facilities' => $facilities
        ]);
    }

    /**
     * Update the specified service in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'facility_id' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|in:' . implode(',', Service::CATEGORIES),
            'skill_type' => 'required|string|in:' . implode(',', Service::SKILL_TYPES),
        ]);

        $service->update($validated);

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    /**
     * Remove the specified service from storage.
     */
    public function destroy(Service $service)
    {
        $service->delete();
        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
