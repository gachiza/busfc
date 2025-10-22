<?php

use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;

beforeEach(function () {
    // Optional: reset any static state if needed
});

// ——————————————————————————————————————————————————————————————
// 1. CONSTRUCTION & REQUIRED FIELDS
// ——————————————————————————————————————————————————————————————

it('cannot create program without name', function () {
    expect(fn() => new ProgramEntity('', 'Valid description'))
        ->toThrow(ProgramExceptions::class, 'Program.Name is required.');
});

it('cannot create program without description', function () {
    expect(fn() => new ProgramEntity('Valid name', ''))
        ->toThrow(ProgramExceptions::class, 'Program.Description is required.');
});

it('name cannot be longer than 255 characters', function () {
    $longName = str_repeat('A', 256);

    expect(fn() => new ProgramEntity($longName, 'Valid description'))
        ->toThrow(ProgramExceptions::class, 'Program.Name is too long (max 255 characters).');
});

// ——————————————————————————————————————————————————————————————
// 2. GETTERS
// ——————————————————————————————————————————————————————————————

it('getters return constructor values', function () {
    $entity = new ProgramEntity(
        name: 'Digital Transformation',
        description: 'Digitizing public services',
        program_code: 'DT2025',
        focus_areas: 'e-Government,AI',
        national_alignment: 'NDPIII,DigitalRoadmap2023_2028',
        phases: 'Planning,Implementation'
    );

    expect($entity->getProgramId())->toStartWith('prg_')
        ->and($entity->getName())->toBe('Digital Transformation')
        ->and($entity->getDescription())->toBe('Digitizing public services')
        ->and($entity->getProgramCode())->toBe('DT2025')
        ->and($entity->getFocusAreas())->toBe('e-Government,AI')
        ->and($entity->getNationalAlignment())->toBe('NDPIII,DigitalRoadmap2023_2028')
        ->and($entity->getPhases())->toBe('Planning,Implementation');
});

// ——————————————————————————————————————————————————————————————
// 3. UPDATE DETAILS – VALIDATION & PARTIAL UPDATES
// ——————————————————————————————————————————————————————————————

it('update details validates name and description', function () {
    $entity = createValidProgram();

    expect(fn() => $entity->updateDetails('', 'New desc'))
        ->toThrow(ProgramExceptions::class, 'Program.Name is required.');
});

it('update details allows partial updates (preserves focus areas and alignment)', function () {
    $entity = new ProgramEntity(
        name: 'Initial Name',
        description: 'Initial Desc',
        focus_areas: 'HealthTech',
        national_alignment: 'NDPIII'
    );

    $entity->updateDetails(
        name: 'Updated Name',
        description: 'Updated Desc'
        // focus_areas and national_alignment omitted → preserved
    );

    expect($entity->getName())->toBe('Updated Name')
        ->and($entity->getDescription())->toBe('Updated Desc')
        ->and($entity->getFocusAreas())->toBe('HealthTech')
        ->and($entity->getNationalAlignment())->toBe('NDPIII');
});

it('update details allows updating focus areas with valid alignment', function () {
    $entity = createValidProgram();

    $entity->updateDetails(
        name: 'New Name',
        description: 'New Desc',
        focus_areas: 'AI,Health',
        national_alignment: 'NDPIII,4IR'
    );

    expect($entity->getFocusAreas())->toBe('AI,Health')
        ->and($entity->getNationalAlignment())->toBe('NDPIII,4IR');
});

it('cannot set focus areas without national alignment', function () {
    $entity = createValidProgram();

    expect(fn() => $entity->updateDetails(
        name: 'Test',
        description: 'Desc',
        focus_areas: 'AI',
        national_alignment: null
    ))->toThrow(
        ProgramExceptions::class,
        'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
    );
});

// it('cannot remove national alignment when focus areas exist', function () {
//     $entity = new ProgramEntity(
//         name: 'Test',
//         description: 'Desc',
//         focus_areas: 'AI',
//         national_alignment: 'NDPIII'
//     );

//     expect(fn() => $entity->updateDetails(
//         name: 'Test',
//         description: 'Desc',
//         national_alignment: null
//     ))->toThrow(
//         ProgramExceptions::class,
//         'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
//     );
// });

// ——————————————————————————————————————————————————————————————
// 4. PROGRAM CODE
// ——————————————————————————————————————————————————————————————

it('assign program code rejects empty string', function () {
    $entity = createValidProgram();

    expect(fn() => $entity->assignProgramCode(''))
        ->toThrow(ProgramExceptions::class, 'Program.ProgramCode cannot be empty.');
});

it('assign program code accepts valid code', function () {
    $entity = createValidProgram();
    $entity->assignProgramCode('ABC123');

    expect($entity->getProgramCode())->toBe('ABC123');
});

// ——————————————————————————————————————————————————————————————
// 5. NATIONAL ALIGNMENT TOKEN VALIDATION
// ——————————————————————————————————————————————————————————————

it('valid national alignment tokens are accepted', function () {
    $valid = ['NDPIII', 'DigitalRoadmap2023_2028', '4IR'];

    foreach ($valid as $token) {
        $entity = new ProgramEntity(
            name: 'Test',
            description: 'Desc',
            focus_areas: 'Some',
            national_alignment: $token
        );
        expect($entity->getNationalAlignment())->toBe($token);
    }
});

it('multiple alignment tokens are allowed', function () {
    $entity = new ProgramEntity(
        name: 'Multi',
        description: 'Desc',
        focus_areas: 'AI',
        national_alignment: 'NDPIII,DigitalRoadmap2023_2028'
    );

    expect($entity->getNationalAlignment())->toBe('NDPIII,DigitalRoadmap2023_2028');
});

it('invalid alignment token throws exception', function () {
    expect(fn() => new ProgramEntity(
        name: 'Test',
        description: 'Desc',
        focus_areas: 'AI',
        national_alignment: 'InvalidToken'
    ))->toThrow(
        ProgramExceptions::class,
        'Program.NationalAlignment must include at least one recognized alignment when FocusAreas are specified.'
    );
});

// ——————————————————————————————————————————————————————————————
// 6. PHASES
// ——————————————————————————————————————————————————————————————

it('update phases sets value', function () {
    $entity = createValidProgram();
    $entity->updatePhases('Design,Development');

    expect($entity->getPhases())->toBe('Design,Development');
});

// ——————————————————————————————————————————————————————————————
// 7. FACTORY & PERSISTENCE
// ——————————————————————————————————————————————————————————————

it('from array creates entity identical to constructor', function () {
    $data = [
        'program_id' => 'prg_custom123',
        'name' => 'Factory Program',
        'description' => 'Via factory',
        'program_code' => 'FACT01',
        'focus_areas' => 'Edu',
        'national_alignment' => 'NDPIII',
        'phases' => 'P1,P2',
    ];

    $entity = ProgramEntity::fromArray($data);

    expect($entity->getProgramId())->toBe($data['program_id'])
        ->and($entity->getName())->toBe($data['name'])
        ->and($entity->getDescription())->toBe($data['description'])
        ->and($entity->getProgramCode())->toBe($data['program_code'])
        ->and($entity->getFocusAreas())->toBe($data['focus_areas'])
        ->and($entity->getNationalAlignment())->toBe($data['national_alignment'])
        ->and($entity->getPhases())->toBe($data['phases']);
});

it('to array returns all properties', function () {
    $entity = createValidProgram();
    $entity->assignProgramCode('XYZ');
    $entity->updatePhases('Alpha');

    $array = $entity->toArray();

    expect($array)->toHaveKeys([
        'program_id', 'name', 'description', 'program_code',
        'focus_areas', 'national_alignment', 'phases'
    ])
    ->and($array['program_code'])->toBe('XYZ')
    ->and($array['phases'])->toBe('Alpha');
});

// ——————————————————————————————————————————————————————————————
// HELPER
// ——————————————————————————————————————————————————————————————

function createValidProgram(): ProgramEntity
{
    return new ProgramEntity(
        name: 'Default Program',
        description: 'Valid description'
    );
}