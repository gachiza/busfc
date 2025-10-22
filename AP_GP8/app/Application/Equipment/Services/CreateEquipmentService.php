<?php

namespace App\Application\Equipment\Services;

use App\Domain\Equipment\Entities\EquipmentEntity;
use App\Domain\Equipment\Repositories\EquipmentRepositoryInterface;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class CreateEquipmentService
{
    public function __construct(
        private readonly EquipmentRepositoryInterface $equipmentRepo,
        private readonly FacilityRepositoryInterface $facilityRepo
    ) {}

    public function execute(array $data): EquipmentEntity
    {
        // Required fields
        if (empty($data['facility_id']) || empty(trim($data['name'] ?? '')) || empty(trim($data['inventory_code'] ?? ''))) {
            throw new \Exception('Equipment.FacilityId, Equipment.Name, and Equipment.InventoryCode are required.');
        }

        // Facility exists
        if (!$this->facilityRepo->findById($data['facility_id'])) {
            throw new \Exception('Facility not found for Equipment.');
        }

        // Uniqueness
        if ($this->equipmentRepo->existsByInventoryCode($data['inventory_code'])) {
            throw new \Exception('Equipment.InventoryCodealready exists.');
        }

        // UsageDomain-SupportPhase coherence
        if (!empty($data['usage_domain']) && $data['usage_domain'] === 'Electronics') {
            $support = $data['support_phase'] ?? [];
            if (!is_array($support)) $support = explode(',', (string)$support);
            if (!in_array('Prototyping', $support) && !in_array('Testing', $support)) {
                throw new \Exception('Electronicsequipmentmust supportPrototypingorTesting.');
            }
            $data['support_phase'] = $support;
        }

        $entity = new EquipmentEntity(
            name: $data['name'],
            facility_id: $data['facility_id'],
            inventory_code: $data['inventory_code'],
            usage_domain: $data['usage_domain'] ?? '',
            support_phase: $data['support_phase'] ?? [],
            capabilities: $data['capabilities'] ?? null,
            description: $data['description'] ?? null,
            equipment_id: $data['equipment_id'] ?? null
        );

        return $this->equipmentRepo->create($entity);
    }
}
