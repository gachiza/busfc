<?php

namespace App\Infrastructure\Services;

use App\Domain\Services\Entities\ServiceEntity;
use App\Domain\Services\Repositories\ServiceRepositoryInterface;
use App\Models\Service;

class ServiceRepository implements ServiceRepositoryInterface
{
    public function findById(string $serviceId): ?ServiceEntity
    {
        $model = Service::find($serviceId);
        return $model ? ServiceEntity::fromArray($model->toArray()) : null;
    }

    public function findAll(): array
    {
        return Service::all()->map(fn($m) => ServiceEntity::fromArray($m->toArray()))->toArray();
    }

    public function existsByNameInFacility(string $name, string $facilityId, ?string $excludeId = null): bool
    {
        $q = Service::where('facility_id', $facilityId)
            ->whereRaw('LOWER(name) = ?', [strtolower($name)]);

        if ($excludeId) {
            $q->where('service_id', '!=', $excludeId);
        }

        return $q->exists();
    }

    public function create(ServiceEntity $service): ServiceEntity
    {
        $model = Service::create([
            'service_id' => $service->getServiceId(),
            'facility_id' => $service->getFacilityId(),
            'name' => $service->getName(),
            'description' => $service->getDescription(),
            'category' => $service->getCategory(),
            'skill_type' => $service->getSkillType(),
        ]);

        return ServiceEntity::fromArray($model->toArray());
    }

    public function update(ServiceEntity $service): ServiceEntity
    {
        $model = Service::findOrFail($service->getServiceId());
        $model->update([
            'name' => $service->getName(),
            'description' => $service->getDescription(),
            'category' => $service->getCategory(),
            'skill_type' => $service->getSkillType(),
        ]);

        return ServiceEntity::fromArray($model->fresh()->toArray());
    }

    public function delete(string $serviceId): bool
    {
        $model = Service::findOrFail($serviceId);
        return $model->delete();
    }

    public function isCategoryUsedInFacilityTesting(string $facilityId, string $category): bool
    {
        // Projects store testing_requirements as a text field; we'll look for the category substring
        return \App\Models\Project::where('facility_id', $facilityId)
            ->whereNotNull('testing_requirements')
            ->whereRaw('LOWER(testing_requirements) LIKE ?', ['%' . strtolower($category) . '%'])
            ->exists();
    }
}
