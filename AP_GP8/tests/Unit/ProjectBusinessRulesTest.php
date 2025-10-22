<?php

use App\Application\Projects\Services\CreateProjectService;
use App\Domain\Projects\Fakes\FakeProjectRepository;
use App\Domain\Programs\Fakes\FakeProgramRepository;
use App\Domain\Facilities\Fakes\FakeFacilityRepository;
use App\Domain\Projects\Exceptions\ProjectExceptions;

it('validates required fields, program/facility existence, participants and outcomes for projects', function () {
    $programFake = new FakeProgramRepository([['program_id' => 'pg1', 'name' => 'P1', 'description' => 'D1']]);
    $facilityFake = new FakeFacilityRepository([['facility_id' => 'fac1', 'name' => 'F1', 'location' => 'L1']]);
    $projectFake = new FakeProjectRepository();

    $svc = new CreateProjectService($projectFake, $programFake, $facilityFake);

    // Missing associations
    expect(fn() => $svc->execute(['title' => 'T1']))->toThrow(Exception::class);

    // Program not found
    expect(fn() => $svc->execute(['title' => 'T1', 'program_id' => 'missing', 'facility_id' => 'fac1', 'participants' => ['u1']]))->toThrow(Exception::class);

    // Facility not found
    expect(fn() => $svc->execute(['title' => 'T1', 'program_id' => 'pg1', 'facility_id' => 'missing', 'participants' => ['u1']]))->toThrow(Exception::class);

    // Missing participants
    expect(fn() => $svc->execute(['title' => 'T1', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => []]))->toThrow(Exception::class);

    // Completed without outcomes
    expect(fn() => $svc->execute(['title' => 'T1', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => ['u1'], 'status' => 'Completed', 'outcomes' => []]))->toThrow(Exception::class);

    // Unique name enforcement
    $svc->execute(['title' => 'UniqueProject', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => ['u1']]);
    expect(fn() => $svc->execute(['title' => 'UniqueProject', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => ['u1']]))->toThrow(Exception::class);

    // Facility capability incompatibility - set facility capabilities to not include requirement
    $projectFake->setFacilityCapabilities('fac1', ['Basic']);
    expect(fn() => $svc->execute(['title' => 'CapFail', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => ['u1'], 'testing_requirements' => ['AdvancedTesting']]))->toThrow(Exception::class);

    // Now set capabilities to include requirement and expect success
    $projectFake->setFacilityCapabilities('fac1', ['AdvancedTesting', 'Basic']);
    $created = $svc->execute(['title' => 'GoodProject', 'program_id' => 'pg1', 'facility_id' => 'fac1', 'participants' => ['u1'], 'testing_requirements' => ['AdvancedTesting']]);
    expect($created)->not->toBeNull();
});
