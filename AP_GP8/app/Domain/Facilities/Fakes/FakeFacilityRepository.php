<?php

namespace App\Domain\Facilities\Fakes;

use App\Domain\Facilities\Entities\FacilityEntity;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class FakeFacilityRepository implements FacilityRepositoryInterface
{
    private array $store = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $id = $s['facility_id'] ?? uniqid('fac_');
            $this->store[$id] = $s;
            $this->store[$id]['facility_id'] = $id;
        }
    }

    public function findById(string $facility_id): ?FacilityEntity
    {
        return isset($this->store[$facility_id]) ? FacilityEntity::fromArray($this->store[$facility_id]) : null;
    }

    public function findAll(): array
    {
        return array_map(fn($s) => FacilityEntity::fromArray($s), array_values($this->store));
    }

    public function existsByNameAndLocation(string $name, string $location, ?string $excludefacility_id = null): bool
    {
        foreach ($this->store as $id => $s) {
            if ($excludefacility_id && $id === $excludefacility_id) continue;
            if (strtolower($s['name']) === strtolower($name) && strtolower($s['location']) === strtolower($location)) return true;
        }
        return false;
    }

    public function create(FacilityEntity $facility): FacilityEntity
    {
        $id = $facility->getFacilityId() ?? uniqid('fac_');
        $arr = $facility->toArray();
        $arr['facility_id'] = $id;
        $this->store[$id] = $arr;
        return FacilityEntity::fromArray($arr);
    }

    public function update(FacilityEntity $facility): FacilityEntity
    {
        $id = $facility->getFacilityId();
        if (!$id || !isset($this->store[$id])) throw new \Exception('Not found');
        $this->store[$id] = $facility->toArray();
        return FacilityEntity::fromArray($this->store[$id]);
    }

    public function delete(string $facility_id): bool
    {
        if (isset($this->store[$facility_id])) { unset($this->store[$facility_id]); return true; }
        return false;
    }

    public function hasRelatedServices(string $facility_id): bool { return false; }
    public function hasRelatedEquipment(string $facility_id): bool { return false; }
    public function hasRelatedProjects(string $facility_id): bool { return false; }
    public function countRelatedProjects(string $facility_id): int { return 0; }
    public function countRelatedServices(string $facility_id): int { return 0; }
    public function countRelatedEquipment(string $facility_id): int { return 0; }
}
