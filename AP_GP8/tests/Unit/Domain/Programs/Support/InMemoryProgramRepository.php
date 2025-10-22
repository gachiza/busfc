<?php

namespace Tests\Unit\Domain\Programs\Support;

use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;

class InMemoryProgramRepository implements ProgramRepositoryInterface
{
    private array $programs = [];
    private array $projects = []; // programId => [project1, project2]

    public function all(): array
    {
        return array_values($this->programs);
    }

    public function create(ProgramEntity $program): ProgramEntity
    {
        $id = $program->getProgramId();
        $this->programs[$id] = clone $program;
        return $this->programs[$id];
    }

    public function update(ProgramEntity $program): ProgramEntity
    {
        $id = $program->getProgramId();
        if (!isset($this->programs[$id])) {
            throw new \RuntimeException("Program {$id} not found");
        }
        $this->programs[$id] = clone $program;
        return $this->programs[$id];
    }

    public function delete(string $id): void
    {
        if (!isset($this->programs[$id])) {
            throw new \RuntimeException("Program {$id} not found");
        }
        unset($this->programs[$id]);
        unset($this->projects[$id]);
    }

    public function findById(string $id): ?ProgramEntity
    {
        return $this->programs[$id] ?? null;
    }

    public function existsByName(string $name): bool
    {
        $name = strtolower($name);
        foreach ($this->programs as $program) {
            if (strtolower($program->getName()) === $name) {
                return true;
            }
        }
        return false;
    }


    public function getProjects(string $programId): array
    {
        return $this->projects[$programId] ?? [];
    }

    public function hasProjects(string $programId): bool
    {
        return !empty($this->projects[$programId] ?? []);
    }

    // Helper for tests
    public function addProject(string $programId, object $project): void
    {
        $this->projects[$programId][] = $project;
    }

    public function reset(): void
    {
        $this->programs = [];
        $this->projects = [];
    }
}