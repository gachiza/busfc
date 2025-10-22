<?php

namespace App\Application\Services\Services;

use App\Domain\Services\Entities\ServiceEntity;
use App\Domain\Services\Repositories\ServiceRepositoryInterface;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class CreateServiceService
{
    public function __construct(
        private readonly ServiceRepositoryInterface $serviceRepo,
        private readonly FacilityRepositoryInterface $facilityRepo
    ) {}

    public function execute(array $data): ServiceEntity
    {
        // Required fields
        if (empty($data['facility_id']) || empty(trim($data['name'] ?? '')) || empty($data['category']) || empty($data['skill_type'])) {
            throw new \Exception('Service.FacilityId,Service.Name,Service.Category,and Service.SkillTypeare required.');
        }

        // Facility must exist
        if (!$this->facilityRepo->findById($data['facility_id'])) {
            throw new \Exception('Facility not found for Service.');
        }

        // Scoped uniqueness within facility
        if ($this->serviceRepo->existsByNameInFacility($data['name'], $data['facility_id'])) {
            throw new \Exception('Aservicewiththisnamealready existsinthisfacility.');
        }

        $entity = ServiceEntity::fromArray($data);
        return $this->serviceRepo->create($entity);
    }
}
