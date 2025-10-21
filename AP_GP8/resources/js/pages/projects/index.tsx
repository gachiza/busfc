import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Building2, FolderOpen, Target } from 'lucide-react';

interface Program {
    program_id: string;
    name: string;
    description?: string;
}

interface Facility {
    facility_id: string;
    name: string;
    location?: string;
}

interface Project {
    project_id: string;
    title: string;
    nature_of_project: string;
    description?: string;
    innovation_focus?: string;
    prototype_stage?: string;
    testing_requirements?: string;
    commercialization_plan?: string;
    program?: Program;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

interface Props {
    projects: Project[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Projects',
        href: '/projects',
    },
];

export default function ProjectsIndex({ projects }: Props) {
    const handleDelete = (project: Project) => {
        if (confirm(`Are you sure you want to delete "${project.title}"? This action cannot be undone.`)) {
            router.delete(`/projects/${project.project_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete project. Please try again.');
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground">
                            Manage and track your innovation projects
                        </p>
                    </div>
                    <Link
                        href="/projects/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Project
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <FolderOpen className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Projects</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{projects.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Active Programs</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {new Set(projects.map(p => p.program?.program_id).filter(Boolean)).size}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Facilities Used</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {new Set(projects.map(p => p.facility?.facility_id).filter(Boolean)).size}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">This Month</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {projects.filter(p => {
                                    const created = new Date(p.created_at);
                                    const now = new Date();
                                    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                                }).length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">All Projects</h2>
                        {projects.length === 0 ? (
                            <div className="text-center py-12">
                                <FolderOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Get started by creating your first project.
                                </p>
                                <Link
                                    href="/projects/create"
                                    className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Project
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Program</th>
                                            <th className="text-left py-3 px-4 font-medium">Facility</th>
                                            <th className="text-left py-3 px-4 font-medium">Nature</th>
                                            <th className="text-left py-3 px-4 font-medium">Stage</th>
                                            <th className="text-left py-3 px-4 font-medium">Created</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map((project) => (
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
                                                    {project.program ? (
                                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                                            {project.program.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {project.facility ? (
                                                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                                            {project.facility.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{project.nature_of_project}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {project.prototype_stage ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                            {project.prototype_stage}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(project.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2 relative z-10">
                                                        <Link
                                                            href={`/projects/${project.project_id}`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/projects/${project.project_id}/edit`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                            onClick={() => handleDelete(project)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
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
