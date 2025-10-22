<?php

namespace App\Domain\Programs\Repositories;

use App\Domain\Programs\Entities\ProgramEntity;

interface ProgramRepositoryInterface
{
    public function all(): array;
    public function create(ProgramEntity $program): ProgramEntity;
    public function update(ProgramEntity $program): ProgramEntity;
    public function delete(string $id): void;
    public function findById(string $id): ?ProgramEntity;
    public function existsByName(string $name): bool;
    public function getProjects(string $programId): array;
    public function hasProjects(string $programId): bool;
}