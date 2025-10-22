<?php

use App\Application\Programs\DTOs\ProgramData;
use App\Application\Programs\Services\UpdateProgramService;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use Tests\Unit\Domain\Programs\Support\InMemoryProgramRepository;

describe('UpdateProgramService', function () {

    beforeEach(function () {
        $this->repo = new InMemoryProgramRepository();
        $this->service = new UpdateProgramService($this->repo);
    });

    afterEach(function () {
        $this->repo->reset();
    });

    it('updates all fields of an existing program', function () {
        $original = ProgramEntity::fromArray([
            'name' => 'Old Name',
            'description' => 'Old desc',
            'program_code' => 'OLD123',
            'focus_areas' => 'AI',
            'national_alignment' => 'NDPIII',
            'phases' => 'Planning'
        ]);
        $this->repo->create($original);
        $id = $original->getProgramId();

        $data = new ProgramData([
            'name' => 'New Name',
            'description' => 'New desc',
            'program_code' => 'NEW456',
            'focus_areas' => 'Robotics',
            'national_alignment' => '4IR',
            'phases' => 'Implementation'
        ]);

        $updated = $this->service->execute($id, $data);

        expect($updated->getName())->toBe('New Name')
            ->and($updated->getDescription())->toBe('New desc')
            ->and($updated->getProgramCode())->toBe('NEW456')
            ->and($updated->getFocusAreas())->toBe('Robotics')
            ->and($updated->getNationalAlignment())->toBe('4IR')
            ->and($updated->getPhases())->toBe('Implementation');
    });

    it('allows partial updates', function () {
        $original = ProgramEntity::fromArray([
            'name' => 'Keep Name',
            'description' => 'Original',
            'program_code' => 'KEEP123'
        ]);
        $this->repo->create($original);
        $id = $original->getProgramId();

        $data = new ProgramData([
            'name' => 'Keep Name',
            'description' => 'Updated desc'
        ]);

        $updated = $this->service->execute($id, $data);

        expect($updated->getDescription())->toBe('Updated desc')
            ->and($updated->getProgramCode())->toBe('KEEP123');
    });

    it('throws notFound exception when program does not exist', function () {
        $data = new ProgramData([
            'name' => 'Any',
            'description' => 'Any'
        ]);

        expect(fn() => $this->service->execute('prg_nonexistent', $data))
            ->toThrow(ProgramExceptions::class, 'Program not found.');
    });

    it('throws duplicateName when new name conflicts with another program', function () {
        $program1 = ProgramEntity::fromArray(['name' => 'Conflict', 'description' => 'One']);
        $program2 = ProgramEntity::fromArray(['name' => 'Other', 'description' => 'Two']);
        $this->repo->create($program1);
        $this->repo->create($program2);

        $data = new ProgramData([
            'name' => 'CONFLICT',
            'description' => 'Updated'
        ]);

        expect(fn() => $this->service->execute($program2->getProgramId(), $data))
            ->toThrow(ProgramExceptions::class, "Program with name 'CONFLICT' already exists.");
    });

    it('allows updating to same name (case-insensitive)', function () {
        $program = ProgramEntity::fromArray(['name' => 'Same Name', 'description' => 'Old']);
        $this->repo->create($program);
        $id = $program->getProgramId();

        $data = new ProgramData([
            'name' => 'same name',
            'description' => 'New'
        ]);

        $updated = $this->service->execute($id, $data);

        expect($updated->getName())->toBe('same name');
    });

    it('throws missingNationalAlignment when focus areas are set but alignment is missing', function () {
        $program = ProgramEntity::fromArray(['name' => 'Test', 'description' => 'Old']);
        $this->repo->create($program);

        $data = new ProgramData([
            'name' => 'Test',
            'description' => 'New',
            'focus_areas' => 'AI',
            'national_alignment' => null
        ]);

        expect(fn() => $this->service->execute($program->getProgramId(), $data))
            ->toThrow(
                ProgramExceptions::class,
                'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
            );
    });

//     it('allows removing focus areas even if alignment was previously required', function () {
//     $program = ProgramEntity::fromArray([
//         'name' => 'Test',
//         'description' => 'Old',
//         'focus_areas' => 'AI',
//         'national_alignment' => 'NDPIII'
//     ]);
//     $this->repo->create($program);

//     $data = new ProgramData([
//         'name' => 'Test',
//         'description' => 'Updated',
//         'focus_areas' => null,
//         'national_alignment' => null
//     ]);

//     $updated = $this->service->execute($program->getProgramId(), $data);

//     expect($updated->getFocusAreas())->toBeNull()
//         ->and($updated->getNationalAlignment())->toBeNull();
// });
});