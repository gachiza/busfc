<?php
namespace App\Application\Programs\Services;

use App\Application\Programs\DTOs\ProgramData;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Programs\Exceptions\ProgramExceptions;

class UpdateProgramService
{
    private ProgramRepositoryInterface $repo;

    public function __construct(ProgramRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function execute(string $id, ProgramData $data): ProgramEntity
    {
        // Find existing program
        $existingProgram = $this->repo->findById($id);
        
        if (!$existingProgram) {
            throw ProgramExceptions::notFound($id);
        }

        // Validation is already done in ProgramData
        // Just add business rules specific to update

        // Rule: Unique name (case-insensitive, excluding current program)
        if (strtolower($existingProgram->getName()) !== strtolower($data->getName()) 
            && $this->repo->existsByName($data->getName())) {
            throw ProgramExceptions::duplicateName($data->getName());
        }

        // Rule: National alignment check
        if (!empty($data->getFocusAreas()) && empty($data->getNationalAlignment())) {
            throw ProgramExceptions::missingNationalAlignment();
        }

        // Update the entity using behavior method
        $existingProgram->updateDetails(
            name: $data->getName(),
            description: $data->getDescription(),
            focus_areas: $data->getFocusAreas(),
            national_alignment: $data->getNationalAlignment()
        );

        // Update additional fields if provided
        if ($data->getProgramCode() !== null) {
            $existingProgram->assignProgramCode($data->getProgramCode());
        }

        if ($data->getPhases() !== null) {
            $existingProgram->updatePhases($data->getPhases());
        }

        return $this->repo->update($existingProgram);
    }
}