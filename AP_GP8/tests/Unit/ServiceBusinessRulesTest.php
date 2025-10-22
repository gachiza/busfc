<?php

use App\Application\Services\Services\CreateServiceService;
use App\Domain\Services\Fakes\FakeServiceRepository;
use App\Domain\Facilities\Fakes\FakeFacilityRepository;

it('validates required fields and scoped uniqueness for services', function () {
    $facilityFake = new FakeFacilityRepository([['facility_id' => 'fac_1', 'name' => 'F1', 'location' => 'L1']]);
    $serviceFake = new FakeServiceRepository();

    $svc = new CreateServiceService($serviceFake, $facilityFake);

    // missing name should throw
    try {
        $svc->execute(['facility_id' => 'fac_1', 'name' => '', 'category' => 'Testing', 'skill_type' => 'Hardware']);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Service.FacilityId');
    }

    // success
    $created = $svc->execute(['facility_id' => 'fac_1', 'name' => 'Svc A', 'category' => 'Testing', 'skill_type' => 'Hardware']);
    expect($created)->not->toBeNull();

    // duplicate name in same facility should fail
    try {
        $svc->execute(['facility_id' => 'fac_1', 'name' => 'Svc A', 'category' => 'Testing', 'skill_type' => 'Hardware']);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Aservicewiththisnamealready');
    }
});
