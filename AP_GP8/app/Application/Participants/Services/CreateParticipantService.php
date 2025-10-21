<?php

namespace App\Application\Participants\Services;

use App\Application\Participants\DTOs\ParticipantData;
use App\Domain\Participants\Entities\ParticipantEntity;
use App\Domain\Participants\Exceptions\ParticipantExceptions;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;

class CreateParticipantService
{
    public function __construct(
        private readonly ParticipantRepositoryInterface $participantRepository
    ) {
    }

    public function execute(ParticipantData $data): ParticipantEntity
    {
        // Validate required fields
        if (empty($data->fullName) || empty($data->email) || empty($data->affiliation)) {
            throw ParticipantExceptions::requiredFieldsMissing();
        }

        // Check email uniqueness (case-insensitive)
        if ($this->participantRepository->emailExists($data->email)) {
            throw ParticipantExceptions::emailAlreadyExists($data->email);
        }

        // Validate cross-skill training rule
        if ($data->crossSkillTrained && empty($data->specialization)) {
            throw ParticipantExceptions::crossSkillRequiresSpecialization();
        }

        // Create the entity
        $participant = new ParticipantEntity(
            fullName: $data->fullName,
            email: $data->email,
            affiliation: $data->affiliation,
            participantType: $data->participantType,
            institution: $data->institution,
            specialization: $data->specialization,
            crossSkillTrained: $data->crossSkillTrained
        );

        // Persist to database
        return $this->participantRepository->create($participant);
    }
}