<?php

namespace App\Domain\Projects\Entities;

class ProjectEntity
{
    public function __construct(
        private string $title,
        private string $program_id,
        private string $facility_id,
        private ?array $participants = null,
        private ?array $outcomes = null,
        private ?string $status = 'draft',
        private ?string $project_id = null,
        private ?string $testing_requirements = null,
        private ?string $description = null
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            $data['title'],
            $data['program_id'],
            $data['facility_id'],
            $data['participants'] ?? null,
            $data['outcomes'] ?? null,
            $data['status'] ?? 'draft',
            $data['project_id'] ?? null,
            $data['testing_requirements'] ?? null,
            $data['description'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'project_id' => $this->project_id,
            'title' => $this->title,
            'program_id' => $this->program_id,
            'facility_id' => $this->facility_id,
            'participants' => $this->participants,
            'outcomes' => $this->outcomes,
            'status' => $this->status,
            'testing_requirements' => $this->testing_requirements,
            'description' => $this->description,
        ];
    }

    public function getTitle(): string { return $this->title; }
    public function getProgramId(): string { return $this->program_id; }
    public function getFacilityId(): string { return $this->facility_id; }
    public function getParticipants(): ?array { return $this->participants; }
    public function getOutcomes(): ?array { return $this->outcomes; }
    public function getStatus(): ?string { return $this->status; }
    public function getProjectId(): ?string { return $this->project_id; }
    public function getTestingRequirements(): ?string { return $this->testing_requirements; }
}
