<?php
namespace App\Application\Programs\Services;

use App\Application\Programs\DTOs\ProgramData;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Programs\Exceptions\ProgramExceptions;

class CreateProgramService
{
    private ProgramRepositoryInterface $repo;

    public function __construct(ProgramRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function execute(ProgramData $data): ProgramEntity
    {
        // Validation is already done in ProgramData and ProgramEntity
        // Just add business rules specific to creation
        
        // Rule: Unique name (case-insensitive)
        if ($this->repo->existsByName($data->getName())) {
            throw ProgramExceptions::duplicateName($data->getName());
        }

        // Rule: National alignment check
        if (!empty($data->getFocusAreas()) && empty($data->getNationalAlignment())) {
            throw ProgramExceptions::missingNationalAlignment();
        }

        // Create entity - validation happens in constructor
        // $program = new ProgramEntity(
        //     name: $data->getName(),
        //     description: $data->getDescription(),
        //     program_code: $data->getProgramCode(),
        //     focus_areas: $data->getFocusAreas(),
        //     national_alignment: $data->getNationalAlignment(),
        //     phases: $data->getPhases()
        // );
        $program = ProgramEntity::fromArray($data->toArray());
        return $this->repo->create($program);
    }
}