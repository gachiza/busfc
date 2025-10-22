<?php

namespace App\Domain\Programs\Exceptions;

use DomainException;

class ProgramExceptions extends DomainException
{
    public static function emptyName(): self
    {
        return new self('Program.Name is required.');
    }

    public static function nameTooLong(): self
    {
        return new self('Program.Name is too long (max 255 characters).');
    }

    public static function emptyDescription(): self
    {
        return new self('Program.Description is required.');
    }

    public static function invalidProgramCode(): self
    {
        return new self('Program.ProgramCode cannot be empty.');
    }

    public static function invalidNationalAlignment(): self
    {
        return new self(
            'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
        );
    }

    public static function duplicateName(string $name): self
    {
        return new self("Program with name '{$name}' already exists.");
    }

    public static function missingNationalAlignment(): self
    {
        return new self(
            'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
        );
    }

  
    public static function invalidInput(array $errors): self
    {
        $message = 'Validation failed: ' . implode(', ', array_values($errors));
        return new self($message);
    }

  public static function notFound(string $id): self
    {
        return new self("Program not found.");
    }

    public static function cannotDeleteWithProjects(): self
{
    return new self('Program has Projects; archive or reassign before delete.');
}

}