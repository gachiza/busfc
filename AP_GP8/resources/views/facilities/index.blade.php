@extends('layouts.app')

@section('content')
@include('partials._home_styles')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Facilities</h2>
        <a class="btn btn-success" href="{{ route('facilities.create') }}">Create New Facility</a>
    </div>

    <form method="GET" action="{{ route('facilities.index') }}" class="mb-3">
        <div class="row g-2">
            <div class="col-md-3">
                <select name="type" class="form-control">
                    <option value="">All Types</option>
                    @foreach ($types as $t)
                        <option value="{{ $t }}" {{ request('type') === $t ? 'selected' : '' }}>{{ $t }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <select name="partner" class="form-control">
                    <option value="">All Partners</option>
                    @foreach ($partners as $p)
                        <option value="{{ $p }}" {{ request('partner') === $p ? 'selected' : '' }}>{{ $p }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-3">
                <input type="text" name="capability" value="{{ request('capability') }}" class="form-control" placeholder="Filter by Capability">
            </div>
            <div class="col-md-3">
                <input type="text" name="q" value="{{ request('q') }}" class="form-control" placeholder="Search name/location/partner">
            </div>
            <div class="col-md-2 mt-2">
                <button type="submit" class="btn btn-primary w-100">Filter</button>
            </div>
        </div>
    </form>

    @if (session('success'))
        <div class="alert alert-success">{{ session('success') }}</div>
    @endif
    @if (session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Facility ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Partner</th>
                <th>Location</th>
                <th>Capabilities</th>
                <th width="220px">Action</th>
            </tr>
        </thead>
        <tbody>
        @forelse ($facilities as $facility)
            <tr>
                <td>{{ $facility->getFacilityId() }}</td>
                <td>{{ $facility->getFacilityName() }}</td>
                <td>{{ $facility->getFacilityType() }}</td>
                <td>{{ $facility->getPartnerOrganization() }}</td>
                <td>{{ $facility->getFacilityLocation() }}</td>
                <td>{{ Str::limit(implode(', ', $facility->getFacilityCapabilities()), 60) }}</td>
                <td>
                    <a class="btn btn-info btn-sm" href="{{ route('facilities.show', $facility->getFacilityId() ) }}">View</a>
                    <a class="btn btn-primary btn-sm" href="{{ route('facilities.edit', $facility->getFacilityId() ) }}">Edit</a>
                    <form action="{{ route('facilities.destroy', $facility->getFacilityId() ) }}" method="POST" style="display:inline-block">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger btn-sm" onclick="return confirm('Delete this facility?')">Delete</button>
                    </form>
                </td>
            </tr>
        @empty
            <tr><td colspan="7" class="text-center">No facilities found.</td></tr>
        @endforelse
        </tbody>
    </table>
</div>
@endsection
