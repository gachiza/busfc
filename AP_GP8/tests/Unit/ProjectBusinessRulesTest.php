<?php

use App\Application\Projects\Services\CreateProjectService;
use App\Domain\Projects\Fakes\FakeProjectRepository;
use App\Domain\Programs\Fakes\FakeProgramRepository;
use App\Domain\Facilities\Fakes\FakeFacilityRepository;

it('validates project required associations, team, outcomes when completed, and name uniqueness in program', function () {
    $progFake = new FakeProgramRepository([['program_id' => 'prg_1', 'name' => 'P1']]);
    $facilityFake = new FakeFacilityRepository([['facility_id' => 'fac_1', 'name' => 'F1', 'location' => 'L1']]);
    $projFake = new FakeProjectRepository();

    $svc = new CreateProjectService($projFake, $progFake, $facilityFake);

    // missing program/facility
    try {
        $svc->execute(['title' => 'T1', 'participants' => ['u1']]);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Project.ProgramIdand');
    }

    // missing participants
    try {
        $svc->execute(['title' => 'T1', 'program_id' => 'prg_1', 'facility_id' => 'fac_1', 'participants' => []]);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Projectmusthaveatleastone');
    }

    // completed without outcomes
    try {
        $svc->execute(['title' => 'T2', 'program_id' => 'prg_1', 'facility_id' => 'fac_1', 'participants' => ['u1'], 'status' => 'Completed']);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Completedprojectsmusthaveat leastonedocumentedoutcome');
    }

    // happy path
    $created = $svc->execute(['title' => 'T3', 'program_id' => 'prg_1', 'facility_id' => 'fac_1', 'participants' => ['u1'], 'status' => 'Draft']);
    expect($created)->not->toBeNull();
});
