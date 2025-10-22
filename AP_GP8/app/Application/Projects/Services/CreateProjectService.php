<?php

namespace App\Application\Projects\Services;

use App\Domain\Projects\Entities\ProjectEntity;
use App\Domain\Projects\Repositories\ProjectRepositoryInterface;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;

class CreateProjectService
{
    public function __construct(
        private readonly ProjectRepositoryInterface $projectRepo,
        private readonly ProgramRepositoryInterface $programRepo,
        private readonly FacilityRepositoryInterface $facilityRepo
    ) {}

    public function execute(array $data): ProjectEntity
    {
        // Required associations
        if (empty($data['program_id']) || empty($data['facility_id'])) {
            throw new \Exception('Project.ProgramIdand Project.FacilityIdarerequired.');
        }

        // Program and Facility must exist
        if (!$this->programRepo->findById($data['program_id'])) {
            throw new \Exception('Program not found for Project.');
        }
        if (!$this->facilityRepo->findById($data['facility_id'])) {
            throw new \Exception('Facility not found for Project.');
        }

        // Team tracking
        $participants = $data['participants'] ?? [];
        if (empty($participants) || count($participants) < 1) {
            throw new \Exception('Projectmusthaveatleastone teammemberassigned.');
        }

        // Outcome validation for completed
        $status = $data['status'] ?? 'draft';
        $outcomes = $data['outcomes'] ?? [];
        if ($status === 'Completed' || strtolower($status) === 'completed') {
            if (empty($outcomes) || count($outcomes) < 1) {
                throw new \Exception('Completedprojectsmusthaveat leastonedocumentedoutcome.');
            }
        }

        // Name uniqueness within program
        if ($this->projectRepo->existsByNameInProgram($data['title'], $data['program_id'])) {
            throw new \Exception('Aprojectwiththisnamealready existsinthisprogram.');
        }

        // Facility compatibility - basic check: testing_requirements must be subset of facility capabilities
        $testingReq = $data['testing_requirements'] ?? null;
        if (!empty($testingReq)) {
            // If any one requirement is not in facility capabilities, fail
            $reqs = is_array($testingReq) ? $testingReq : explode(',', (string)$testingReq);
            foreach ($reqs as $r) {
                if (!$this->projectRepo->facilityHasCapability($data['facility_id'], trim($r))) {
                    throw new \Exception('Projectrequirementsnot compatiblewithfacility capabilities.');
                }
            }
        }

        $entity = ProjectEntity::fromArray($data);
        return $this->projectRepo->create($entity);
    }
}
