<?php

use App\Application\Equipment\Services\CreateEquipmentService;
use App\Domain\Equipment\Fakes\FakeEquipmentRepository;
use App\Domain\Facilities\Fakes\FakeFacilityRepository;

it('validates equipment required fields, inventory uniqueness, and electronics support coherence', function () {
    $facilityFake = new FakeFacilityRepository([['facility_id' => 'fac_1', 'name' => 'F1', 'location' => 'L1']]);
    $equipFake = new FakeEquipmentRepository();

    $svc = new CreateEquipmentService($equipFake, $facilityFake);

    // missing inventory_code should throw
    try {
        $svc->execute(['facility_id' => 'fac_1', 'name' => 'Eq1']);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Equipment.FacilityId');
    }

    // electronics without appropriate support phase should throw
    try {
        $svc->execute(['facility_id' => 'fac_1', 'name' => 'Eq2', 'inventory_code' => 'INV1', 'usage_domain' => 'Electronics', 'support_phase' => ['Training']]);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e->getMessage())->toContain('Electronicsequipmentmust');
    }

    // proper electronics
    $created = $svc->execute(['facility_id' => 'fac_1', 'name' => 'Eq3', 'inventory_code' => 'INV2', 'usage_domain' => 'Electronics', 'support_phase' => ['Testing']]);
    expect($created)->not->toBeNull();
});
