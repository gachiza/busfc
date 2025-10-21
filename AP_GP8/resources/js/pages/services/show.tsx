import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft, Building, Wrench } from 'lucide-react';

interface Facility {
    facility_id: string;
    name: string;
    location: string;
}

interface Service {
    service_id: string;
    name: string;
    description?: string;
    category: string;
    skill_type: string;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

interface Props {
    service: Service;
}

export default function ServiceShow({ service }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Services',
            href: '/services',
        },
        {
            title: service.name,
            href: `/services/${service.service_id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Service: ${service.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{service.name}</h1>
                            <p className="text-muted-foreground">
                                Service details and information
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/services/${service.service_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Service
                        </Link>
                    </div>
                </div>

                {/* Service Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Service Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="mt-1 text-sm">{service.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Category</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                        {service.category}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Skill Type</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        {service.skill_type}
                                    </span>
                                </p>
                            </div>
                            {service.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1 text-sm">{service.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Facility Association */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Service Provider</h2>
                        {service.facility ? (
                            <div className="flex items-center space-x-3">
                                <Building className="h-8 w-8 text-primary" />
                                <div>
                                    <Link
                                        href={`/facilities/${service.facility.facility_id}`}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        {service.facility.name}
                                    </Link>
                                    <p className="text-sm text-muted-foreground">{service.facility.location}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <Building className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No facility assigned</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    This service is not currently associated with a facility.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Service Type</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-lg font-semibold">{service.category}</div>
                            <div className="text-sm text-muted-foreground">{service.skill_type}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Created</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(service.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Last Updated</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(service.updated_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Service Categories Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Service Categories</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Machining</h3>
                                <p className="text-sm text-muted-foreground">
                                    Physical manufacturing and machining services including CNC, 3D printing, and fabrication.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Testing</h3>
                                <p className="text-sm text-muted-foreground">
                                    Quality assurance, validation, and testing services for prototypes and products.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Training</h3>
                                <p className="text-sm text-muted-foreground">
                                    Educational and skill development services for participants and collaborators.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skill Types Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Skill Types</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Hardware</h3>
                                <p className="text-sm text-muted-foreground">
                                    Physical components, electronics, mechanical systems, and hardware development.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Software</h3>
                                <p className="text-sm text-muted-foreground">
                                    Programming, software development, applications, and digital solutions.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Integration</h3>
                                <p className="text-sm text-muted-foreground">
                                    System integration, IoT connectivity, and hardware-software integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
