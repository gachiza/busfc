@extends('layouts.app')

@section('content')
<div class="container">
    <style>
        /* Local styles for the Home hero and cards */
        .home-hero {
            border-radius: 12px;
            padding: 2rem;
            color: #fff;
            background: linear-gradient(135deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%);
            box-shadow: 0 8px 20px rgba(16,24,40,0.12);
            margin-bottom: 1.5rem;
        }

        .home-hero h1 { font-size: 2.25rem; font-weight:700; margin-bottom:0.25rem }
        .home-hero p { opacity: 0.95; margin-bottom: 0; }

        .resource-card { border-radius: 10px; transition: transform .15s ease, box-shadow .15s ease; }
        .resource-card:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(16,24,40,0.12); }

        .tab-pill { border-radius: 999px; padding: .5rem .9rem; color: #fff; margin-right:.5rem; }
        .tab-pill:hover { opacity: .95; text-decoration: none; }
        .tab-programs { background: #6366f1; }
        .tab-facilities { background: #06b6d4; }
        .tab-projects { background: #f59e0b; }
        .tab-services { background: #ef4444; }
        .tab-participants { background: #8b5cf6; }
        .tab-outcomes { background: #10b981; }
    </style>

    <div class="home-hero">
        <div class="d-flex justify-content-between align-items-start flex-column flex-md-row">
            <div>
                <h1>Welcome to the Program & Facility Center</h1>
                <p>Quickly navigate Programs, Facilities, Projects, Services, Participants and Outcomes.</p>
            </div>
            <div class="mt-3 mt-md-0">
                <a href="{{ route('programs.index') }}" class="btn btn-light btn-sm me-2">View Programs</a>
                <a href="{{ route('projects.index') }}" class="btn btn-outline-light btn-sm">View Projects</a>
            </div>
        </div>
    </div>

    {{-- Colored tab-like links for quick navigation --}}
    <div class="mb-4">
        <a class="tab-pill tab-programs" href="{{ route('programs.index') }}">Programs</a>
        <a class="tab-pill tab-facilities" href="{{ route('facilities.index') }}">Facilities</a>
        <a class="tab-pill tab-projects" href="{{ route('projects.index') }}">Projects</a>
        <a class="tab-pill tab-services" href="{{ route('services.index') }}">Services</a>
        <a class="tab-pill tab-participants" href="{{ route('participants.index') }}">Participants</a>
        <a class="tab-pill tab-outcomes" href="{{ route('projects.index') }}">Outcomes</a>
    </div>

    {{-- Grid of resource cards --}}
    <div class="row g-3">
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Programs</h5>
                    <p class="card-text">Manage and review programs, their focus areas and alignments.</p>
                    <a href="{{ route('programs.index') }}" class="btn btn-primary">Open Programs</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Facilities</h5>
                    <p class="card-text">View facilities, equipment, and capabilities available for projects.</p>
                    <a href="{{ route('facilities.index') }}" class="btn btn-info text-white">Open Facilities</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Projects</h5>
                    <p class="card-text">Browse projects and link them to programs and facilities.</p>
                    <a href="{{ route('projects.index') }}" class="btn btn-warning">Open Projects</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Services</h5>
                    <p class="card-text">Explore services that support programs and projects.</p>
                    <a href="{{ route('services.index') }}" class="btn btn-danger">Open Services</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Participants</h5>
                    <p class="card-text">Manage participants, their roles and affiliations.</p>
                    <a href="{{ route('participants.index') }}" class="btn btn-secondary">Open Participants</a>
                </div>
            </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
            <div class="card resource-card h-100">
                <div class="card-body">
                    <h5 class="card-title">Outcomes</h5>
                    <p class="card-text">Outcomes are scoped to projects — open Projects to view outcomes per project.</p>
                    <a href="{{ route('projects.index') }}" class="btn btn-success">Open Projects</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
