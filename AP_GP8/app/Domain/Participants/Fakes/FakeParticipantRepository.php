<?php

namespace App\Domain\Participants\Fakes;

use App\Domain\Participants\Entities\ParticipantEntity;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;

class FakeParticipantRepository implements ParticipantRepositoryInterface
{
    private array $store = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $id = $s['participant_id'] ?? uniqid('part_');
            $s['participant_id'] = $id;
            $this->store[$id] = $s;
        }
    }

    public function findById(string $participantId): ?ParticipantEntity
    {
        return isset($this->store[$participantId]) ? ParticipantEntity::fromArray($this->store[$participantId]) : null;
    }

    public function findByEmail(string $email): ?ParticipantEntity
    {
        foreach ($this->store as $s) {
            if (strtolower($s['email']) === strtolower($email)) return ParticipantEntity::fromArray($s);
        }
        return null;
    }

    // interface requires an optional exclude id
    public function emailExists(string $email, ?string $excludeParticipantId = null): bool
    {
        foreach ($this->store as $s) {
            if ($excludeParticipantId && ($s['participant_id'] ?? null) === $excludeParticipantId) continue;
            if (strtolower($s['email']) === strtolower($email)) return true;
        }
        return false;
    }

    public function create(ParticipantEntity $participant): ParticipantEntity
    {
        $id = $participant->getParticipantId() ?? uniqid('part_');
        $arr = $participant->toArray();
        $arr['participant_id'] = $id;
        $this->store[$id] = $arr;
        return ParticipantEntity::fromArray($arr);
    }

    public function update(ParticipantEntity $participant): ParticipantEntity
    {
        $id = $participant->getParticipantId();
        if (!$id || !isset($this->store[$id])) throw new \Exception('Not found');
        $this->store[$id] = $participant->toArray();
        return ParticipantEntity::fromArray($this->store[$id]);
    }

    public function delete(string $participantId): bool
    {
        if (isset($this->store[$participantId])) { unset($this->store[$participantId]); return true; }
        return false;
    }

    public function listByProject(string $projectId): array { return []; }

    // Minimal implementations for additional interface methods
    public function findAll(): array { return array_map(fn($s) => ParticipantEntity::fromArray($s), array_values($this->store)); }
    public function findByAffiliation(string $affiliation): array { return []; }
    public function findByInstitution(string $institution): array { return []; }
    public function findBySpecialization(string $specialization): array { return []; }
    public function findCrossSkillTrained(): array { return []; }
}
