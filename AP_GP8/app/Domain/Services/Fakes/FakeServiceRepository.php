<?php

namespace App\Domain\Services\Fakes;

use App\Domain\Services\Entities\ServiceEntity;
use App\Domain\Services\Repositories\ServiceRepositoryInterface;

class FakeServiceRepository implements ServiceRepositoryInterface
{
    private array $store = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $this->store[$s['service_id'] ?? uniqid('svc_')] = $s;
        }
    }

    public function findById(string $serviceId): ?ServiceEntity
    {
        return isset($this->store[$serviceId]) ? ServiceEntity::fromArray($this->store[$serviceId]) : null;
    }

    public function findAll(): array
    {
        return array_map(fn($s) => ServiceEntity::fromArray($s), array_values($this->store));
    }

    public function existsByNameInFacility(string $name, string $facilityId, ?string $excludeId = null): bool
    {
        foreach ($this->store as $id => $s) {
            if ($excludeId && $id === $excludeId) continue;
            if ($s['facility_id'] === $facilityId && strtolower($s['name']) === strtolower($name)) return true;
        }
        return false;
    }

    public function create(ServiceEntity $service): ServiceEntity
    {
        $id = $service->getServiceId() ?? uniqid('svc_');
        $arr = $service->toArray();
        $arr['service_id'] = $id;
        $this->store[$id] = $arr;
        return ServiceEntity::fromArray($arr);
    }

    public function update(ServiceEntity $service): ServiceEntity
    {
        $id = $service->getServiceId();
        if (!$id || !isset($this->store[$id])) throw new \Exception('Not found');
        $this->store[$id] = $service->toArray();
        return ServiceEntity::fromArray($this->store[$id]);
    }

    public function delete(string $serviceId): bool
    {
        if (isset($this->store[$serviceId])) { unset($this->store[$serviceId]); return true; }
        return false;
    }

    public function isCategoryUsedInFacilityTesting(string $facilityId, string $category): bool
    {
        // Fake: no projects here; return false by default unless seeded specially
        return false;
    }
}
