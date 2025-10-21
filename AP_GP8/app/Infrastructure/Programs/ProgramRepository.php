<?php
namespace App\Infrastructure\Programs;

use App\Models\Program;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Programs\Exceptions\ProgramExceptions;

class ProgramRepository implements ProgramRepositoryInterface
{
    public function all(): array
    {
        return Program::all()
            ->map(fn($model) => ProgramEntity::fromArray($this->modelToArray($model)))
            ->toArray();
    }

    public function create(ProgramEntity $program): ProgramEntity
    {
        $model = Program::create([
            'program_id' => $program->getProgramId(),
            'name' => $program->getName(),
            'description' => $program->getDescription(),
            'program_code' => $program->getProgramCode(),
            'focus_areas' => $program->getFocusAreas(),
            'national_alignment' => $program->getNationalAlignment(),
            'phases' => $program->getPhases(),
        ]);

        return ProgramEntity::fromArray($this->modelToArray($model));
    }

    public function update(ProgramEntity $program): ProgramEntity
    {
        $model = Program::where('program_id', $program->getProgramId())->firstOrFail();
        
        $model->update([
            'name' => $program->getName(),
            'description' => $program->getDescription(),
            'program_code' => $program->getProgramCode(),
            'focus_areas' => $program->getFocusAreas(),
            'national_alignment' => $program->getNationalAlignment(),
            'phases' => $program->getPhases(),
        ]);
        
        return ProgramEntity::fromArray($this->modelToArray($model->fresh()));
    }

    public function delete(string $id): void
    {
        $program = Program::where('program_id', $id)->firstOrFail();
        
        // Rule: Prevent delete if projects exist
        if ($program->projects()->exists()) {
            throw ProgramExceptions::cannotDeleteWithProjects();
        }
        
        $program->delete();
    }

    public function findById(string $id): ?ProgramEntity
    {
        $program = Program::where('program_id', $id)->first();
        
        return $program ? ProgramEntity::fromArray($this->modelToArray($program)) : null;
    }

    public function existsByName(string $name): bool
    {
        return Program::whereRaw('LOWER(name) = ?', [strtolower($name)])->exists();
    }

    public function getProjects(string $programId): array
    {
        $programModel = Program::with('projects')
            ->where('program_id', $programId)
            ->first();

        if (!$programModel) {
            return [];
        }

        return $programModel->projects
            ->map(fn($proj) => $proj->toArray())
            ->toArray();
    }

    /**
     * Convert Eloquent model to array format for Entity
     */
    private function modelToArray(Program $model): array
    {
        return [
            'program_id' => $model->program_id,
            'name' => $model->name,
            'description' => $model->description,
            'program_code' => $model->program_code,
            'focus_areas' => $model->focus_areas,
            'national_alignment' => $model->national_alignment,
            'phases' => $model->phases,
        ];
    }
}