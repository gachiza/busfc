import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Facility {
    facility_id: string;
    facility_code: string;
    name: string;
    location: string;
    description?: string;
    partner_organization?: string;
    facility_type: string;
    capabilities?: string;
}

interface Props {
    facility: Facility;
}

export default function FacilityEdit({ facility }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: facility.name || '',
        location: facility.location || '',
        description: facility.description || '',
        partner_organization: facility.partner_organization || '',
        facility_type: facility.facility_type || '',
        capabilities: facility.capabilities || '',
    });

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
            title: facility.name,
            href: `/facilities/${facility.facility_id}`,
        },
        {
            title: 'Edit',
            href: `/facilities/${facility.facility_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/facilities/${facility.facility_id}`);
    };

    const facilityTypes = ['Lab', 'Workshop', 'Testing Center'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Facility: ${facility.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/facilities/${facility.facility_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Facility</h1>
                            <p className="text-muted-foreground">
                                Update facility information and settings
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
                                        Facility Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter facility name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-medium">
                                        Location *
                                    </label>
                                    <input
                                        id="location"
                                        type="text"
                                        value={data.location}
                                        onChange={(e) => setData('location', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter facility location"
                                        required
                                    />
                                    {errors.location && (
                                        <p className="text-sm text-destructive">{errors.location}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="facility_type" className="text-sm font-medium">
                                        Facility Type *
                                    </label>
                                    <select
                                        id="facility_type"
                                        value={data.facility_type}
                                        onChange={(e) => setData('facility_type', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select type</option>
                                        {facilityTypes.map((type) => (
                                            <option key={type} value={type}>
                                                {type}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.facility_type && (
                                        <p className="text-sm text-destructive">{errors.facility_type}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="partner_organization" className="text-sm font-medium">
                                        Partner Organization
                                    </label>
                                    <input
                                        id="partner_organization"
                                        type="text"
                                        value={data.partner_organization}
                                        onChange={(e) => setData('partner_organization', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter partner organization"
                                    />
                                    {errors.partner_organization && (
                                        <p className="text-sm text-destructive">{errors.partner_organization}</p>
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
                                    placeholder="Describe the facility and its purpose"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Capabilities */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Capabilities</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="capabilities" className="text-sm font-medium">
                                    Facility Capabilities
                                </label>
                                <input
                                    id="capabilities"
                                    type="text"
                                    value={data.capabilities}
                                    onChange={(e) => setData('capabilities', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter capabilities separated by commas (e.g., 3D Printing, PCB Design, Testing)"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Separate multiple capabilities with commas
                                </p>
                                {errors.capabilities && (
                                    <p className="text-sm text-destructive">{errors.capabilities}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href={`/facilities/${facility.facility_id}`}
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
