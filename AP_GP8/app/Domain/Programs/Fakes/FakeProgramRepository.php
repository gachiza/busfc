<?php

namespace App\Domain\Programs\Fakes;

use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;

class FakeProgramRepository implements ProgramRepositoryInterface
{
    private array $store = [];

    public function __construct(array $seed = [])
    {
        foreach ($seed as $s) {
            $id = $s['program_id'] ?? uniqid('prg_');
            if (empty($s['description'] ?? '')) {
                $s['description'] = 'Seeded program description';
            }
            $s['program_id'] = $id;
            $this->store[$id] = $s;
        }
    }

    public function all(): array { return array_map(fn($s) => ProgramEntity::fromArray($s), array_values($this->store)); }
    private array $projects = [];

    public function create(ProgramEntity $program): ProgramEntity {
        $id = uniqid('prg_');
        $data = $program->toArray();
        $data['program_id'] = $id;
        $this->store[$id] = $data;
        return ProgramEntity::fromArray($data);
    }

    public function update(ProgramEntity $program): ProgramEntity {
        $id = $program->getProgramId();
        if (!isset($this->store[$id])) {
            throw new \Exception("Program not found: $id");
        }
        $data = $program->toArray();
        $this->store[$id] = $data;
        return $program;
    }

    public function delete(string $id): void {
        if (!empty($this->projects[$id] ?? [])) {
            throw ProgramExceptions::cannotDeleteWithProjects();
        }
        unset($this->store[$id]);
    }

    public function findById(string $id): ?ProgramEntity {
        return isset($this->store[$id]) ? ProgramEntity::fromArray($this->store[$id]) : null;
    }

    public function existsByName(string $name): bool {
        foreach ($this->store as $s) {
            if (strtolower($s['name']) === strtolower($name)) return true;
        }
        return false;
    }

    public function getProjects(string $programId): array {
        return $this->projects[$programId] ?? [];
    }

    // Test helper to simulate project attachment
    public function attachProject(string $programId, string $projectId): void {
        if (!isset($this->projects[$programId])) {
            $this->projects[$programId] = [];
        }
        $this->projects[$programId][] = $projectId;
    }
}
