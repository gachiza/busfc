<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Application\Programs\Services\CreateProgramService;
use App\Application\Programs\Services\DeleteProgramService;
use App\Domain\Programs\Entities\ProgramEntity;
use App\Domain\Programs\Exceptions\ProgramExceptions;
use App\Domain\Programs\Fakes\FakeProgramRepository;
use App\Application\Programs\DTOs\ProgramData;
use Illuminate\Validation\ValidationException;

class ProgramBusinessRulesTest extends TestCase
{
    /** @test */
    public function it_validates_required_fields_in_program_data()
    {
        $this->expectException(ValidationException::class);
        new ProgramData([
            'description' => 'Test Description'
            // missing name
        ]);

        $this->expectException(ValidationException::class);
        new ProgramData([
            'name' => 'Test Program'
            // missing description
        ]);

        // Test valid creation
        $data = new ProgramData([
            'name' => 'Test Program',
            'description' => 'Test Description'
        ]);
        $this->assertEquals('Test Program', $data->getName());
        $this->assertEquals('Test Description', $data->getDescription());
    }

    /** @test */
    public function it_enforces_unique_program_names()
    {
        $repo = new FakeProgramRepository();
        $service = new CreateProgramService($repo);

        // Create first program
        $data1 = new ProgramData([
            'name' => 'Test Program',
            'description' => 'First Program'
        ]);
        $service->execute($data1);

        $this->expectException(ProgramExceptions::class);
        $this->expectExceptionMessage("Program name 'Test Program' already exists");

        // Try to create second program with same name
        $data2 = new ProgramData([
            'name' => 'Test Program',
            'description' => 'Second Program'
        ]);
        $service->execute($data2);
    }

    /** @test */
    public function it_enforces_national_alignment_rules()
    {
        $repo = new FakeProgramRepository();
        $service = new CreateProgramService($repo);

        // Test focus areas without national alignment
        $this->expectException(ProgramExceptions::class);
        $this->expectExceptionMessage('National alignment must be specified when focus areas are provided');

        $data1 = new ProgramData([
            'name' => 'Test Program',
            'description' => 'Test Description',
            'focus_areas' => 'Area1,Area2',
            'national_alignment' => ''
        ]);
        $service->execute($data1);

        // Test invalid national alignment
        $this->expectException(ProgramExceptions::class);
        $this->expectExceptionMessage('National alignment must be one of: NDPIII, DigitalRoadmap2023_2028, 4IR');

        $data2 = new ProgramData([
            'name' => 'Test Program 2',
            'description' => 'Test Description',
            'focus_areas' => 'Area1,Area2',
            'national_alignment' => 'InvalidAlignment'
        ]);
        $service->execute($data2);

        // Test valid national alignment
        $data3 = new ProgramData([
            'name' => 'Test Program 3',
            'description' => 'Test Description',
            'focus_areas' => 'Area1,Area2',
            'national_alignment' => 'NDPIII'
        ]);
        $program = $service->execute($data3);
        $this->assertInstanceOf(ProgramEntity::class, $program);
    }

    /** @test */
    public function it_prevents_deletion_of_programs_with_projects()
    {
        $repo = new FakeProgramRepository();
        $createService = new CreateProgramService($repo);
        $deleteService = new DeleteProgramService($repo);

        // Create a program
        $data = new ProgramData([
            'name' => 'Test Program',
            'description' => 'Test Description'
        ]);
        $program = $createService->execute($data);

        // Attach a project
        $repo->attachProject($program->getProgramId(), 'test-project-1');

        $this->expectException(ProgramExceptions::class);
        $this->expectExceptionMessage('Cannot delete program with existing projects');
        
        $deleteService->execute($program->getProgramId());
    }
}