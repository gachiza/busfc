<?php

namespace App\Application\Programs\DTOs;

use App\Domain\Programs\Exceptions\ProgramExceptions;

class ProgramData
{
    private string $name;
    private string $description;
    private ?string $focus_areas;
    private ?string $national_alignment;
    private ?string $program_code;
    private ?string $phases;

    public function __construct(array $data)
    {
        $this->validate($data);

        $this->name = trim($data['name']);
        $this->description = trim($data['description']);

        // Allow explicit null to clear fields
        $this->focus_areas = array_key_exists('focus_areas', $data)
            ? ($data['focus_areas'] === null ? null : trim($data['focus_areas']))
            : null;

        $this->national_alignment = array_key_exists('national_alignment', $data)
            ? ($data['national_alignment'] === null ? null : trim($data['national_alignment']))
            : null;

        $this->program_code = $data['program_code'] ?? null;
        $this->phases = $data['phases'] ?? null;
    }

    private function validate(array $data): void
    {
        $errors = [];

        $name = trim($data['name'] ?? '');
        if ($name === '') {
            $errors['name'] = 'Program.Name is required.';
        } elseif (strlen($name) > 255) {
            $errors['name'] = 'Program.Name is too long (max 255 characters).';
        }

        $desc = trim($data['description'] ?? '');
        if ($desc === '') {
            $errors['description'] = 'Program.Description is required.';
        }

        if (isset($data['program_code']) && strlen($data['program_code']) > 50) {
            $errors['program_code'] = 'Program.ProgramCode is too long (max 50 characters).';
        }

        // DO NOT validate focus_areas or national_alignment here
        // They are optional and can be null

        if (!empty($errors)) {
            throw ProgramExceptions::invalidInput($errors);
        }
    }

    // ... getters and toArray() unchanged
    public function getName(): string { return $this->name; }
    public function getDescription(): string { return $this->description; }
    public function getFocusAreas(): ?string { return $this->focus_areas; }
    public function getNationalAlignment(): ?string { return $this->national_alignment; }
    public function getProgramCode(): ?string { return $this->program_code; }
    public function getPhases(): ?string { return $this->phases; }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'focus_areas' => $this->focus_areas,
            'national_alignment' => $this->national_alignment,
            'program_code' => $this->program_code,
            'phases' => $this->phases,
        ];
    }
}