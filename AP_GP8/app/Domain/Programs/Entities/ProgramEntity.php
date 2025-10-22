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
        
        $this->program_id = $program_id ?? $this->generateId();
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
            description: $data['description'] ?? '',
            program_code: $data['program_code'] ?? null,
            focus_areas: $data['focus_areas'] ?? null,
            national_alignment: $data['national_alignment'] ?? null,
            phases: $data['phases'] ?? null,
            program_id: $data['program_id'] ?? null
        );
    }

    /**
     * Hydrate an entity from storage without running validation.
     * Use this when converting Eloquent models -> domain entities.
     */
    public static function hydrate(array $data): self
    {
        $ref = new \ReflectionClass(self::class);
        $obj = $ref->newInstanceWithoutConstructor();

        $props = [
            'program_id' => $data['program_id'] ?? null,
            'name' => $data['name'] ?? '',
            'description' => $data['description'] ?? '',
            'program_code' => $data['program_code'] ?? null,
            'focus_areas' => $data['focus_areas'] ?? null,
            'national_alignment' => $data['national_alignment'] ?? null,
            'phases' => $data['phases'] ?? null,
        ];

        foreach ($props as $propName => $value) {
            if ($ref->hasProperty($propName)) {
                $p = $ref->getProperty($propName);
                $p->setAccessible(true);
                $p->setValue($obj, $value);
            }
        }

        // If program_id was not provided, generate one
        if (empty($props['program_id'])) {
            $p = $ref->getProperty('program_id');
            $p->setAccessible(true);
            $p->setValue($obj, 'prg_' . uniqid() . bin2hex(random_bytes(4)));
        }

        return $obj;
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
        
        $this->name = $name;
        $this->description = $description;
        $this->focus_areas = $focus_areas;
        $this->national_alignment = $national_alignment;
    }

    public function assignProgramCode(string $code): void
    {
        if (empty(trim($code))) {
            throw ProgramExceptions::invalidProgramCode();
        }
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

    private function validateNationalAlignment(?string $focus_areas, ?string $national_alignment): void
    {
        // Allowed display/alignment strings (kept to match historical exception message)
        $displayAlignments = ['NDPIII', 'DigitalRoadmap2023_2028', '4IR'];

        if (!empty($focus_areas) && empty($national_alignment)) {
            throw ProgramExceptions::missingNationalAlignment();
        }

        if (!empty($national_alignment)) {
            $alignments = array_map('trim', explode(',', $national_alignment));
            $valid = false;

            foreach ($alignments as $alignment) {
                // Normalize: lowercase and remove non-alphanumeric characters
                $normalized = strtolower(preg_replace('/[^a-z0-9]/i', '', $alignment));

                // Accept variants for the known alignments
                if (in_array($normalized, ['ndpiii', 'digitalroadmap20232028', 'digitalroadmap2023_2028', '4ir', '4_ir'])) {
                    $valid = true;
                    break;
                }
            }

            if (!$valid) {
                throw ProgramExceptions::invalidNationalAlignment($displayAlignments);
            }
        }
    }

    private function generateId(): string
    {
        return 'prg_' . uniqid() . bin2hex(random_bytes(4));
    }
}