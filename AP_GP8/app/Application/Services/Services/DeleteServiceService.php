<?php

namespace App\Application\Services\Services;

use App\Domain\Services\Repositories\ServiceRepositoryInterface;

class DeleteServiceService
{
    public function __construct(private readonly ServiceRepositoryInterface $serviceRepo)
    {
    }

    public function execute(string $serviceId): bool
    {
        $service = $this->serviceRepo->findById($serviceId);
        if (!$service) {
            throw new \Exception('Service not found');
        }

        // Prevent delete if service category is referenced by any project testing requirements in the same facility
        $facilityId = $service->getFacilityId();
        $category = $service->getCategory();

        if ($this->serviceRepo->isCategoryUsedInFacilityTesting($facilityId, $category)) {
            throw new \Exception('ServiceinusebyProjecttesting requirements.');
        }

        return $this->serviceRepo->delete($serviceId);
    }
}
