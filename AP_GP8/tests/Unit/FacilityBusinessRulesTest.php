<?php

it('has a facility fake repository for tests', function () {
    $f = new App\Domain\Facilities\Fakes\FakeFacilityRepository([['facility_id' => 'fac_1', 'name' => 'F1', 'location' => 'L1']]);
    expect($f->findById('fac_1'))->not->toBeNull();
});
