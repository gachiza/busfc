<?php

namespace App\Domain\Services\Entities;

class ServiceEntity
{
    public function __construct(
        private string $facility_id,
        private string $name,
        private string $category,
        private string $skill_type,
        private ?string $description = null,
        private ?string $service_id = null
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            $data['facility_id'],
            $data['name'],
            $data['category'],
            $data['skill_type'],
            $data['description'] ?? null,
            $data['service_id'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'service_id' => $this->service_id,
            'facility_id' => $this->facility_id,
            'name' => $this->name,
            'category' => $this->category,
            'skill_type' => $this->skill_type,
            'description' => $this->description,
        ];
    }

    public function getServiceId(): ?string { return $this->service_id; }
    public function getFacilityId(): string { return $this->facility_id; }
    public function getName(): string { return $this->name; }
    public function getCategory(): string { return $this->category; }
    public function getSkillType(): string { return $this->skill_type; }
    public function getDescription(): ?string { return $this->description; }
}
