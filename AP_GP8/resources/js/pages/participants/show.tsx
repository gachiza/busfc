import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft, Building, User, Mail, GraduationCap } from 'lucide-react';

interface Project {
    project_id: string;
    title: string;
    nature_of_project: string;
    description?: string;
    created_at: string;
}

interface Participant {
    participant_id: string;
    full_name: string;
    email: string;
    affiliation: string;
    specialization: string;
    participant_type: string;
    cross_skill_trained: boolean;
    institution: string;
    projects: Project[];
    created_at: string;
    updated_at: string;
}

interface Props {
    participant: Participant;
}

export default function ParticipantShow({ participant }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Participants',
            href: '/participants',
        },
        {
            title: participant.full_name,
            href: `/participants/${participant.participant_id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Participant: ${participant.full_name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/participants"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{participant.full_name}</h1>
                            <p className="text-muted-foreground">
                                Participant profile and project involvement
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/participants/${participant.participant_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Participant
                        </Link>
                    </div>
                </div>

                {/* Participant Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Personal Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                                <p className="mt-1 text-sm">{participant.full_name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="mt-1 text-sm">
                                    <a href={`mailto:${participant.email}`} className="text-primary hover:underline">
                                        {participant.email}
                                    </a>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Participant Type</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                        {participant.participant_type}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Cross-Skill Trained</label>
                                <p className="mt-1">
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                        participant.cross_skill_trained 
                                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300'
                                            : 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300'
                                    }`}>
                                        {participant.cross_skill_trained ? 'Yes' : 'No'}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Academic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Academic Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Institution</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                        {participant.institution}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Affiliation</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        {participant.affiliation}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Specialization</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                                        {participant.specialization}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Active Projects</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{participant.projects.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Joined</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(participant.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Last Updated</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(participant.updated_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Project Involvement */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Project Involvement</h2>
                            <Link
                                href={`/projects/create?participant_id=${participant.participant_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add to Project
                            </Link>
                        </div>
                        {participant.projects.length === 0 ? (
                            <div className="text-center py-8">
                                <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No projects yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    This participant is not currently involved in any projects.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Project Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Nature</th>
                                            <th className="text-left py-3 px-4 font-medium">Created</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {participant.projects.map((project) => (
                                            <tr key={project.project_id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <div className="font-medium">{project.title}</div>
                                                        {project.description && (
                                                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                                {project.description}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{project.nature_of_project}</span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(project.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/projects/${project.project_id}`}
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

                {/* Participant Categories Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Participant Categories</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Student</h3>
                                <p className="text-sm text-muted-foreground">
                                    Undergraduate and graduate students participating in research and development projects.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Lecturer</h3>
                                <p className="text-sm text-muted-foreground">
                                    Academic staff and faculty members leading and supervising projects.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Collaborator</h3>
                                <p className="text-sm text-muted-foreground">
                                    External partners, industry professionals, and research collaborators.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specializations Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Specialization Areas</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Software</h3>
                                <p className="text-sm text-muted-foreground">
                                    Programming, software development, applications, and digital solutions expertise.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Hardware</h3>
                                <p className="text-sm text-muted-foreground">
                                    Electronics, mechanical systems, circuit design, and physical component expertise.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Business</h3>
                                <p className="text-sm text-muted-foreground">
                                    Commercialization, market analysis, business development, and entrepreneurship.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
