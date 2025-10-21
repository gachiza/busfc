import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Users, Mail, Phone, Building2 } from 'lucide-react';

interface Project {
    project_id: string;
    title: string;
}

interface Participant {
    participant_id: string;
    name: string;
    email: string;
    phone?: string;
    organization?: string;
    participant_type: string;
    expertise?: string;
    role?: string;
    projects?: Project[];
    created_at: string;
    updated_at: string;
}

interface Props {
    participants: Participant[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Participants',
        href: '/participants',
    },
];

export default function ParticipantsIndex({ participants }: Props) {
    const handleDelete = (participant: Participant) => {
        if (confirm(`Are you sure you want to delete "${participant.name}"? This action cannot be undone.`)) {
            router.delete(`/participants/${participant.participant_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete participant. Please try again.');
                }
            });
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Researcher':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'Student':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            case 'Industry Partner':
                return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
            case 'Mentor':
                return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
            case 'Entrepreneur':
                return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Participants" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Participants</h1>
                        <p className="text-muted-foreground">
                            Manage your innovation program participants
                        </p>
                    </div>
                    <Link
                        href="/participants/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Participant
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Participants</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{participants.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Researchers</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {participants.filter(p => p.participant_type === 'Researcher').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Students</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {participants.filter(p => p.participant_type === 'Student').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Organizations</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {new Set(participants.map(p => p.organization).filter(Boolean)).size}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Participants Grid */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">All Participants</h2>
                    {participants.length === 0 ? (
                        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                            <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No participants found</h3>
                            <p className="mt-2 text-muted-foreground">
                                Get started by adding your first participant.
                            </p>
                            <Link
                                href="/participants/create"
                                className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Participant
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {participants.map((participant) => (
                                <div
                                    key={participant.participant_id}
                                    className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">{participant.name}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Mail className="h-3 w-3" />
                                                    <span>{participant.email}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 relative z-10">
                                                <Link
                                                    href={`/participants/${participant.participant_id}`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/participants/${participant.participant_id}/edit`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                    onClick={() => handleDelete(participant)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="space-y-2">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(participant.participant_type)}`}>
                                                {participant.participant_type}
                                            </span>
                                        </div>

                                        {/* Contact Info */}
                                        <div className="space-y-2">
                                            {participant.phone && (
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Phone className="h-3 w-3" />
                                                    <span>{participant.phone}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Organization */}
                                        {participant.organization && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Organization
                                                </h4>
                                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                                                    {participant.organization}
                                                </span>
                                            </div>
                                        )}

                                        {/* Role */}
                                        {participant.role && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Role
                                                </h4>
                                                <span className="text-sm">{participant.role}</span>
                                            </div>
                                        )}

                                        {/* Expertise */}
                                        {participant.expertise && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Expertise
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {participant.expertise.split(',').slice(0, 3).map((skill, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-900/20 dark:text-gray-300"
                                                        >
                                                            {skill.trim()}
                                                        </span>
                                                    ))}
                                                    {participant.expertise.split(',').length > 3 && (
                                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                            +{participant.expertise.split(',').length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Projects */}
                                        {participant.projects && participant.projects.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Projects ({participant.projects.length})
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {participant.projects.slice(0, 2).map((project) => (
                                                        <span
                                                            key={project.project_id}
                                                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                                        >
                                                            {project.title}
                                                        </span>
                                                    ))}
                                                    {participant.projects.length > 2 && (
                                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                            +{participant.projects.length - 2} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                Added {new Date(participant.created_at).toLocaleDateString()}
                                            </span>
                                            {participant.projects && participant.projects.length > 0 && (
                                                <Link
                                                    href={`/participants/${participant.participant_id}/projects`}
                                                    className="text-xs text-primary hover:underline"
                                                >
                                                    View Projects →
                                                </Link>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover effect overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
