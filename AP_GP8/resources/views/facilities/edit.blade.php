@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Edit Facility</h2>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('facilities.update', $facility->getFacilityId()) }}" method="POST">
        @csrf
        @method('PUT')
        <div class="form-group mb-2">
            <label>Name</label>
            <input type="text" name="name" class="form-control" value="{{ old('name', $facility->getFacilityName()) }}" required>
        </div>
        <div class="form-group mb-2">
            <label>Location</label>
            <input type="text" name="location" class="form-control" value="{{ old('location', $facility->getFacilityLocation()) }}" required>
        </div>
        <div class="form-group mb-2">
            <label>Description</label>
            <textarea name="description" class="form-control">{{ old('description', $facility->getFacilityDescription()) }}</textarea>
        </div>
        <div class="form-group mb-2">
            <label>Partner Organization</label>
            <input type="text" name="partner_organization" class="form-control" value="{{ old('partner_organization', $facility->getPartnerOrganization()) }}">
        </div>
        <div class="form-group mb-2">
            <label>Facility Type</label>
            <select name="facility_type" class="form-control" required>
                <option value="">Select type</option>
                @foreach ($types as $t)
                    <option value="{{ $t }}" {{ old('facility_type', $facility->getFacilityType()) === $t ? 'selected' : '' }}>{{ $t }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group mb-3">
            <label>Capabilities (comma-separated)</label>
            <textarea name="capabilities" class="form-control">{{ old('capabilities', $facilityCapabilities) }}</textarea>
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
        <a href="{{ route('facilities.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
