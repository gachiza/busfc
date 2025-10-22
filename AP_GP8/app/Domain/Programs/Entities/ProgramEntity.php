<?php
namespace App\Domain\Programs\Entities;

use App\Domain\Programs\Exceptions\ProgramExceptions;

class ProgramEntity
{
    private string $program_id;
    private string $name;
    private string $description;
    private ?string $program_code;
    private ?string $focus_areas;
    private ?string $national_alignment;
    private ?string $phases;

    public function __construct(
        string $name,
        string $description,
        ?string $program_code = null,
        ?string $focus_areas = null,
        ?string $national_alignment = null,
        ?string $phases = null,
        ?string $program_id = null
    ) {
        // Validate business rules
        $this->validateName($name);
        $this->validateDescription($description);
        $this->validateNationalAlignment($focus_areas, $national_alignment);
        
        $this->program_id = $program_id ?? 'prg_' . uniqid();
        $this->name = $name;
        $this->description = $description;
        $this->program_code = $program_code;
        $this->focus_areas = $focus_areas;
        $this->national_alignment = $national_alignment;
        $this->phases = $phases;
    }

    // Factory method for creating from array (useful for repositories)
    public static function fromArray(array $data): self
    {
        return new self(
            name: $data['name'],
            description: $data['description'],
            program_code: $data['program_code'] ?? null,
            focus_areas: $data['focus_areas'] ?? null,
            national_alignment: $data['national_alignment'] ?? null,
            phases: $data['phases'] ?? null,
            program_id: $data['program_id'] ?? null
        );
    }

    // Getters
    public function getProgramId(): string
    {
        return $this->program_id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getProgramCode(): ?string
    {
        return $this->program_code;
    }

    public function getFocusAreas(): ?string
    {
        return $this->focus_areas;
    }

    public function getNationalAlignment(): ?string
    {
        return $this->national_alignment;
    }

    public function getPhases(): ?string
    {
        return $this->phases;
    }

    // Behavior methods instead of setters
    public function updateDetails(
        string $name,
        string $description,
        ?string $focus_areas = null,
        ?string $national_alignment = null
    ): void {
        $this->validateName($name);
        $this->validateDescription($description);
        
        // Preserve existing values if null is passed
        $finalFocusAreas        = $focus_areas        ?? $this->focus_areas;
        $finalNationalAlignment = $national_alignment ?? $this->national_alignment;

        $this->validateNationalAlignment($finalFocusAreas, $finalNationalAlignment);

        $this->name               = $name;
        $this->description        = $description;
        $this->focus_areas        = $finalFocusAreas;
        $this->national_alignment = $finalNationalAlignment;
        }

    public function assignProgramCode(string $code): void
    {
        $this->program_code = $code;
    }

    public function updatePhases(string $phases): void
    {
        $this->phases = $phases;
    }

    // Convert to array for persistence
    public function toArray(): array
    {
        return [
            'program_id' => $this->program_id,
            'name' => $this->name,
            'description' => $this->description,
            'program_code' => $this->program_code,
            'focus_areas' => $this->focus_areas,
            'national_alignment' => $this->national_alignment,
            'phases' => $this->phases,
        ];
    }

    // Private validation methods
    private function validateName(string $name): void
    {
        if (empty(trim($name))) {
            throw ProgramExceptions::emptyName();
        }

        if (strlen($name) > 255) {
            throw ProgramExceptions::nameTooLong();
        }
    }

    private function validateDescription(string $description): void
    {
        if (empty(trim($description))) {
            throw ProgramExceptions::emptyDescription();
        }
    }

    private function generateId(): string
    {
        return 'prg_' . uniqid() . bin2hex(random_bytes(4));
    }

    private function validateNationalAlignment(?string $focusAreas, ?string $nationalAlignment): void
    {
        $focusAreas = trim($focusAreas ?? '');
        $nationalAlignment = trim($nationalAlignment ?? '');

        if ($focusAreas !== '' && $nationalAlignment === '') {
            throw ProgramExceptions::invalidNationalAlignment();
        }

        if ($nationalAlignment !== '') {
            $tokens = array_filter(array_map('trim', explode(',', $nationalAlignment)));
            $allowed = ['NDPIII', 'DigitalRoadmap2023_2028', '4IR'];

            foreach ($tokens as $token) {
                if (!in_array($token, $allowed, true)) {
                    throw ProgramExceptions::invalidNationalAlignment();
                }
            }
        }
    }
}