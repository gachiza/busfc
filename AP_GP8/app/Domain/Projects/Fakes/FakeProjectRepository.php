<?php

namespace App\Domain\Projects\Fakes;

use App\Domain\Projects\Entities\ProjectEntity;
use App\Domain\Projects\Repositories\ProjectRepositoryInterface;

class FakeProjectRepository implements ProjectRepositoryInterface
{
    private array $store = [];
    private array $capabilities = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $this->store[$s['project_id'] ?? uniqid('prj_')] = $s;
            if (!empty($s['capabilities']) && !empty($s['facility_id'])) {
                $this->capabilities[$s['facility_id']] = $s['capabilities'];
            }
        }
    }

    public function findById(string $projectId): ?ProjectEntity
    {
        return isset($this->store[$projectId]) ? ProjectEntity::fromArray($this->store[$projectId]) : null;
    }

    public function create(ProjectEntity $project): ProjectEntity
    {
        $id = $project->getProjectId() ?? uniqid('prj_');
        $arr = $project->toArray();
        $arr['project_id'] = $id;
        $this->store[$id] = $arr;
        return ProjectEntity::fromArray($arr);
    }

    public function existsByNameInProgram(string $title, string $programId, ?string $excludeId = null): bool
    {
        foreach ($this->store as $id => $s) {
            if ($excludeId && $id === $excludeId) continue;
            if ($s['program_id'] === $programId && strtolower($s['title']) === strtolower($title)) return true;
        }
        return false;
    }

    public function facilityHasCapability(string $facilityId, string $requirement): bool
    {
        // Check seeded capabilities map first
        if (isset($this->capabilities[$facilityId])) {
            $caps = $this->capabilities[$facilityId];
            if (is_array($caps)) {
                return in_array($requirement, $caps);
            }
            // if string, check comma-separated
            $parts = array_map('trim', explode(',', (string)$caps));
            return in_array($requirement, $parts);
        }

        // default to true (backwards compatible)
        return true;
    }

    // Test helper to set capabilities for a facility
    public function setFacilityCapabilities(string $facilityId, array|string $capabilities): void
    {
        $this->capabilities[$facilityId] = $capabilities;
    }

    public function facilityHasActiveProjectUsingEquipment(string $facilityId, string $equipmentId): bool
    {
        return false;
    }
}
