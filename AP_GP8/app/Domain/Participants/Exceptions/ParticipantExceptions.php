<?php

namespace App\Domain\Participants\Exceptions;

use Exception;

class ParticipantExceptions extends Exception
{
    public static function requiredFieldsMissing(): self
    {
        return new self('Participant.FullName, Participant.Email, and Participant.Affiliation are required.');
    }

    public static function emailAlreadyExists(string $email): self
    {
        return new self("Participant.Email '{$email}' already exists.");
    }

    public static function crossSkillRequiresSpecialization(): self
    {
        return new self('Cross-skill flag requires Specialization.');
    }

    public static function notFound(string $participantId): self
    {
        return new self("Participant with ID '{$participantId}' not found.");
    }

    public static function invalidAffiliation(string $affiliation): self
    {
        return new self("Invalid affiliation: '{$affiliation}'.");
    }

    public static function invalidSpecialization(string $specialization): self
    {
        return new self("Invalid specialization: '{$specialization}'.");
    }

    public static function invalidInstitution(string $institution): self
    {
        return new self("Invalid institution: '{$institution}'.");
    }

    public static function invalidParticipantType(string $type): self
    {
        return new self("Invalid participant type: '{$type}'.");
    }
}