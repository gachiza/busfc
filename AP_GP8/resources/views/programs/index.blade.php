@extends('layouts.app')

@section('content')
@include('partials._home_styles')
<div class="row">
    <div class="col-lg-12 margin-tb">
        <div class="pull-left">
            <h2>Programs</h2>
        </div>
        <div class="pull-right mb-2">
            <a class="btn btn-success" href="{{ route('programs.create') }}"> Create New Program</a>
        </div>
    </div>
</div>

@if ($message = Session::get('success'))
<div class="alert alert-success">
    <p>{{ $message }}</p>
</div>
@endif

<table class="table table-bordered">
    <tr>
        <th>No</th>
        <th>Name</th>
        <th>Description</th>
        <th width="280px">Action</th>
    </tr>
    @foreach ($programs as $program)
    <tr>
        <td>{{ $loop->iteration }}</td>
        <td>{{ $program->getName() }}</td>
        <td>{{ $program->getDescription() }}</td>
        <td>
            <form action="{{ route('programs.destroy', $program->getProgramId()) }}" method="POST">
                <a class="btn btn-info" href="{{ route('programs.show', $program->getProgramId()) }}">Show</a>
                <a class="btn btn-primary" href="{{ route('programs.edit', $program->getProgramId()) }}">Edit</a>
                <a class="btn btn-secondary" href="{{ route('programs.projects', $program->getProgramId()) }}">Projects</a>
                
                @csrf
                @method('DELETE')
                <button type="submit" class="btn btn-danger">Delete</button>
            </form>
        </td>
    </tr>
    @endforeach
</table>
@endsection