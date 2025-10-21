<?php

namespace App\Providers;

// Programs
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Infrastructure\Programs\ProgramRepository;

// Facilities
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;
use App\Infrastructure\Facilities\FacilityRepository;

// Participants
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;
use App\Infrastructure\Participants\ParticipantRepository;


use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->bind(
        ProgramRepositoryInterface::class,
        ProgramRepository::class
    );

        $this->app->bind(
            FacilityRepositoryInterface::class,
            FacilityRepository::class
    );
        $this->app->bind(
            ParticipantRepositoryInterface::class,
            ParticipantRepository::class
        );

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
