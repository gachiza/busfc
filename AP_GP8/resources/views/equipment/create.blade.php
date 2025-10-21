@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Create Equipment</h2>

    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <form action="{{ route('equipment.store') }}" method="POST">
        @csrf
        <div class="form-group mb-2">
            <label>Facility ID</label>
            <input type="text" name="facility_id" class="form-control" value="{{ old('facility_id', $prefillFacilityId ?? '') }}" required>
        </div>
        <div class="form-group mb-2">
            <label>Name</label>
            <input type="text" name="name" class="form-control" value="{{ old('name') }}" required>
        </div>
        <div class="form-group mb-2">
            <label>Description</label>
            <textarea name="description" class="form-control">{{ old('description') }}</textarea>
        </div>
        <div class="form-group mb-2">
            <label>Capabilities (comma-separated)</label>
            <textarea name="capabilities" class="form-control">{{ old('capabilities') }}</textarea>
        </div>
        <div class="form-group mb-2">
            <label>Inventory Code</label>
            <input type="text" name="inventory_code" class="form-control" value="{{ old('inventory_code') }}">
        </div>
        <div class="form-group mb-2">
            <label>Usage Domain</label>
            <select name="usage_domain" class="form-control">
                <option value="">Select domain</option>
                @foreach ($usageDomains as $ud)
                    <option value="{{ $ud }}" {{ old('usage_domain') === $ud ? 'selected' : '' }}>{{ $ud }}</option>
                @endforeach
            </select>
        </div>
        <div class="form-group mb-3">
            <label>Support Phase</label>
            <select name="support_phase" class="form-control">
                <option value="">Select phase</option>
                @foreach ($supportPhases as $sp)
                    <option value="{{ $sp }}" {{ old('support_phase') === $sp ? 'selected' : '' }}>{{ $sp }}</option>
                @endforeach
            </select>
        </div>
        <button type="submit" class="btn btn-success">Save</button>
        <a href="{{ route('equipment.index') }}" class="btn btn-secondary">Cancel</a>
    </form>
</div>
@endsection
