<?php
namespace App\Application\Programs\Services;

use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Programs\Exceptions\ProgramExceptions;

class DeleteProgramService
{
    private ProgramRepositoryInterface $repo;

    public function __construct(ProgramRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function execute(string $id): void
    {
        $program = $this->repo->findById($id);
        
        if (!$program) {
            throw ProgramExceptions::notFound($id);
        }

        if ($this->repo->hasProjects($id)) {
            throw ProgramExceptions::cannotDeleteWithProjects();
        }

        $this->repo->delete($id);
    }
}