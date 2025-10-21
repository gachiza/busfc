<?php

namespace App\Infrastructure\Facilities;

use App\Domain\Facilities\Entities\FacilityEntity;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;
use App\Models\Facility;

class FacilityRepository implements FacilityRepositoryInterface
{
    public function findById(string $facility_id): ?FacilityEntity
    {
        $facility = Facility::find($facility_id);
        
        return $facility ? $this->mapToEntity($facility) : null;
    }

    public function findAll(): array
    {
        $facilities = Facility::all();
        
        return $facilities->map(fn($facility) => $this->mapToEntity($facility))->toArray();
    }

    public function existsByNameAndLocation(string $name, string $location, ?string $excludefacility_id = null): bool
    {
        $query = Facility::where('name', $name)
            ->where('location', $location);

        if ($excludefacility_id) {
            $query->where('id', '!=', $excludefacility_id);
        }

        return $query->exists();
    }

    public function create(FacilityEntity $facility): FacilityEntity
{
    $data = [
        'name' => $facility->getFacilityName(),
        'location' => $facility->getFacilityLocation(),
        'facility_type' => $facility->getFacilityType(),
    ];
    
    // Only add optional fields if they have values
    if ($facility->getFacilityDescription()) {
        $data['description'] = $facility->getFacilityDescription();
    }
    if ($facility->getPartnerOrganization()) {
        $data['partner_organization'] = $facility->getPartnerOrganization();
    }
    if ($facility->getFacilityCapabilities()) {
        $data['capabilities'] = $facility->getFacilityCapabilities();
    }
    
    // DON'T pass facility_id or facility_code at all - let the model generate them
    
    $model = Facility::create($data);

    return $this->mapToEntity($model);
}
    public function update(FacilityEntity $facility): FacilityEntity
    {
        $model = Facility::findOrFail($facility->getFacilityId());
        
        $model->update([
            'name' => $facility->getFacilityName(),
            'location' => $facility->getFacilityLocation(),
            'description' => $facility->getFacilityDescription(),              // Add this
            'partner_organization' => $facility->getPartnerOrganization(), // Add this
            'facility_type' => $facility->getFacilityType(),
            'capabilities' => $facility->getFacilityCapabilities(),
        ]);

        return $this->mapToEntity($model->fresh());
    }

    public function delete(string $facility_id): bool
    {
        $facility = Facility::findOrFail($facility_id);
        
        return $facility->delete();
    }

    public function hasRelatedServices(string $facility_id): bool
    {
        return Facility::find($facility_id)?->services()->exists() ?? false;
    }

    public function hasRelatedEquipment(string $facility_id): bool
    {
        return Facility::find($facility_id)?->equipment()->exists() ?? false;
    }

    public function hasRelatedProjects(string $facility_id): bool
    {
        return Facility::find($facility_id)?->projects()->exists() ?? false;
    }

    public function countRelatedProjects(string $facility_id): int
    {
        return Facility::find($facility_id)?->projects()->count() ?? 0;
    }

    public function countRelatedServices(string $facility_id): int
    {
        return Facility::find($facility_id)?->services()->count() ?? 0;
    }

    public function countRelatedEquipment(string $facility_id): int
    {
        return Facility::find($facility_id)?->equipment()->count() ?? 0;
    }

  private function mapToEntity(Facility $model): FacilityEntity
    {
        return new FacilityEntity(
            name: $model->name,
            location: $model->location,
            facilityType: $model->facility_type,
            capabilities: $model->capabilities,
            description: $model->description,              // Add this
            partnerOrganization: $model->partner_organization, // Add this
            facilityCode: $model->facility_code,           // Add this
            facility_id: $model->facility_id,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at
        );
    }
}
