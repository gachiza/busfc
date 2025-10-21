import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft, Building, Wrench, Cog } from 'lucide-react';

interface Project {
    project_id: string;
    title: string;
    nature_of_project: string;
    description?: string;
    created_at: string;
}

interface Service {
    service_id: string;
    name: string;
    description?: string;
    category: string;
    skill_type: string;
}

interface Equipment {
    equipment_id: string;
    name: string;
    capabilities?: string;
    usage_domain: string;
    support_phase: string;
}

interface Facility {
    facility_id: string;
    facility_code: string;
    name: string;
    location: string;
    description?: string;
    partner_organization?: string;
    facility_type: string;
    capabilities?: string;
    projects: Project[];
    services: Service[];
    equipment: Equipment[];
    created_at: string;
    updated_at: string;
}

interface Props {
    facility: Facility;
}

export default function FacilityShow({ facility }: Props) {
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
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Facility: ${facility.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/facilities"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{facility.name}</h1>
                            <p className="text-muted-foreground">
                                Facility details and associated resources
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/facilities/${facility.facility_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Facility
                        </Link>
                    </div>
                </div>

                {/* Facility Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Facility Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="mt-1 text-sm">{facility.name}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Facility Code</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                        {facility.facility_code}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Location</label>
                                <p className="mt-1 text-sm">{facility.location}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Type</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        {facility.facility_type}
                                    </span>
                                </p>
                            </div>
                            {facility.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1 text-sm">{facility.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Partnership & Capabilities */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Partnership & Capabilities</h2>
                        <div className="space-y-4">
                            {facility.partner_organization && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Partner Organization</label>
                                    <p className="mt-1 text-sm">{facility.partner_organization}</p>
                                </div>
                            )}
                            {facility.capabilities ? (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Capabilities</label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {facility.capabilities.split(',').map((capability, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                                            >
                                                {capability.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Capabilities</label>
                                    <p className="mt-1 text-sm text-muted-foreground">No capabilities specified</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Projects</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{facility.projects.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Services</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{facility.services.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Cog className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Equipment</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{facility.equipment.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Created</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(facility.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Hosted Projects */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Hosted Projects</h2>
                            <Link
                                href={`/projects/create?facility_id=${facility.facility_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Project
                            </Link>
                        </div>
                        {facility.projects.length === 0 ? (
                            <div className="text-center py-8">
                                <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No projects yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Get started by hosting a project at this facility.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Title</th>
                                            <th className="text-left py-3 px-4 font-medium">Nature</th>
                                            <th className="text-left py-3 px-4 font-medium">Created</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facility.projects.map((project) => (
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
                                                    <span className="text-sm">{project.nature_of_project}</span>
                                                </td>
                                                <td className="py-3 px-4 text-sm text-muted-foreground">
                                                    {new Date(project.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/projects/${project.project_id}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            View
                                                        </Link>
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

                {/* Services */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Available Services</h2>
                            <Link
                                href={`/services/create?facility_id=${facility.facility_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Service
                            </Link>
                        </div>
                        {facility.services.length === 0 ? (
                            <div className="text-center py-8">
                                <Wrench className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No services yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add services offered by this facility.
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {facility.services.map((service) => (
                                    <div key={service.service_id} className="rounded-lg border p-4">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-medium">{service.name}</h3>
                                                {service.description && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {service.description}
                                                    </p>
                                                )}
                                                <div className="flex gap-2 mt-2">
                                                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                                        {service.category}
                                                    </span>
                                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                        {service.skill_type}
                                                    </span>
                                                </div>
                                            </div>
                                            <Link
                                                href={`/services/${service.service_id}`}
                                                className="text-sm text-primary hover:underline ml-2"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Equipment */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold">Available Equipment</h2>
                            <Link
                                href={`/equipment/create?facility_id=${facility.facility_id}`}
                                className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                Add Equipment
                            </Link>
                        </div>
                        {facility.equipment.length === 0 ? (
                            <div className="text-center py-8">
                                <Cog className="mx-auto h-8 w-8 text-muted-foreground/50" />
                                <h3 className="mt-2 text-sm font-semibold">No equipment yet</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Add equipment available at this facility.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 font-medium">Domain</th>
                                            <th className="text-left py-3 px-4 font-medium">Support Phase</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facility.equipment.map((equipment) => (
                                            <tr key={equipment.equipment_id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <div className="font-medium">{equipment.name}</div>
                                                        {equipment.capabilities && (
                                                            <div className="text-sm text-muted-foreground truncate max-w-xs">
                                                                {equipment.capabilities}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{equipment.usage_domain}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{equipment.support_phase}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2">
                                                        <Link
                                                            href={`/equipment/${equipment.equipment_id}`}
                                                            className="text-sm text-primary hover:underline"
                                                        >
                                                            View
                                                        </Link>
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
