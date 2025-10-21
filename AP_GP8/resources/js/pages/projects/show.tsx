import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft, Building, Lightbulb } from 'lucide-react';

interface Program {
    program_id: string;
    name: string;
}

interface Facility {
    facility_id: string;
    name: string;
    location: string;
}

interface Participant {
    participant_id: string;
    full_name: string;
    email: string;
    affiliation: string;
    specialization: string;
}

interface Outcome {
    outcome_id: string;
    title: string;
    description?: string;
    outcome_type: string;
    created_at: string;
}

interface Project {
    project_id: string;
    project_code: string;
    title: string;
    nature_of_project: string;
    description?: string;
    innovation_focus?: string;
    prototype_stage?: string;
    testing_requirements?: string;
    commercialization_plan?: string;
    program?: Program;
    facility?: Facility;
    participants: Participant[];
    outcomes: Outcome[];
    created_at: string;
    updated_at: string;
}

interface Props {
    project: Project;
}

export default function ProjectShow({ project }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Projects',
            href: '/projects',
        },
        {
            title: project.title,
            href: `/projects/${project.project_id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Project: ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/projects"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{project.title}</h1>
                            <p className="text-muted-foreground">
                                Project details and associated information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/projects/${project.project_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Project
                        </Link>
                    </div>
                </div>

                {/* Project Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Project Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Title</label>
                                <p className="mt-1 text-sm">{project.title}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Project Code</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                        {project.project_code}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Nature of Project</label>
                                <p className="mt-1 text-sm">{project.nature_of_project}</p>
                            </div>
                            {project.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1 text-sm">{project.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Innovation Details */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Innovation Details</h2>
                        <div className="space-y-4">
                            {project.innovation_focus && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Innovation Focus</label>
                                    <p className="mt-1 text-sm">{project.innovation_focus}</p>
                                </div>
                            )}
                            {project.prototype_stage && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Prototype Stage</label>
                                    <p className="mt-1">
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                            {project.prototype_stage}
                                        </span>
                                    </p>
                                </div>
                            )}
                            {project.testing_requirements && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Testing Requirements</label>
                                    <p className="mt-1 text-sm">{project.testing_requirements}</p>
                                </div>
                            )}
                            {project.commercialization_plan && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Commercialization Plan</label>
                                    <p className="mt-1 text-sm">{project.commercialization_plan}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Associations */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Program Association */}
                    {project.program && (
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Associated Program</h2>
                            <div className="flex items-center space-x-3">
                                <Target className="h-8 w-8 text-primary" />
                                <div>
                                    <Link
                                        href={`/programs/${project.program.program_id}`}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        {project.program.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Facility Association */}
                    {project.facility && (
                        <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">Host Facility</h2>
                            <div className="flex items-center space-x-3">
                                <Building className="h-8 w-8 text-primary" />
                                <div>
                                    <Link
                                        href={`/facilities/${project.facility.facility_id}`}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        {project.facility.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">{project.facility.location}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Participants</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{project.participants.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Outcomes</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{project.outcomes.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Created</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(project.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Participants */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Project Participants</h2>
                            <Link
                                href={`/participants/create?project_id=${project.project_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Participant
                            </Link>
                        </div>
                        {project.participants.length === 0 ? (
                            <div className="text-center py-8">
                                <Users className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No participants yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by adding participants to this project.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 font-medium">Email</th>
                                            <th className="text-left py-3 px-4 font-medium">Affiliation</th>
                                            <th className="text-left py-3 px-4 font-medium">Specialization</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {project.participants.map((participant) => (
                                            <tr key={participant.participant_id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium">{participant.full_name}</div>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {participant.email}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{participant.affiliation}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{participant.specialization}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/participants/${participant.participant_id}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            View
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Outcomes */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Project Outcomes</h2>
                            <Link
                                href={`/outcomes/create?project_id=${project.project_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Outcome
                            </Link>
                        </div>
                        {project.outcomes.length === 0 ? (
                            <div className="text-center py-8">
                                <Lightbulb className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No outcomes yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Document outcomes and results from this project.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Type</th>
                                            <th className="text-left py-3 px-4 font-medium">Created</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {project.outcomes.map((outcome) => (
                                            <tr key={outcome.outcome_id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <div className="font-medium">{outcome.title}</div>
                                                        {outcome.description && (
                                                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                                {outcome.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{outcome.outcome_type}</span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(outcome.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/outcomes/${outcome.outcome_id}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            View
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
