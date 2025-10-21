@extends('layouts.app')

@section('content')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2> Show Program details</h2>
        </div>
        <div class="pull-right">
            <a class="btn btn-primary" href="{{ route('programs.index') }}"> Back</a>
            <a class="btn btn-secondary" href="{{ route('programs.projects', $program->getProgramId()) }}">Projects</a>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong>Name:</strong>
            {{ $program->getName() }}
        </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong>Description:</strong>
            {{ $program->getDescription() }}
        </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong>National Alignment:</strong>
            {{ $program->getNationalAlignment() 
                ? (is_array(json_decode($program->getNationalAlignment(), true))
                    ? implode(', ', json_decode($program->getNationalAlignment(), true))
                    : $program->getNationalAlignment())
                : '—' }}
        </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong>Focus Area:</strong>
            {{ $program->getFocusAreas() 
                ? (is_array(json_decode($program->getFocusAreas(), true))
                    ? implode(', ', json_decode($program->getFocusAreas(), true))
                    : $program->getFocusAreas())
                : '—' }}
        </div>
    </div>
    <div class="col-xs-12 col-sm-12 col-md-12">
        <div class="form-group">
            <strong>Phases:</strong>
            {{ $program->getPhases() 
                ? (is_array(json_decode($program->getPhases(), true))
                    ? implode(', ', json_decode($program->getPhases(), true))
                    : $program->getPhases())
                : '—' }}
        </div>
    </div>
</div>
@endsection