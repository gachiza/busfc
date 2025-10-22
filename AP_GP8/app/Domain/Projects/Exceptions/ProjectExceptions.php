<?php
namespace App\Domain\Projects\Exceptions;

use Exception;

class ProjectExceptions extends Exception
{
    public static function missingRequiredFields(): self
    {
        return new self('Project title, program_id and facility_id are required');
    }

    public static function missingParticipants(): self
    {
        return new self('Project must have at least one team member assigned.');
    }

    public static function missingOutcomesOnComplete(): self
    {
        return new self('Completed projects must have at least one documented outcome.');
    }

    public static function duplicateNameInProgram(string $title): self
    {
        return new self("A project with the name '{$title}' already exists in this program.");
    }

    public static function facilityIncompatible(): self
    {
        return new self('Project requirements not compatible with facility capabilities.');
    }
}
