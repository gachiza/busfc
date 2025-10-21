import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Program {
    program_id: string;
    name: string;
}

interface Facility {
    facility_id: string;
    name: string;
    location?: string;
}

interface Props {
    programs: Program[];
    facilities: Facility[];
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
    {
        title: 'Create Project',
        href: '/projects/create',
    },
];

export default function ProjectsCreate({ programs, facilities }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        program_id: '',
        facility: '',
        title: '',
        nature_of_project: '',
        description: '',
        innovation_focus: '',
        prototype_stage: '',
        testing_requirements: '',
        commercialization_plan: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/projects');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Create Project</h1>
                        <p className="text-muted-foreground">
                            Add a new innovation project to your portfolio
                        </p>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Projects
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Title */}
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Project Title *
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter project title"
                                />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>

                            {/* Nature of Project */}
                            <div className="space-y-2">
                                <label htmlFor="nature_of_project" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Nature of Project *
                                </label>
                                <input
                                    id="nature_of_project"
                                    type="text"
                                    value={data.nature_of_project}
                                    onChange={(e) => setData('nature_of_project', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter nature of project"
                                />
                                {errors.nature_of_project && <p className="text-sm text-destructive">{errors.nature_of_project}</p>}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Program */}
                            <div className="space-y-2">
                                <label htmlFor="program_id" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Program *
                                </label>
                                <select
                                    id="program_id"
                                    value={data.program_id}
                                    onChange={(e) => setData('program_id', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a program</option>
                                    {programs.map((program) => (
                                        <option key={program.program_id} value={program.program_id}>
                                            {program.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.program_id && <p className="text-sm text-destructive">{errors.program_id}</p>}
                            </div>

                            {/* Facility */}
                            <div className="space-y-2">
                                <label htmlFor="facility" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Facility
                                </label>
                                <select
                                    id="facility"
                                    value={data.facility}
                                    onChange={(e) => setData('facility', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select a facility (optional)</option>
                                    {facilities.map((facility) => (
                                        <option key={facility.facility_id} value={facility.facility_id}>
                                            {facility.name} {facility.location && `- ${facility.location}`}
                                        </option>
                                    ))}
                                </select>
                                {errors.facility && <p className="text-sm text-destructive">{errors.facility}</p>}
                            </div>
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
                                rows={4}
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter project description"
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Innovation Focus */}
                            <div className="space-y-2">
                                <label htmlFor="innovation_focus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Innovation Focus
                                </label>
                                <input
                                    id="innovation_focus"
                                    type="text"
                                    value={data.innovation_focus}
                                    onChange={(e) => setData('innovation_focus', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter innovation focus"
                                />
                                {errors.innovation_focus && <p className="text-sm text-destructive">{errors.innovation_focus}</p>}
                            </div>

                            {/* Prototype Stage */}
                            <div className="space-y-2">
                                <label htmlFor="prototype_stage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Prototype Stage
                                </label>
                                <input
                                    id="prototype_stage"
                                    type="text"
                                    value={data.prototype_stage}
                                    onChange={(e) => setData('prototype_stage', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter prototype stage"
                                />
                                {errors.prototype_stage && <p className="text-sm text-destructive">{errors.prototype_stage}</p>}
                            </div>
                        </div>

                        {/* Testing Requirements */}
                        <div className="space-y-2">
                            <label htmlFor="testing_requirements" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Testing Requirements
                            </label>
                            <textarea
                                id="testing_requirements"
                                value={data.testing_requirements}
                                onChange={(e) => setData('testing_requirements', e.target.value)}
                                rows={3}
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter testing requirements"
                            />
                            {errors.testing_requirements && <p className="text-sm text-destructive">{errors.testing_requirements}</p>}
                        </div>

                        {/* Commercialization Plan */}
                        <div className="space-y-2">
                            <label htmlFor="commercialization_plan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Commercialization Plan
                            </label>
                            <textarea
                                id="commercialization_plan"
                                value={data.commercialization_plan}
                                onChange={(e) => setData('commercialization_plan', e.target.value)}
                                rows={3}
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter commercialization plan"
                            />
                            {errors.commercialization_plan && <p className="text-sm text-destructive">{errors.commercialization_plan}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href="/projects"
                                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Creating...' : 'Create Project'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
