import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Building2, MapPin, Users, Wrench } from 'lucide-react';

interface Facility {
    facility_id: string;
    name: string;
    location: string;
    description?: string;
    partner_organization?: string;
    facility_type: string;
    capabilities?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    facilities: Facility[];
    types: string[];
    partners: string[];
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
];

export default function FacilitiesIndex({ facilities, types, partners }: Props) {
    const handleDelete = (facility: Facility) => {
        if (confirm(`Are you sure you want to delete "${facility.name}"? This action cannot be undone.`)) {
            router.delete(`/facilities/${facility.facility_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete facility. Please try again.');
                }
            });
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Lab':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'Workshop':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            case 'Testing Center':
                return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facilities" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Facilities</h1>
                        <p className="text-muted-foreground">
                            Manage your innovation facilities and resources
                        </p>
                    </div>
                    <Link
                        href="/facilities/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Facility
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Facilities</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{facilities.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Labs</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {facilities.filter(f => f.facility_type === 'Lab').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Workshops</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {facilities.filter(f => f.facility_type === 'Workshop').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Partners</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {new Set(facilities.map(f => f.partner_organization).filter(Boolean)).size}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Facilities Grid */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">All Facilities</h2>
                    {facilities.length === 0 ? (
                        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                            <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No facilities found</h3>
                            <p className="mt-2 text-muted-foreground">
                                Get started by adding your first facility.
                            </p>
                            <Link
                                href="/facilities/create"
                                className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Facility
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {facilities.map((facility) => (
                                <div
                                    key={facility.facility_id}
                                    className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">{facility.name}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span>{facility.location}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 relative z-10">
                                                <Link
                                                    href={`/facilities/${facility.facility_id}`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/facilities/${facility.facility_id}/edit`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                    onClick={() => handleDelete(facility)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="space-y-2">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(facility.facility_type)}`}>
                                                {facility.facility_type}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        {facility.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {facility.description}
                                            </p>
                                        )}

                                        {/* Partner Organization */}
                                        {facility.partner_organization && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Partner Organization
                                                </h4>
                                                <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                                                    {facility.partner_organization}
                                                </span>
                                            </div>
                                        )}

                                        {/* Capabilities */}
                                        {facility.capabilities && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Capabilities
                                                </h4>
                                                <div className="flex flex-wrap gap-1">
                                                    {facility.capabilities.split(',').slice(0, 3).map((capability, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-900/20 dark:text-gray-300"
                                                        >
                                                            {capability.trim()}
                                                        </span>
                                                    ))}
                                                    {facility.capabilities.split(',').length > 3 && (
                                                        <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                                                            +{facility.capabilities.split(',').length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                Added {new Date(facility.created_at).toLocaleDateString()}
                                            </span>
                                            <Link
                                                href={`/facilities/${facility.facility_id}/equipment`}
                                                className="text-xs text-primary hover:underline"
                                            >
                                                View Equipment →
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
