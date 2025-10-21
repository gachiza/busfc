<?php

namespace App\Domain\Equipment\Entities;

class EquipmentEntity
{
    public function __construct(
        private string $name,
        private string $facility_id,
        private string $inventory_code,
        private string $usage_domain,
        private array $support_phase,
        private ?string $capabilities = null,
        private ?string $description = null,
        private ?string $equipment_id = null,
        private ?\DateTimeInterface $created_at = null,
        private ?\DateTimeInterface $updated_at = null
    ) {}

    // Required field getters
    public function getEquipmentId(): ?string 
    {
        return $this->equipment_id;
    }

    public function getFacilityId(): string 
    {
        return $this->facility_id;
    }

    public function getName(): string 
    {
        return $this->name;
    }

    public function getInventoryCode(): string 
    {
        return $this->inventory_code;
    }

    public function getUsageDomain(): string 
    {
        return $this->usage_domain;
    }

    public function getSupportPhase(): array 
    {
        return $this->support_phase;
    }

    // Optional field getters
    public function getCapabilities(): ?string 
    {
        return $this->capabilities;
    }

    public function getDescription(): ?string 
    {
        return $this->description;
    }

    // Business logic methods
    public function isElectronics(): bool 
    {
        return $this->usage_domain === 'Electronics';
    }

    public function hasValidSupportPhase(): bool 
    {
        if (!$this->isElectronics()) {
            return true;
        }
        
        return in_array('Prototyping', $this->support_phase) || 
               in_array('Testing', $this->support_phase);
    }
}