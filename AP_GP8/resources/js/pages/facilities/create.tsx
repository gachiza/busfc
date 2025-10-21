import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { FormEventHandler } from 'react';

interface Props {
    types: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Facilities',
        href: '/facilities',
    },
    {
        title: 'Create Facility',
        href: '/facilities/create',
    },
];

export default function FacilitiesCreate({ types }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        location: '',
        description: '',
        partner_organization: '',
        facility_type: '',
        capabilities: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/facilities');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Facility" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Create Facility</h1>
                        <p className="text-muted-foreground">
                            Add a new facility to your innovation ecosystem
                        </p>
                    </div>
                    <Link
                        href="/facilities"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Facilities
                    </Link>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <form onSubmit={submit} className="p-6 space-y-6">
                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Name */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Facility Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter facility name"
                                />
                                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                            </div>

                            {/* Location */}
                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Location *
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter facility location"
                                />
                                {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">
                            {/* Facility Type */}
                            <div className="space-y-2">
                                <label htmlFor="facility_type" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Facility Type *
                                </label>
                                <select
                                    id="facility_type"
                                    value={data.facility_type}
                                    onChange={(e) => setData('facility_type', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="">Select facility type</option>
                                    {types.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.facility_type && <p className="text-sm text-destructive">{errors.facility_type}</p>}
                            </div>

                            {/* Partner Organization */}
                            <div className="space-y-2">
                                <label htmlFor="partner_organization" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Partner Organization
                                </label>
                                <input
                                    id="partner_organization"
                                    type="text"
                                    value={data.partner_organization}
                                    onChange={(e) => setData('partner_organization', e.target.value)}
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter partner organization (optional)"
                                />
                                {errors.partner_organization && <p className="text-sm text-destructive">{errors.partner_organization}</p>}
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
                                placeholder="Enter facility description"
                            />
                            {errors.description && <p className="text-sm text-destructive">{errors.description}</p>}
                        </div>

                        {/* Capabilities */}
                        <div className="space-y-2">
                            <label htmlFor="capabilities" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Capabilities
                            </label>
                            <textarea
                                id="capabilities"
                                value={data.capabilities}
                                onChange={(e) => setData('capabilities', e.target.value)}
                                rows={3}
                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Enter facility capabilities (comma-separated)"
                            />
                            {errors.capabilities && <p className="text-sm text-destructive">{errors.capabilities}</p>}
                            <p className="text-xs text-muted-foreground">
                                List the key capabilities and services this facility provides, separated by commas.
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href="/facilities"
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
                                {processing ? 'Creating...' : 'Create Facility'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
