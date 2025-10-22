<?php

use App\Application\Programs\DTOs\ProgramData;
use App\Application\Programs\Services\CreateProgramService;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use Tests\Unit\Domain\Programs\Support\InMemoryProgramRepository;

describe('CreateProgramService', function () {

    beforeEach(function () {
        $this->repo = new InMemoryProgramRepository();
        $this->service = new CreateProgramService($this->repo);
    });

    afterEach(function () {
        $this->repo->reset();
    });

    it('creates a program when all data is valid', function () {
        $data = new ProgramData([
            'name' => 'Digital Health',
            'description' => 'Health tech',
            'focus_areas' => 'AI',
            'national_alignment' => 'NDPIII'
        ]);

        $program = $this->service->execute($data);

        expect($program)->toBeInstanceOf(ProgramEntity::class)
            ->and($program->getName())->toBe('Digital Health')
            ->and($this->repo->existsByName('Digital Health'))->toBeTrue();
    });

    it('throws exception when program name already exists', function () {
    // DEBUG: Print repo state
    dump('Repo before create:', $this->repo->all());

    $existing = ProgramEntity::fromArray([
        'name' => 'Existing Program',
        'description' => 'Old description'
    ]);

    dump('Created entity:', $existing->getProgramId(), $existing->getName());

    $this->repo->create($existing);

    dump('Repo after create:', array_map(fn($p) => [$p->getProgramId(), $p->getName()], $this->repo->all()));

    $exists = $this->repo->existsByName('Existing Program');
    dump('existsByName("Existing Program"):', $exists);

    $data = new ProgramData([
        'name' => 'Existing Program',
        'description' => 'New description'
    ]);

    dump('Trying to create duplicate...');

    expect(fn() => $this->service->execute($data))
        ->toThrow(
            ProgramExceptions::class,
            "Program with name 'Existing Program' already exists."
        );
});

    it('throws exception when focus areas are set but national alignment is missing', function () {
        $data = new ProgramData([
            'name' => 'AI Health',
            'description' => 'AI',
            'focus_areas' => 'AI',
            'national_alignment' => null
        ]);

        expect(fn() => $this->service->execute($data))
            ->toThrow(
                ProgramExceptions::class,
                'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
            );
    });

    it('allows creation without focus areas or alignment', function () {
        $data = new ProgramData([
            'name' => 'Basic',
            'description' => 'No focus'
        ]);

        $program = $this->service->execute($data);

        expect($program->getFocusAreas())->toBeNull()
            ->and($program->getNationalAlignment())->toBeNull();
    });

    it('throws exception for invalid input', function () {
        expect(fn() => new ProgramData([
            'name' => '',
            'description' => ''
        ]))->toThrow(
            ProgramExceptions::class,
            'Validation failed: Program.Name is required., Program.Description is required.'
        );
    });

    it('trims whitespace from name and description', function () {
        $data = new ProgramData([
            'name' => '  Trim Me  ',
            'description' => '  Desc  '
        ]);

        expect($data->getName())->toBe('Trim Me')
            ->and($data->getDescription())->toBe('Desc');
    });
});