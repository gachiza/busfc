<?php

namespace App\Domain\Facilities\Entities;

class FacilityEntity
{
    private ?string $facility_id;
    private string $name;
    private string $location;
    private ?string $description;              // Add this
    private ?string $partnerOrganization;      // Add this
    private ?string $facilityCode;             // Add this
    private string $facilityType;
    private ?array $capabilities;
    private ?\DateTimeInterface $createdAt;
    private ?\DateTimeInterface $updatedAt;

    public function __construct(
        string $name,
        string $location,
        string $facilityType,
        ?array $capabilities = null,
        ?string $description = null,           // Add this
        ?string $partnerOrganization = null,   // Add this
        ?string $facilityCode = null,          // Add this
        ?string $facility_id = null,
        ?\DateTimeInterface $createdAt = null,
        ?\DateTimeInterface $updatedAt = null
    ) {
        $this->name = $name;
        $this->location = $location;
        $this->description = $description;                    // Add this
        $this->partnerOrganization = $partnerOrganization;    // Add this
        $this->facilityCode = $facilityCode;                  // Add this
        $this->facilityType = $facilityType;
        $this->capabilities = $capabilities;
        $this->facility_id = $facility_id;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    public function getFacilityId(): ?string
    {
        return $this->facility_id;
    }

    public function getFacilityName(): string
    {
        return $this->name;
    }

    public function getFacilityLocation(): string
    {
        return $this->location;
    }

    public function getFacilityDescription(): ?string
    {
        return $this->description ?? null;
    }

    public function getPartnerOrganization(): ?string
    {
        return $this->partnerOrganization ?? null;
    }

    public function getFacilityType(): string
    {
        return $this->facilityType;
    }

    public function getFacilityCode(): ?string
    {
        return $this->facilityCode ?? null;
    }


    public function getFacilityCapabilities(): ?array
    {
        return $this->capabilities;
    }

    public function getFacilityCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function getFacilityUpdatedAt(): ?\DateTimeInterface
    {
        return $this->updatedAt;
    }

    public function setFacilityName(string $name): void
    {
        $this->name = $name;
    }

    public function setFacilityDescription(?string $description): void
    {
        $this->description = $description;
    }

    public function setFacilityLocation(string $location): void
    {
        $this->location = $location;
    }

    public function setPartnerOrganization(?string $partnerOrganization): void
    {
        $this->partnerOrganization = $partnerOrganization;
    }

    public function setFacilityType(string $facilityType): void
    {
        $this->facilityType = $facilityType;
    }

    public function setFacilityCapabilities(?array $capabilities): void
    {
        $this->capabilities = $capabilities;
    }

    public function hasFacilityCapabilities(): bool
    {
        return !empty($this->capabilities);
    }

    public function setFacilityCode(?string $facilityCode): void
    {
        $this->facilityCode = $facilityCode;
    }

    public function toArray(): array
    {
        return [
            'facility_id' => $this->facility_id,
            'facility_code' => $this->facilityCode,
            'name' => $this->name,
            'location' => $this->location,
            'description' => $this->description,
            'partner_organization' => $this->partnerOrganization,
            'facility_type' => $this->facilityType,
            'capabilities' => $this->capabilities,
            'created_at' => $this->createdAt?->format('Y-m-d H:i:s'),
            'updated_at' => $this->updatedAt?->format('Y-m-d H:i:s'),
        ];
    }

    public static function fromArray(array $data): self
    {
        return new self(
            $data['name'] ?? '',
            $data['location'] ?? '',
            $data['facility_type'] ?? ($data['facilityType'] ?? ''),
            $data['capabilities'] ?? ($data['capabilities'] ?? null),
            $data['description'] ?? '',
            $data['partner_organization'] ?? ($data['partner_organization'] ?? null),
            $data['facility_code'] ?? ($data['facility_code'] ?? null),
            $data['facility_id'] ?? null,
            isset($data['created_at']) ? new \DateTime($data['created_at']) : null,
            isset($data['updated_at']) ? new \DateTime($data['updated_at']) : null
        );
    }
}