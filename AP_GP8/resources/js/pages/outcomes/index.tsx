import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Target, FileText, Download, Calendar, ArrowLeft } from 'lucide-react';

interface Project {
    project_id: string;
    title: string;
    description?: string;
}

interface Outcome {
    outcome_id: string;
    title: string;
    description?: string;
    outcome_type: string;
    quality_certification?: string;
    commercialization_status?: string;
    artifact_link?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    project: Project & {
        outcomes: Outcome[];
    };
}

export default function OutcomesIndex({ project }: Props) {
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
        {
            title: 'Outcomes',
            href: `/projects/${project.project_id}/outcomes`,
        },
    ];

    const handleDelete = (outcome: Outcome) => {
        if (confirm(`Are you sure you want to delete "${outcome.title}"? This action cannot be undone.`)) {
            router.delete(`/projects/${project.project_id}/outcomes/${outcome.outcome_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete outcome. Please try again.');
                }
            });
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'CAD':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'PCB':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            case 'Prototype':
                return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
            case 'Report':
                return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
            case 'Business Plan':
                return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Demoed':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'Market Linked':
                return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'Launched':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Outcomes - ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/projects/${project.project_id}`}
                                className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight">Project Outcomes</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Outcomes and deliverables for "{project.title}"
                        </p>
                    </div>
                    <Link
                        href={`/projects/${project.project_id}/outcomes/create`}
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Outcome
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Outcomes</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{project.outcomes.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Launched</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {project.outcomes.filter(o => o.commercialization_status === 'Launched').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Market Linked</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {project.outcomes.filter(o => o.commercialization_status === 'Market Linked').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">With Artifacts</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {project.outcomes.filter(o => o.artifact_link).length}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outcomes Table */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">All Outcomes</h2>
                        {project.outcomes.length === 0 ? (
                            <div className="text-center py-12">
                                <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold">No outcomes found</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Get started by adding your first outcome for this project.
                                </p>
                                <Link
                                    href={`/projects/${project.project_id}/outcomes/create`}
                                    className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Outcome
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Type</th>
                                            <th className="text-left py-3 px-4 font-medium">Status</th>
                                            <th className="text-left py-3 px-4 font-medium">Certification</th>
                                            <th className="text-left py-3 px-4 font-medium">Artifact</th>
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
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(outcome.outcome_type)}`}>
                                                        {outcome.outcome_type}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {outcome.commercialization_status ? (
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(outcome.commercialization_status)}`}>
                                                            {outcome.commercialization_status}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {outcome.quality_certification ? (
                                                        <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                            {outcome.quality_certification}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    {outcome.artifact_link ? (
                                                        <Link
                                                            href={`/projects/${project.project_id}/outcomes/${outcome.outcome_id}/download`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted relative z-10"
                                                        >
                                                            <Download className="h-4 w-4" />
                                                        </Link>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(outcome.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/projects/${project.project_id}/outcomes/${outcome.outcome_id}/edit`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted relative z-10"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted relative z-10"
                                                            onClick={() => handleDelete(outcome)}
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
