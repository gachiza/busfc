<?php

namespace App\Infrastructure\Participants;

use App\Domain\Participants\Entities\ParticipantEntity;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;
use App\Models\Participant;

class ParticipantRepository implements ParticipantRepositoryInterface
{
    public function findAll(): array
    {
        return Participant::all()
            ->map(fn($model) => $this->mapToEntity($model))
            ->toArray();
    }

    public function findById(string $participantId): ?ParticipantEntity
    {
        $model = Participant::find($participantId);
        return $model ? $this->mapToEntity($model) : null;
    }

    public function findByEmail(string $email): ?ParticipantEntity
    {
        $model = Participant::where('email', $email)->first();
        return $model ? $this->mapToEntity($model) : null;
    }

    public function emailExists(string $email, ?string $excludeParticipantId = null): bool
    {
        $query = Participant::whereRaw('LOWER(email) = ?', [strtolower($email)]);
        
        if ($excludeParticipantId) {
            $query->where('participant_id', '!=', $excludeParticipantId);
        }
        
        return $query->exists();
    }

    public function create(ParticipantEntity $participant): ParticipantEntity
    {
        $data = [
            'full_name' => $participant->getFullName(),
            'email' => $participant->getEmail(),
            'affiliation' => $participant->getAffiliation(),
            'participant_type' => $participant->getParticipantType(),
            'institution' => $participant->getInstitution(),
            'cross_skill_trained' => $participant->getCrossSkillTrained(),
        ];
        
        if ($participant->getSpecialization()) {
            $data['specialization'] = $participant->getSpecialization();
        }
        
        $model = Participant::create($data);
        
        return $this->mapToEntity($model);
    }

    public function update(ParticipantEntity $participant): ParticipantEntity
    {
        $model = Participant::findOrFail($participant->getParticipantId());
        
        $model->update([
            'full_name' => $participant->getFullName(),
            'email' => $participant->getEmail(),
            'affiliation' => $participant->getAffiliation(),
            'specialization' => $participant->getSpecialization(),
            'participant_type' => $participant->getParticipantType(),
            'institution' => $participant->getInstitution(),
            'cross_skill_trained' => $participant->getCrossSkillTrained(),
        ]);
        
        return $this->mapToEntity($model->fresh());
    }

    public function delete(string $participantId): bool
    {
        $model = Participant::find($participantId);
        return $model ? $model->delete() : false;
    }

    public function findByAffiliation(string $affiliation): array
    {
        return Participant::where('affiliation', $affiliation)
            ->get()
            ->map(fn($model) => $this->mapToEntity($model))
            ->toArray();
    }

    public function findBySpecialization(string $specialization): array
    {
        return Participant::where('specialization', $specialization)
            ->get()
            ->map(fn($model) => $this->mapToEntity($model))
            ->toArray();
    }

    public function findByInstitution(string $institution): array
    {
        return Participant::where('institution', $institution)
            ->get()
            ->map(fn($model) => $this->mapToEntity($model))
            ->toArray();
    }

    public function findCrossSkillTrained(): array
    {
        return Participant::where('cross_skill_trained', true)
            ->get()
            ->map(fn($model) => $this->mapToEntity($model))
            ->toArray();
    }

    private function mapToEntity(Participant $model): ParticipantEntity
    {
        return new ParticipantEntity(
            fullName: $model->full_name,
            email: $model->email,
            affiliation: $model->affiliation,
            participantType: $model->participant_type,
            institution: $model->institution,
            specialization: $model->specialization,
            crossSkillTrained: $model->cross_skill_trained,
            participant_id: $model->participant_id,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at
        );
    }
}