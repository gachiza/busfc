<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Domain\Programs\Repositories\ProgramRepositoryInterface;
use App\Domain\Facilities\Repositories\FacilityRepositoryInterface;
use App\Domain\Projects\Repositories\ProjectRepositoryInterface;
use App\Domain\Services\Repositories\ServiceRepositoryInterface;
use App\Domain\Participants\Repositories\ParticipantRepositoryInterface;
use App\Models\Project;
use App\Models\Outcome;

class HomeController extends Controller
{
    public function index(
        ProgramRepositoryInterface $programs,
        FacilityRepositoryInterface $facilities,
        ServiceRepositoryInterface $services,
        ParticipantRepositoryInterface $participants
    ) {
        $data = [
            'programs' => $programs->all(),
            'facilities' => $facilities->findAll(),
            'projects' => Project::all(),
            'services' => $services->findAll(),
            'outcomes' => Outcome::all(),
            'participants' => $participants->findAll(),
        ];

        return view('home', $data);
    }
}
