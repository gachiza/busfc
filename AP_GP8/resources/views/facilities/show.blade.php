@extends('layouts.app')

@section('content')
<div class="container">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Facility Details</h2>
        <div>
            <a class="btn btn-primary" href="{{ route('facilities.edit', $facility->getFacilityId() ) }}">Edit</a>
            <a class="btn btn-secondary" href="{{ route('facilities.index') }}">Back to List</a>
        </div>
</div>

    <div class="card mb-3">
        <div class="card-body">
            <h4 class="card-title">{{ $facility->getFacilityName() }}</h4>
            <p><strong>Type:</strong> {{ $facility->getFacilityType() }}</p>
            <p><strong>Partner Organization:</strong> {{ $facility->getPartnerOrganization() }}</p>
            <p><strong>Location:</strong> {{ $facility->getFacilityLocation() }}</p>
            <p><strong>Description:</strong> {{ $facility->getFacilityDescription()}}</p>
            <p><strong>Capabilities:</strong> {{ is_array($facility->getFacilityCapabilities()) ? implode(', ', $facility->getFacilityCapabilities()) : $facility->getFacilityCapabilities() }}</p>
        </div>
    </div>

    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h5>Linked Records</h5>
                    <p>Projects: <strong>{{ $projectsCount }}</strong></p>
                    <p>Services: <strong>{{ $servicesCount }}</strong></p>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
