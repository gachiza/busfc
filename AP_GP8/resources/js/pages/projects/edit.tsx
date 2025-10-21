import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Program {
    program_id: string;
    name: string;
}

interface Facility {
    facility_id: string;
    name: string;
    location: string;
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
    program_id?: string;
    facility_id?: string;
}

interface Props {
    project: Project;
    programs: Program[];
    facilities: Facility[];
}

export default function ProjectEdit({ project, programs, facilities }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        nature_of_project: project.nature_of_project || '',
        description: project.description || '',
        innovation_focus: project.innovation_focus || '',
        prototype_stage: project.prototype_stage || '',
        testing_requirements: project.testing_requirements || '',
        commercialization_plan: project.commercialization_plan || '',
        program_id: project.program_id || '',
        facility_id: project.facility_id || '',
    });

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
            title: 'Edit',
            href: `/projects/${project.project_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/projects/${project.project_id}`);
    };

    const prototypeStages = [
        'Concept',
        'Design',
        'Development',
        'Testing',
        'Validation',
        'Production Ready'
    ];

    const projectNatures = [
        'Research',
        'Development',
        'Innovation',
        'Commercialization',
        'Training',
        'Collaboration'
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Project: ${project.title}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/projects/${project.project_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Project</h1>
                            <p className="text-muted-foreground">
                                Update project information and settings
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Basic Information</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="title" className="text-sm font-medium">
                                        Project Title *
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter project title"
                                        required
                                    />
                                    {errors.title && (
                                        <p className="text-sm text-destructive">{errors.title}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="nature_of_project" className="text-sm font-medium">
                                        Nature of Project *
                                    </label>
                                    <select
                                        id="nature_of_project"
                                        value={data.nature_of_project}
                                        onChange={(e) => setData('nature_of_project', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select nature</option>
                                        {projectNatures.map((nature) => (
                                            <option key={nature} value={nature}>
                                                {nature}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.nature_of_project && (
                                        <p className="text-sm text-destructive">{errors.nature_of_project}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe the project objectives and goals"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Associations */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Associations</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="program_id" className="text-sm font-medium">
                                        Associated Program
                                    </label>
                                    <select
                                        id="program_id"
                                        value={data.program_id}
                                        onChange={(e) => setData('program_id', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select program</option>
                                        {programs.map((program) => (
                                            <option key={program.program_id} value={program.program_id}>
                                                {program.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.program_id && (
                                        <p className="text-sm text-destructive">{errors.program_id}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="facility_id" className="text-sm font-medium">
                                        Host Facility
                                    </label>
                                    <select
                                        id="facility_id"
                                        value={data.facility_id}
                                        onChange={(e) => setData('facility_id', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select facility</option>
                                        {facilities.map((facility) => (
                                            <option key={facility.facility_id} value={facility.facility_id}>
                                                {facility.name} - {facility.location}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.facility_id && (
                                        <p className="text-sm text-destructive">{errors.facility_id}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Innovation Details */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Innovation Details</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="innovation_focus" className="text-sm font-medium">
                                        Innovation Focus
                                    </label>
                                    <input
                                        id="innovation_focus"
                                        type="text"
                                        value={data.innovation_focus}
                                        onChange={(e) => setData('innovation_focus', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="e.g., AI, IoT, Robotics"
                                    />
                                    {errors.innovation_focus && (
                                        <p className="text-sm text-destructive">{errors.innovation_focus}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="prototype_stage" className="text-sm font-medium">
                                        Prototype Stage
                                    </label>
                                    <select
                                        id="prototype_stage"
                                        value={data.prototype_stage}
                                        onChange={(e) => setData('prototype_stage', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select stage</option>
                                        {prototypeStages.map((stage) => (
                                            <option key={stage} value={stage}>
                                                {stage}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.prototype_stage && (
                                        <p className="text-sm text-destructive">{errors.prototype_stage}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="testing_requirements" className="text-sm font-medium">
                                    Testing Requirements
                                </label>
                                <textarea
                                    id="testing_requirements"
                                    value={data.testing_requirements}
                                    onChange={(e) => setData('testing_requirements', e.target.value)}
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe testing requirements and validation needs"
                                />
                                {errors.testing_requirements && (
                                    <p className="text-sm text-destructive">{errors.testing_requirements}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="commercialization_plan" className="text-sm font-medium">
                                    Commercialization Plan
                                </label>
                                <textarea
                                    id="commercialization_plan"
                                    value={data.commercialization_plan}
                                    onChange={(e) => setData('commercialization_plan', e.target.value)}
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Outline the commercialization strategy and market approach"
                                />
                                {errors.commercialization_plan && (
                                    <p className="text-sm text-destructive">{errors.commercialization_plan}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href={`/projects/${project.project_id}`}
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
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
