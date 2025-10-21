<?php
namespace App\Application\Programs\DTOs;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
        $this->focus_areas = isset($data['focus_areas']) ? trim($data['focus_areas']) : null;
        $this->national_alignment = isset($data['national_alignment']) ? trim($data['national_alignment']) : null;
        $this->program_code = $data['program_code'] ?? null;
        $this->phases = $data['phases'] ?? null;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function getFocusAreas(): ?string
    {
        return $this->focus_areas;
    }

    public function getNationalAlignment(): ?string
    {
        return $this->national_alignment;
    }

    public function getProgramCode(): ?string
    {
        return $this->program_code;
    }

    public function getPhases(): ?string
    {
        return $this->phases;
    }

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

    private function validate(array $data): void
    {
        $validator = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'focus_areas' => ['nullable', 'string'],
            'national_alignment' => ['nullable', 'string'],
            'program_code' => ['nullable', 'string', 'max:50'],
            'phases' => ['nullable', 'string'],
        ]);

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }
}