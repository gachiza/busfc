import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Project {
    project_id: string;
    title: string;
    description?: string;
}

interface Props {
    project: Project;
    types: string[];
    statuses: string[];
}

export default function OutcomesCreate({ project, types, statuses }: Props) {
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
        {
            title: 'Create',
            href: `/projects/${project.project_id}/outcomes/create`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        outcome_type: '',
        quality_certification: '',
        commercialization_status: '',
        artifact: null as File | null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(`/projects/${project.project_id}/outcomes`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Create Outcome - ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <Link
                                href={`/projects/${project.project_id}/outcomes`}
                                className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                            <h1 className="text-2xl font-bold tracking-tight">Create Outcome</h1>
                        </div>
                        <p className="text-muted-foreground">
                            Add a new outcome for "{project.title}"
                        </p>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Title */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Title *
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter outcome title"
                                    required
                                />
                                {errors.title && (
                                    <p className="text-sm text-destructive">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe the outcome"
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>

                            {/* Outcome Type */}
                            <div className="space-y-2">
                                <label htmlFor="outcome_type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Outcome Type *
                                </label>
                                <select
                                    id="outcome_type"
                                    value={data.outcome_type}
                                    onChange={(e) => setData('outcome_type', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select outcome type</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.outcome_type && (
                                    <p className="text-sm text-destructive">{errors.outcome_type}</p>
                                )}
                            </div>

                            {/* Quality Certification */}
                            <div className="space-y-2">
                                <label htmlFor="quality_certification" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Quality Certification
                                </label>
                                <input
                                    id="quality_certification"
                                    type="text"
                                    value={data.quality_certification}
                                    onChange={(e) => setData('quality_certification', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="e.g., ISO 9001, CE Marking"
                                />
                                {errors.quality_certification && (
                                    <p className="text-sm text-destructive">{errors.quality_certification}</p>
                                )}
                            </div>

                            {/* Commercialization Status */}
                            <div className="space-y-2">
                                <label htmlFor="commercialization_status" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Commercialization Status
                                </label>
                                <select
                                    id="commercialization_status"
                                    value={data.commercialization_status}
                                    onChange={(e) => setData('commercialization_status', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select status</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                                {errors.commercialization_status && (
                                    <p className="text-sm text-destructive">{errors.commercialization_status}</p>
                                )}
                            </div>

                            {/* Artifact Upload */}
                            <div className="space-y-2">
                                <label htmlFor="artifact" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Artifact File
                                </label>
                                <div className="flex items-center gap-4">
                                    <input
                                        id="artifact"
                                        type="file"
                                        onChange={(e) => setData('artifact', e.target.files?.[0] || null)}
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.dwg,.step,.stl,.gerber"
                                    />
                                    <Upload className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Upload CAD files, PCB designs, prototypes, reports, or business plans (max 20MB)
                                </p>
                                {errors.artifact && (
                                    <p className="text-sm text-destructive">{errors.artifact}</p>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-end space-x-4 pt-4">
                                <Link
                                    href={`/projects/${project.project_id}/outcomes`}
                                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    {processing ? 'Creating...' : 'Create Outcome'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
