<?php

namespace App\Domain\Equipment\Repositories;

use App\Domain\Equipment\Entities\EquipmentEntity;

interface EquipmentRepositoryInterface
{
    public function findById(string $equipment_id): ?EquipmentEntity;
    public function findAll(): array;
    public function existsByInventoryCode(string $inventory_code, ?string $exclude_equipment_id = null): bool;
    public function create(EquipmentEntity $equipment): EquipmentEntity;
    public function update(EquipmentEntity $equipment): EquipmentEntity;
    public function delete(string $equipment_id): bool;
    public function hasActiveProjects(string $equipment_id): bool;
}