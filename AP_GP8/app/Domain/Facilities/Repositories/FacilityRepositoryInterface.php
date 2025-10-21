<?php

namespace App\Domain\Facilities\Repositories;

use App\Domain\Facilities\Entities\FacilityEntity;

interface FacilityRepositoryInterface
{
    /**
     * Find a facility by ID
     */
    public function findById(string $facility_id): ?FacilityEntity;

    /**
     * Get all facilities
     */
    public function findAll(): array;

    /**
     * Check if a facility exists with the given name and location
     */
    public function existsByNameAndLocation(string $name, string $location, ?string $excludefacility_id = null): bool;

    /**
     * Create a new facility
     */
    public function create(FacilityEntity $facility): FacilityEntity;

    /**
     * Update an existing facility
     */
    public function update(FacilityEntity $facility): FacilityEntity;

    /**
     * Delete a facility
     */
    public function delete(string $facility_id): bool;

    /**
     * Check if facility has related services
     */
    public function hasRelatedServices(string $facility_id): bool;

    /**
     * Check if facility has related equipment
     */
    public function hasRelatedEquipment(string $facility_id): bool;

    /**
     * Check if facility has related projects
     */
    public function hasRelatedProjects(string $facility_id): bool;


    /**
     * Count related projects for a facility
     */
    public function countRelatedProjects(string $facility_id): int;

    /**
     * Count related services for a facility
     */
    public function countRelatedServices(string $facility_id): int;

    /**
     * Count related equipment for a facility
     */
    public function countRelatedEquipment(string $facility_id): int;
}