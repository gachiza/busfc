<?php

namespace App\Application\Facilities\DTOs;

class FacilityData
{
    public function __construct(
        public readonly string $name,
        public readonly string $location,
        public readonly string $facilityType,
        public readonly ?array $capabilities = null,
        public readonly ?string $description = null,              // Add this
        public readonly ?string $partner_organization = null,     // Add this
        public readonly ?string $facility_code = null,            // Add this
        public readonly ?string $facility_id = null
    ) {
    }

    public static function fromRequest(array $data): self
    {
        return new self(
            name: $data['name'] ?? '',
            location: $data['location'] ?? '',
            facilityType: $data['facility_type'] ?? '',
            capabilities: $data['capabilities'] ?? null,
            description: $data['description'] ?? null,                      // Add this
            partner_organization: $data['partner_organization'] ?? null,    // Add this
            facility_code: $data['facility_code'] ?? null,                  // Add this
            facility_id: $data['facility_id'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'facility_id' => $this->facility_id,
            'facility_code' => $this->facility_code,                        // Add this
            'name' => $this->name,
            'location' => $this->location,
            'description' => $this->description,                            // Add this
            'partner_organization' => $this->partner_organization,          // Add this
            'facility_type' => $this->facilityType,
            'capabilities' => $this->capabilities,
        ];
    }

    public function validate(): array
    {
        $errors = [];

        if (empty(trim($this->name))) {
            $errors['name'] = 'Name is required.';
        }

        if (empty(trim($this->location))) {
            $errors['location'] = 'Location is required.';
        }

        if (empty(trim($this->facilityType))) {
            $errors['facility_type'] = 'Facility Type is required.';
        }

        return $errors;
    }

    public function isValid(): bool
    {
        return empty($this->validate());
    }
}