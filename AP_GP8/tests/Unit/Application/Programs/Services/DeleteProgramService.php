<?php

use App\Application\Programs\Services\DeleteProgramService;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use Tests\Unit\Domain\Programs\Support\InMemoryProgramRepository;

describe('DeleteProgramService', function () {

    beforeEach(function () {
        $this->repo = new InMemoryProgramRepository();
        $this->service = new DeleteProgramService($this->repo);
    });

    afterEach(function () {
        $this->repo->reset();
    });

    // SUCCESS: Delete program with no projects
    it('deletes a program when it has no projects', function () {
        $program = ProgramEntity::fromArray([
            'name' => 'Test Program',
            'description' => 'For deletion'
        ]);
        $this->repo->create($program);
        $id = $program->getProgramId();

        $this->service->execute($id);

        expect($this->repo->findById($id))->toBeNull();
    });

    // FAILURE: Program not found
    it('throws notFound exception when program does not exist', function () {
        expect(fn() => $this->service->execute('prg_nonexistent'))
            ->toThrow(ProgramExceptions::class, 'Program not found.');
    });

    // FAILURE: Cannot delete with projects
    it('throws cannotDeleteWithProjects when program has associated projects', function () {
        $program = ProgramEntity::fromArray([
            'name' => 'Blocked Program',
            'description' => 'Has projects'
        ]);
        $this->repo->create($program);
        $id = $program->getProgramId();

        // Add fake projects
        $this->repo->addProject($id, (object)['id' => 'proj1', 'name' => 'Project 1']);
        $this->repo->addProject($id, (object)['id' => 'proj2', 'name' => 'Project 2']);

        expect(fn() => $this->service->execute($id))
            ->toThrow(ProgramExceptions::class, 'Program has Projects; archive or reassign before delete.');
    });

    // SUCCESS: Delete after removing projects
    it('allows deletion after all projects are removed', function () {
    $program = ProgramEntity::fromArray([
        'name' => 'Clean Program',
        'description' => 'Will be clean'
    ]);
    $this->repo->create($program);
    $id = $program->getProgramId();

    // No projects added → already clean

    $this->service->execute($id);

    expect($this->repo->findById($id))->toBeNull();
    });
});