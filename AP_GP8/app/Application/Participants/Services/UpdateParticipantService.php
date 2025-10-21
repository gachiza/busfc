<?php

namespace App\Application\Participants\Services;

use App\Application\Participants\DTOs\ParticipantData;
use App\Domain\Participants\Entities\ParticipantEntity;
use App\Domain\Participants\Exceptions\ParticipantExceptions;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;

class UpdateParticipantService
{
    public function __construct(
        private readonly ParticipantRepositoryInterface $participantRepository
    ) {
    }

    public function execute(string $participantId, ParticipantData $data): ParticipantEntity
    {
        // Check if participant exists
        $existingParticipant = $this->participantRepository->findById($participantId);
        if (!$existingParticipant) {
            throw ParticipantExceptions::notFound($participantId);
        }

        // Validate required fields
        if (empty($data->fullName) || empty($data->email) || empty($data->affiliation)) {
            throw ParticipantExceptions::requiredFieldsMissing();
        }

        // Check email uniqueness (case-insensitive), excluding current participant
        if ($this->participantRepository->emailExists($data->email, $participantId)) {
            throw ParticipantExceptions::emailAlreadyExists($data->email);
        }

        // Validate cross-skill training rule
        if ($data->crossSkillTrained && empty($data->specialization)) {
            throw ParticipantExceptions::crossSkillRequiresSpecialization();
        }

        // Update the entity
        $participant = new ParticipantEntity(
            fullName: $data->fullName,
            email: $data->email,
            affiliation: $data->affiliation,
            participantType: $data->participantType,
            institution: $data->institution,
            specialization: $data->specialization,
            crossSkillTrained: $data->crossSkillTrained,
            participant_id: $participantId
        );

        // Persist changes
        return $this->participantRepository->update($participant);
    }
}