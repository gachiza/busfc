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
        if (!isset($this->store[$equipment_id])) return null;
        $s = $this->store[$equipment_id];
        return new EquipmentEntity(
            $s['name'] ?? '',
            $s['facility_id'] ?? '',
            $s['inventory_code'] ?? '',
            $s['usage_domain'] ?? '',
            $s['support_phase'] ?? [],
            $s['capabilities'] ?? null,
            $s['description'] ?? null,
            $s['equipment_id'] ?? null
        );
    }

    public function findAll(): array
    {
        return array_map(fn($s) => new EquipmentEntity(
            $s['name'] ?? '',
            $s['facility_id'] ?? '',
            $s['inventory_code'] ?? '',
            $s['usage_domain'] ?? '',
            $s['support_phase'] ?? [],
            $s['capabilities'] ?? null,
            $s['description'] ?? null,
            $s['equipment_id'] ?? null
        ), array_values($this->store));
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
        // Return an entity with the assigned id
        return new EquipmentEntity(
            $arr['name'],
            $arr['facility_id'],
            $arr['inventory_code'],
            $arr['usage_domain'],
            $arr['support_phase'],
            $arr['capabilities'],
            $arr['description'],
            $arr['equipment_id']
        );
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
        $arr = $this->store[$id];
        return new EquipmentEntity(
            $arr['name'],
            $arr['facility_id'],
            $arr['inventory_code'],
            $arr['usage_domain'],
            $arr['support_phase'],
            $arr['capabilities'],
            $arr['description'],
            $arr['equipment_id']
        );
    }

    public function delete(string $equipment_id): bool
    {
        if (isset($this->store[$equipment_id])) { unset($this->store[$equipment_id]); return true; }
        return false;
    }

    private array $projects = [];

    public function hasActiveProjects(string $equipment_id): bool
    {
        return !empty($this->projects[$equipment_id] ?? []);
    }

    // Test helper to simulate assignment to active projects
    public function attachProject(string $equipment_id, string $projectId): void
    {
        if (!isset($this->projects[$equipment_id])) {
            $this->projects[$equipment_id] = [];
        }
        $this->projects[$equipment_id][] = $projectId;
    }
}
