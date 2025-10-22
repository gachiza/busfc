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
        private ?array $testing_requirements = null,
        private ?string $description = null
    ) {}

    private function validateTitle(string $title): void
    {
        if (empty(trim($title))) {
            throw \App\Domain\Projects\Exceptions\ProjectExceptions::missingRequiredFields();
        }
        if (strlen($title) > 255) {
            throw new \Exception('Project title too long');
        }
    }

    private function validateRequiredAssociations(string $programId, string $facilityId): void
    {
        if (empty(trim($programId)) || empty(trim($facilityId))) {
            throw \App\Domain\Projects\Exceptions\ProjectExceptions::missingRequiredFields();
        }
    }

    public static function fromArray(array $data): self
    {
        $entity = new self(
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

        // run validations
        $entity->validateTitle($data['title']);
        $entity->validateRequiredAssociations($data['program_id'], $data['facility_id']);

        return $entity;
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
    public function getTestingRequirements(): ?array { return $this->testing_requirements; }
}
