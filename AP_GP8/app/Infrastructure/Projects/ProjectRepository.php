<?php

namespace App\Infrastructure\Projects;

use App\Domain\Projects\Entities\ProjectEntity;
use App\Domain\Projects\Repositories\ProjectRepositoryInterface;
use App\Models\Project;
use App\Models\Facility;

class ProjectRepository implements ProjectRepositoryInterface
{
    public function findById(string $projectId): ?ProjectEntity
    {
        $model = Project::find($projectId);
        return $model ? ProjectEntity::fromArray($model->toArray()) : null;
    }

    public function create(ProjectEntity $project): ProjectEntity
    {
        $model = Project::create([
            'project_id' => $project->getProjectId() ?? null,
            'title' => $project->getTitle(),
            'program_id' => $project->getProgramId(),
            'facility_id' => $project->getFacilityId(),
            'description' => $project->toArray()['description'] ?? null,
            'testing_requirements' => $project->getTestingRequirements(),
            'status' => $project->getStatus(),
        ]);

        return ProjectEntity::fromArray($model->toArray());
    }

    public function existsByNameInProgram(string $title, string $programId, ?string $excludeId = null): bool
    {
        $q = Project::where('program_id', $programId)
            ->whereRaw('LOWER(title) = ?', [strtolower($title)]);

        if ($excludeId) {
            $q->where('project_id', '!=', $excludeId);
        }

        return $q->exists();
    }

    public function facilityHasCapability(string $facilityId, string $requirement): bool
    {
        $facility = Facility::find($facilityId);
        if (!$facility) return false;

        $caps = $facility->capabilities ?? [];
        if (is_string($caps)) {
            $caps = json_decode($caps, true) ?: [];
        }

        return in_array($requirement, $caps, true);
    }

    public function facilityHasActiveProjectUsingEquipment(string $facilityId, string $equipmentId): bool
    {
        return Project::where('facility_id', $facilityId)
            ->where('status', 'active')
            ->whereRaw('COALESCE(equipment_ids, "") LIKE ?', ['%' . $equipmentId . '%'])
            ->exists();
    }
}
