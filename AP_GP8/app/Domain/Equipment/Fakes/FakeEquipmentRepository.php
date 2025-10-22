<?php

namespace App\Domain\Equipment\Fakes;

use App\Domain\Equipment\Entities\EquipmentEntity;
use App\Domain\Equipment\Repositories\EquipmentRepositoryInterface;

class FakeEquipmentRepository implements EquipmentRepositoryInterface
{
    private array $store = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $this->store[$s['equipment_id'] ?? uniqid('eq_')] = $s;
        }
    }

    public function findById(string $equipment_id): ?EquipmentEntity
    {
        return isset($this->store[$equipment_id]) ? new EquipmentEntity(...array_values($this->store[$equipment_id])) : null;
    }

    public function findAll(): array
    {
        return array_map(fn($s) => new EquipmentEntity(...array_values($s)), array_values($this->store));
    }

    public function existsByInventoryCode(string $inventory_code, ?string $exclude_equipment_id = null): bool
    {
        foreach ($this->store as $id => $s) {
            if ($exclude_equipment_id && $id === $exclude_equipment_id) continue;
            if (($s['inventory_code'] ?? '') === $inventory_code) return true;
        }
        return false;
    }

    public function create(EquipmentEntity $equipment): EquipmentEntity
    {
        $id = $equipment->getEquipmentId() ?? uniqid('eq_');
        $arr = [
            'equipment_id' => $id,
            'facility_id' => $equipment->getFacilityId(),
            'name' => $equipment->getName(),
            'inventory_code' => $equipment->getInventoryCode(),
            'usage_domain' => $equipment->getUsageDomain(),
            'support_phase' => $equipment->getSupportPhase(),
            'capabilities' => $equipment->getCapabilities(),
            'description' => $equipment->getDescription(),
        ];
        $this->store[$id] = $arr;
        return $equipment;
    }

    public function update(EquipmentEntity $equipment): EquipmentEntity
    {
        $id = $equipment->getEquipmentId();
        if (!$id || !isset($this->store[$id])) throw new \Exception('Not found');
        $this->store[$id] = [
            'equipment_id' => $id,
            'facility_id' => $equipment->getFacilityId(),
            'name' => $equipment->getName(),
            'inventory_code' => $equipment->getInventoryCode(),
            'usage_domain' => $equipment->getUsageDomain(),
            'support_phase' => $equipment->getSupportPhase(),
            'capabilities' => $equipment->getCapabilities(),
            'description' => $equipment->getDescription(),
        ];
        return $equipment;
    }

    public function delete(string $equipment_id): bool
    {
        if (isset($this->store[$equipment_id])) { unset($this->store[$equipment_id]); return true; }
        return false;
    }

    public function hasActiveProjects(string $equipment_id): bool
    {
        return false;
    }
}
