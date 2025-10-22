@extends('layouts.app')

@section('content')
@include('partials._home_styles')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Participants</h2>
        <a class="btn btn-success" href="{{ route('participants.create') }}">Create New Participant</a>
    </div>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Affiliation</th>
                <th>Specialization</th>
                <th>Institution</th>
                <th>Cross-Skilled</th>
                <th width="220px">Action</th>
            </tr>
        </thead>
        <tbody>
        @forelse ($participants as $p)
            <tr>
                <td>{{ $p->getFullName() }}</td>
                <td>{{ $p->getEmail() }}</td>
                <td>{{ $p->getAffiliation() }}</td>
                <td>{{ $p->getSpecialization() }}</td>
                <td>{{ $p->getInstitution() }}</td>
                <td>{{ $p->getCrossSkillTrained() ? 'Yes' : 'No' }}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <a class="btn btn-info btn-sm mr-2 px-3 py-1" href="{{ route('participants.show', $p->getParticipantId()) }}">View</a>
                        <a class="btn btn-primary btn-sm mr-2 px-3 py-1" href="{{ route('participants.edit', $p->getParticipantId()) }}">Edit</a>
                        <form action="{{ route('participants.destroy', $p->getParticipantId()) }}" method="POST" class="m-0">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger btn-sm px-3 py-1" onclick="return confirm('Delete this participant?')">Delete</button>
                        </form>
                    </div>
                </td>
            </tr>
        @empty
            <tr><td colspan="7" class="text-center">No participants found.</td></tr>
        @endforelse
        </tbody>
    </table>
</div>
@endsection
