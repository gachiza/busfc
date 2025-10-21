<?php

namespace App\Infrastructure\Equipment;

use App\Domain\Equipment\Entities\EquipmentEntity;
use App\Domain\Equipment\Repositories\EquipmentRepositoryInterface;
use App\Models\Equipment;

class EquipmentRepository implements EquipmentRepositoryInterface
{
    public function findById(string $equipment_id): ?EquipmentEntity
    {
        $equipment = Equipment::find($equipment_id);
        return $equipment ? $this->mapToEntity($equipment) : null;
    }

    public function findAll(): array
    {
        return Equipment::all()->map(fn($equipment) => $this->mapToEntity($equipment))->toArray();
    }

    public function existsByInventoryCode(string $inventory_code, ?string $exclude_equipment_id = null): bool
    {
        $query = Equipment::where('inventory_code', $inventory_code);
        
        if ($exclude_equipment_id) {
            $query->where('equipment_id', '!=', $exclude_equipment_id);
        }
        
        return $query->exists();
    }

    public function create(EquipmentEntity $equipment): EquipmentEntity
    {
        $model = Equipment::create([
            'facility_id' => $equipment->getFacilityId(),
            'name' => $equipment->getName(),
            'inventory_code' => $equipment->getInventoryCode(),
            'usage_domain' => $equipment->getUsageDomain(),
            'support_phase' => $equipment->getSupportPhase(),
            'capabilities' => $equipment->getCapabilities(),
            'description' => $equipment->getDescription(),
        ]);

        return $this->mapToEntity($model);
    }

    public function update(EquipmentEntity $equipment): EquipmentEntity
    {
        $model = Equipment::findOrFail($equipment->getEquipmentId());
        
        $model->update([
            'name' => $equipment->getName(),
            'inventory_code' => $equipment->getInventoryCode(),
            'usage_domain' => $equipment->getUsageDomain(),
            'support_phase' => $equipment->getSupportPhase(),
            'capabilities' => $equipment->getCapabilities(),
            'description' => $equipment->getDescription(),
        ]);

        return $this->mapToEntity($model->fresh());
    }

    public function delete(string $equipment_id): bool
    {
        $equipment = Equipment::findOrFail($equipment_id);
        return $equipment->delete();
    }

    public function hasActiveProjects(string $equipment_id): bool
    {
        return Equipment::find($equipment_id)?->projects()
            ->where('status', 'active')
            ->exists() ?? false;
    }

    private function mapToEntity(Equipment $model): EquipmentEntity
    {
        return new EquipmentEntity(
            name: $model->name,
            facility_id: $model->facility_id,
            inventory_code: $model->inventory_code,
            usage_domain: $model->usage_domain,
            support_phase: $model->support_phase,
            capabilities: $model->capabilities,
            description: $model->description,
            equipment_id: $model->equipment_id,
            created_at: $model->created_at,
            updated_at: $model->updated_at
        );
    }
}