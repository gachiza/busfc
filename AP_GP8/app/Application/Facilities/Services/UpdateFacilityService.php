<?php

namespace App\Application\Facilities\Services;

use App\Application\Facilities\DTOs\FacilityData;
use App\Domain\Facilities\Entities\FacilityEntity;
use App\Domain\Facilities\Exceptions\FacilityCapabilitiesRequiredException;
use App\Domain\Facilities\Exceptions\FacilityDuplicateException;
use App\Domain\Facilities\Exceptions\FacilityNotFoundException;
use App\Domain\Facilities\Exceptions\FacilityRequiredFieldsException;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class UpdateFacilityService
{
    public function __construct(
        private readonly FacilityRepositoryInterface $facilityRepository
    ) {
    }

    public function execute(string $facility_id, FacilityData $data): FacilityEntity
    {
        // Find existing facility
        $facility = $this->facilityRepository->findById($facility_id);
        
        if (!$facility) {
            throw new FacilityNotFoundException($facility_id);
        }

        // Business Rule: Required Fields
        if (empty(trim($data->name)) || empty(trim($data->location)) || empty(trim($data->facilityType))) {
            throw new FacilityRequiredFieldsException();
        }

        // Business Rule: Uniqueness (exclude current facility)
        if ($this->facilityRepository->existsByNameAndLocation($data->name, $data->location, $facility_id)) {
            throw new FacilityDuplicateException();
        }

        // Business Rule: Capabilities must be populated when Services/Equipment exist
        $hasProjects = $this->facilityRepository->countRelatedProjects($facility_id) > 0;
        $hasServices = $this->facilityRepository->countRelatedServices($facility_id) > 0;
        $hasEquipment = $this->facilityRepository->countRelatedEquipment($facility_id) > 0;
        
        if (($hasServices || $hasEquipment || $hasProjects ) && empty($data->capabilities)) {
            throw new FacilityCapabilitiesRequiredException();
        }

        // Update entity properties

        $facility->setFacilityName($data->name);
        $facility->setFacilityDescription($data->description);
        $facility->setPartnerOrganization($data->partner_organization);
        $facility->setFacilityLocation($data->location);
        $facility->setFacilityType($data->facilityType);
        $facility->setFacilityCapabilities($data->capabilities);

        // Persist changes
        return $this->facilityRepository->update($facility);
    }
}