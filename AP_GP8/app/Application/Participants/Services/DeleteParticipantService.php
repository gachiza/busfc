<?php

namespace App\Application\Participants\Services;

use App\Domain\Participants\Exceptions\ParticipantExceptions;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;

class DeleteParticipantService
{
    public function __construct(
        private readonly ParticipantRepositoryInterface $participantRepository
    ) {
    }

    public function execute(string $participantId): bool
    {
        // Check if participant exists
        $participant = $this->participantRepository->findById($participantId);
        if (!$participant) {
            throw ParticipantExceptions::notFound($participantId);
        }

        // TODO: Add safeguards if participant is linked to projects
        // Example:
        // if ($this->participantRepository->hasProjects($participantId)) {
        //     throw ParticipantException::cannotDeleteWithProjects();
        // }

        return $this->participantRepository->delete($participantId);
    }
}