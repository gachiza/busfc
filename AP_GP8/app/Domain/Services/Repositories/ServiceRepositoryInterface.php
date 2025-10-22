<?php

namespace App\Domain\Services\Repositories;

use App\Domain\Services\Entities\ServiceEntity;

interface ServiceRepositoryInterface
{
    public function findById(string $serviceId): ?ServiceEntity;
    public function findAll(): array;
    public function existsByNameInFacility(string $name, string $facilityId, ?string $excludeId = null): bool;
    public function create(ServiceEntity $service): ServiceEntity;
    public function update(ServiceEntity $service): ServiceEntity;
    public function delete(string $serviceId): bool;
    public function isCategoryUsedInFacilityTesting(string $facilityId, string $category): bool;
}
