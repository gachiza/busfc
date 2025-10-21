import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft } from 'lucide-react';

interface Project {
    project_id: string;
    title: string;
    nature_of_project: string;
    description?: string;
    created_at: string;
}

interface Program {
    program_id: string;
    name: string;
    description?: string;
    national_alignment?: string;
    focus_areas?: string;
    phases?: string;
    projects: Project[];
    created_at: string;
    updated_at: string;
}

interface Props {
    program: Program;
}

export default function ProgramShow({ program }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Programs',
            href: '/programs',
        },
        {
            title: program.name,
            href: `/programs/${program.program_id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Program: ${program.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/programs"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{program.name}</h1>
                            <p className="text-muted-foreground">
                                Program details and associated projects
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/programs/${program.program_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Program
                        </Link>
                    </div>
                </div>

                {/* Program Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Program Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="mt-1 text-sm">{program.name}</p>
                            </div>
                            {program.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1 text-sm">{program.description}</p>
                                </div>
                            )}
                            {program.national_alignment && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">National Alignment</label>
                                    <p className="mt-1 text-sm">{program.national_alignment}</p>
                                </div>
                            )}
                            {program.phases && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Current Phase</label>
                                    <p className="mt-1">
                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                            {program.phases}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Focus Areas</h2>
                        {program.focus_areas ? (
                            <div className="flex flex-wrap gap-2">
                                {program.focus_areas.split(',').map((area, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                                    >
                                        {area.trim()}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No focus areas specified</p>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Projects</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{program.projects.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Created</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(program.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Last Updated</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(program.updated_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Associated Projects */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Associated Projects</h2>
                            <Link
                                href={`/projects/create?program_id=${program.program_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Project
                            </Link>
                        </div>
                        {program.projects.length === 0 ? (
                            <div className="text-center py-8">
                                <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No projects yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by creating a project for this program.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Nature</th>
                                            <th className="text-left py-3 px-4 font-medium">Created</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {program.projects.map((project) => (
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
            </div>
        </AppLayout>
    );
}
