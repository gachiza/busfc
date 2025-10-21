<?php

namespace App\Domain\Participants\Repositories;

use App\Domain\Participants\Entities\ParticipantEntity;

interface ParticipantRepositoryInterface
{
    /**
     * Find all participants
     * 
     * @return ParticipantEntity[]
     */
    public function findAll(): array;

    /**
     * Find participant by ID
     */
    public function findById(string $participantId): ?ParticipantEntity;

    /**
     * Find participant by email
     */
    public function findByEmail(string $email): ?ParticipantEntity;

    /**
     * Check if email exists (case-insensitive)
     */
    public function emailExists(string $email, ?string $excludeParticipantId = null): bool;

    /**
     * Create a new participant
     */
    public function create(ParticipantEntity $participant): ParticipantEntity;

    /**
     * Update an existing participant
     */
    public function update(ParticipantEntity $participant): ParticipantEntity;

    /**
     * Delete a participant
     */
    public function delete(string $participantId): bool;

    /**
     * Get participants by affiliation
     * 
     * @return ParticipantEntity[]
     */
    public function findByAffiliation(string $affiliation): array;

    /**
     * Get participants by specialization
     * 
     * @return ParticipantEntity[]
     */
    public function findBySpecialization(string $specialization): array;

    /**
     * Get participants by institution
     * 
     * @return ParticipantEntity[]
     */
    public function findByInstitution(string $institution): array;

    /**
     * Get cross-skill trained participants
     * 
     * @return ParticipantEntity[]
     */
    public function findCrossSkillTrained(): array;
}
