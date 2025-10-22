<?php
namespace App\Domain\Programs\Exceptions;

use Exception;

class ProgramExceptions extends Exception
{
    public static function emptyName(): self
    {
        return new self('Program name cannot be empty');
    }

    public static function nameTooLong(): self
    {
        return new self('Program name cannot exceed 255 characters');
    }

    public static function emptyDescription(): self
    {
        return new self('Program description cannot be empty');
    }

    public static function invalidProgramCode(): self
    {
        return new self('Invalid program code provided');
    }

    public static function notFound(string $id): self
    {
        return new self("Program with ID {$id} not found");

    }

    public static function duplicateName(string $name): self
    {
        return new self("Program name '{$name}' already exists");
    }

    public static function missingNationalAlignment(): self
    {
        return new self("National alignment must be specified when focus areas are provided");
    }

    public static function cannotDeleteWithProjects(): self
    {
        return new self("Cannot delete program with existing projects. Archive or reassign projects first.");
    }

    public static function invalidNationalAlignment(array $validAlignments): self
    {
        return new self("National alignment must be one of: " . implode(', ', $validAlignments));
    }
}