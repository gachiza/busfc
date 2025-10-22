<?php

namespace App\Domain\Projects\Repositories;

use App\Domain\Projects\Entities\ProjectEntity;

interface ProjectRepositoryInterface
{
    public function findById(string $projectId): ?ProjectEntity;
    public function create(ProjectEntity $project): ProjectEntity;
    public function existsByNameInProgram(string $title, string $programId, ?string $excludeId = null): bool;
    public function facilityHasCapability(string $facilityId, string $requirement): bool;
    public function facilityHasActiveProjectUsingEquipment(string $facilityId, string $equipmentId): bool;
}
