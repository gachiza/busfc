import AppLayout from '@/layouts/app-layout';
import { EntityActions } from '@/components/entity-actions';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, FolderOpen, Target, Users } from 'lucide-react';

interface Program {
    program_id: string;
    name: string;
    description?: string;
    national_alignment?: string;
    focus_areas?: string;
    phases?: string;
    projects_count: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    programs: Program[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Programs',
        href: '/programs',
    },
];

export default function ProgramsIndex({ programs }: Props) {
    const handleDelete = (program: Program) => {
        if (confirm(`Are you sure you want to delete "${program.name}"? This action cannot be undone.`)) {
            router.delete(`/programs/${program.program_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete program. Please try again.');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Programs" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Programs</h1>
                        <p className="text-muted-foreground">
                            Manage and organize your innovation programs
                        </p>
                    </div>
                    <Link
                        href="/programs/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Program
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Programs</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{programs.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Projects</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {programs.reduce((sum, program) => sum + program.projects_count, 0)}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Avg Projects/Program</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {programs.length > 0 
                                    ? Math.round(programs.reduce((sum, program) => sum + program.projects_count, 0) / programs.length)
                                    : 0
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* Programs Grid */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">All Programs</h2>
                    {programs.length === 0 ? (
                        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                            <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No programs found</h3>
                            <p className="mt-2 text-muted-foreground">
                                Get started by creating your first program.
                            </p>
                            <Link
                                href="/programs/create"
                                className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Create Program
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {programs.map((program) => (
                                <div
                                    key={program.program_id}
                                    className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">{program.name}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Target className="h-3 w-3" />
                                                    <span>{program.projects_count} projects</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 relative z-10">
                                                <Link
                                                    href={`/programs/${program.program_id}`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/programs/${program.program_id}/edit`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                    onClick={() => handleDelete(program)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {program.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {program.description}
                                            </p>
                                        )}

                                        {/* Focus Areas */}
                                        {program.focus_areas && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Focus Areas
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {program.focus_areas.split(',').slice(0, 3).map((area, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                                        >
                                                            {area.trim()}
                                                        </span>
                                                    ))}
                                                    {program.focus_areas.split(',').length > 3 && (
                                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                            +{program.focus_areas.split(',').length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Phases */}
                                        {program.phases && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Current Phase
                                                </h4>
                                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                    {program.phases}
                                                </span>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                Created {new Date(program.created_at).toLocaleDateString()}
                                            </span>
                                            <Link
                                                href={`/programs/${program.program_id}/projects`}
                                                className="text-xs text-primary hover:underline"
                                            >
                                                View Projects →
                                            </Link>
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
