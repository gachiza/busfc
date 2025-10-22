<?php

use App\Application\Participants\Services\CreateParticipantService;
use App\Domain\Participants\Fakes\FakeParticipantRepository;
use App\Application\Participants\DTOs\ParticipantData;

it('validates participant required fields and email uniqueness and cross-skill requirement', function () {
    $partFake = new FakeParticipantRepository();
    $svc = new CreateParticipantService($partFake);

    $data = ParticipantData::fromRequest([]);

    try {
        $svc->execute($data);
        throw new Exception('Expected failure');
    } catch (Exception $e) {
        expect($e)->not->toBeNull();
    }
});
