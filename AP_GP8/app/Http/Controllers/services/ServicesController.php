<?php

namespace App\Http\Controllers\services;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Application\Services\Services\CreateServiceService;
use App\Application\Services\Services\DeleteServiceService;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ServicesController extends Controller
{
    /**
     * Display a listing of services with optional filters.
     * Supports filtering by facility_id and category.
     */
    public function index(Request $request)
    {
        $query = Service::query();

        if ($facility_id = $request->query('facility_id')) {
            $query->where('facility_id', $facility_id);
        }

        if ($category = $request->query('category')) {
            $query->where('category', $category);
        }

    $services = $query->orderBy('name')->get();

    // Pass facilities for filter dropdown
    $facilities = \App\Models\Facility::orderBy('name')->get();

        return view('services.index', compact('services', 'facilities'));
    }

    /**
     * Show the form for creating a new service under a facility.
     */
    public function create(Request $request)
    {
        $prefillfacility_id = $request->query('facility_id');
        $categories = Service::CATEGORIES;
        $skillTypes = Service::SKILL_TYPES;
        $facilities = \App\Models\Facility::orderBy('name')->get();
        return view('services.create', compact('prefillfacility_id', 'categories', 'skillTypes', 'facilities'));
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

        // Prefer using application service when bound
        try {
            $createSvc = app(CreateServiceService::class);
            $createSvc->execute($validated + ['service_id' => (string) Str::uuid()]);
        } catch (\Throwable $e) {
            // Fallback to Eloquent for backwards compatibility
            Service::create(['service_id' => (string) Str::uuid()] + $validated);
        }

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }

    /**
     * Show the form for editing the specified service.
     */
    public function edit(Service $service)
    {
        $categories = Service::CATEGORIES;
        $skillTypes = Service::SKILL_TYPES;
        return view('services.edit', compact('service', 'categories', 'skillTypes'));
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
        try {
            $deleteSvc = app(DeleteServiceService::class);
            $deleteSvc->execute($service->service_id);
        } catch (\Throwable $e) {
            // fallback
            $service->delete();
        }

        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
}
