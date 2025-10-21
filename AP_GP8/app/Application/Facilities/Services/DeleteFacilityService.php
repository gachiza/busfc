<?php

namespace App\Application\Facilities\Services;

use App\Domain\Facilities\Exceptions\FacilityDeletionConstraintException;
use App\Domain\Facilities\Exceptions\FacilityNotFoundException;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class DeleteFacilityService
{
    public function __construct(
        private readonly FacilityRepositoryInterface $facilityRepository
    ) {
    }

    public function execute(string $facility_id): bool
    {
        // Check if facility exists
        $facility = $this->facilityRepository->findById($facility_id);
        
        if (!$facility) {
            throw new FacilityNotFoundException($facility_id);
        }

        // Business Rule: Deletion Constraints
        // Facilities cannot be deleted if they have related Services, Equipment, or Projects
        $hasServices = $this->facilityRepository->hasRelatedServices($facility_id);
        $hasEquipment = $this->facilityRepository->hasRelatedEquipment($facility_id);
        $hasProjects = $this->facilityRepository->hasRelatedProjects($facility_id);

        if ($hasServices || $hasEquipment || $hasProjects) {
            throw new FacilityDeletionConstraintException();
        }

        // Proceed with deletion
        return $this->facilityRepository->delete($facility_id);
    }
}