import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Program {
    program_id: string;
    name: string;
    description?: string;
    national_alignment?: string;
    focus_areas?: string;
    phases?: string;
}

interface Props {
    program: Program;
}

export default function ProgramEdit({ program }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: program.name || '',
        description: program.description || '',
        national_alignment: program.national_alignment || '',
        focus_areas: program.focus_areas || '',
        phases: program.phases || '',
    });

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
        {
            title: 'Edit',
            href: `/programs/${program.program_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/programs/${program.program_id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Program: ${program.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/programs/${program.program_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Program</h1>
                            <p className="text-muted-foreground">
                                Update program information and settings
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
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Program Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter program name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phases" className="text-sm font-medium">
                                        Current Phase
                                    </label>
                                    <select
                                        id="phases"
                                        value={data.phases}
                                        onChange={(e) => setData('phases', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="">Select phase</option>
                                        <option value="Planning">Planning</option>
                                        <option value="Implementation">Implementation</option>
                                        <option value="Execution">Execution</option>
                                        <option value="Monitoring">Monitoring</option>
                                        <option value="Evaluation">Evaluation</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                    {errors.phases && (
                                        <p className="text-sm text-destructive">{errors.phases}</p>
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
                                    placeholder="Describe the program objectives and goals"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Strategic Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Strategic Information</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="national_alignment" className="text-sm font-medium">
                                    National Alignment
                                </label>
                                <textarea
                                    id="national_alignment"
                                    value={data.national_alignment}
                                    onChange={(e) => setData('national_alignment', e.target.value)}
                                    rows={3}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="How does this program align with national priorities?"
                                />
                                {errors.national_alignment && (
                                    <p className="text-sm text-destructive">{errors.national_alignment}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="focus_areas" className="text-sm font-medium">
                                    Focus Areas
                                </label>
                                <input
                                    id="focus_areas"
                                    type="text"
                                    value={data.focus_areas}
                                    onChange={(e) => setData('focus_areas', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter focus areas separated by commas (e.g., AI, Robotics, IoT)"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Separate multiple focus areas with commas
                                </p>
                                {errors.focus_areas && (
                                    <p className="text-sm text-destructive">{errors.focus_areas}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href={`/programs/${program.program_id}`}
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
