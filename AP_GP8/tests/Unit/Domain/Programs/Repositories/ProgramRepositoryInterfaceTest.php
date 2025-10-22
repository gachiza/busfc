<?php

use App\Domain\Programs\Entities\ProgramEntity;
use Tests\Unit\Domain\Programs\Support\InMemoryProgramRepository;

describe('ProgramRepositoryInterface with in-memory implementation', function () {

    beforeEach(function () {
        $this->repo = new InMemoryProgramRepository();
    });

    afterEach(function () {
        $this->repo->reset();
    });

    it('returns all created programs', function () {
        $p1 = new ProgramEntity('Prog A', 'Desc A');
        $p2 = new ProgramEntity('Prog B', 'Desc B');

        $this->repo->create($p1);
        $this->repo->create($p2);

        $all = $this->repo->all();

        expect($all)->toHaveCount(2)
            ->and($all[0]->getName())->toBe('Prog A')
            ->and($all[1]->getName())->toBe('Prog B');
    });

    it('creates and returns a program with generated ID', function () {
        $program = new ProgramEntity('Health Init', 'Health program');
        $created = $this->repo->create($program);

        expect($created)->toEqual($program)
            ->and($created->getProgramId())->toStartWith('prg_')
            ->and($created->getName())->toBe('Health Init');
    });

    it('updates an existing program', function () {
        $original = new ProgramEntity('Old Name', 'Old desc');
        $created = $this->repo->create($original);

        $updated = ProgramEntity::fromArray($created->toArray());
        $updated->updateDetails('New Name', 'New desc');

        $result = $this->repo->update($updated);

        expect($result->getName())->toBe('New Name')
            ->and($this->repo->findById($created->getProgramId())->getName())->toBe('New Name');
    });

    it('deletes a program', function () {
        $program = new ProgramEntity('To Delete', 'Desc');
        $created = $this->repo->create($program);

        $this->repo->delete($created->getProgramId());

        expect($this->repo->findById($created->getProgramId()))->toBeNull();
    });

    it('finds program by ID', function () {
        $program = new ProgramEntity('Find Me', 'Desc');
        $created = $this->repo->create($program);

        $found = $this->repo->findById($created->getProgramId());

        expect($found)->toBe($created);
    });

    it('returns null for missing ID', function () {
        expect($this->repo->findById('prg_nonexistent'))->toBeNull();
    });

    it('detects existing name', function () {
        $this->repo->create(new ProgramEntity('Unique Name', 'Desc'));

        expect($this->repo->existsByName('Unique Name'))->toBeTrue()
            ->and($this->repo->existsByName('Other'))-> toBeFalse();
    });

    it('manages program projects', function () {
        $program = new ProgramEntity('Parent', 'Desc');
        $created = $this->repo->create($program);
        $id = $created->getProgramId();

        $proj1 = (object)['id' => 'p1'];
        $proj2 = (object)['id' => 'p2'];

        $this->repo->addProject($id, $proj1);
        $this->repo->addProject($id, $proj2);

        expect($this->repo->hasProjects($id))->toBeTrue()
            ->and($this->repo->getProjects($id))->toBe([$proj1, $proj2])
            ->and($this->repo->hasProjects('other'))->toBeFalse();
    });
});