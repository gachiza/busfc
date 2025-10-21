import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Edit, Trash2, FolderOpen, Target, Users, Calendar, ArrowLeft, Building, Cog } from 'lucide-react';

interface Facility {
    facility_id: string;
    name: string;
    location: string;
}

interface Equipment {
    equipment_id: string;
    name: string;
    capabilities?: string;
    description?: string;
    inventory_code?: string;
    usage_domain: string;
    support_phase: string;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

interface Props {
    equipment: Equipment;
}

export default function EquipmentShow({ equipment }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Equipment',
            href: '/equipment',
        },
        {
            title: equipment.name,
            href: `/equipment/${equipment.equipment_id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Equipment: ${equipment.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/equipment"
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">{equipment.name}</h1>
                            <p className="text-muted-foreground">
                                Equipment details and specifications
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/equipment/${equipment.equipment_id}/edit`}
                            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                        >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Equipment
                        </Link>
                    </div>
                </div>

                {/* Equipment Details */}
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Information */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Equipment Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Name</label>
                                <p className="mt-1 text-sm">{equipment.name}</p>
                            </div>
                            {equipment.inventory_code && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Inventory Code</label>
                                    <p className="mt-1">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                            {equipment.inventory_code}
                                        </span>
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Usage Domain</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        {equipment.usage_domain}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Support Phase</label>
                                <p className="mt-1">
                                    <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                        {equipment.support_phase}
                                    </span>
                                </p>
                            </div>
                            {equipment.description && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                                    <p className="mt-1 text-sm">{equipment.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Capabilities & Location */}
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Capabilities & Location</h2>
                        <div className="space-y-4">
                            {equipment.capabilities ? (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Capabilities</label>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {equipment.capabilities.split(',').map((capability, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700 dark:bg-orange-900/20 dark:text-orange-300"
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
                            
                            {equipment.facility ? (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Located At</label>
                                    <div className="mt-1 flex items-center space-x-3">
                                        <Building className="h-6 w-6 text-primary" />
                                        <div>
                                            <Link
                                                href={`/facilities/${equipment.facility.facility_id}`}
                                                className="font-medium text-primary hover:underline"
                                            >
                                                {equipment.facility.name}
                                            </Link>
                                            <p className="text-sm text-muted-foreground">{equipment.facility.location}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Located At</label>
                                    <p className="mt-1 text-sm text-muted-foreground">No facility assigned</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Cog className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Equipment Type</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-lg font-semibold">{equipment.usage_domain}</div>
                            <div className="text-sm text-muted-foreground">{equipment.support_phase}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Created</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(equipment.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Last Updated</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-sm">{new Date(equipment.updated_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>

                {/* Usage Domains Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Usage Domains</h2>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Electronics</h3>
                                <p className="text-sm text-muted-foreground">
                                    Electronic components, circuit design, PCB development, and electronic testing equipment.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Mechanical</h3>
                                <p className="text-sm text-muted-foreground">
                                    Mechanical systems, manufacturing tools, machining equipment, and mechanical testing.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">IoT</h3>
                                <p className="text-sm text-muted-foreground">
                                    Internet of Things devices, sensors, connectivity equipment, and smart systems.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Support Phases Information */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Support Phases</h2>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Training</h3>
                                <p className="text-sm text-muted-foreground">
                                    Educational equipment for skill development and learning.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Prototyping</h3>
                                <p className="text-sm text-muted-foreground">
                                    Tools and equipment for building and developing prototypes.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-2">Testing</h3>
                                <p className="text-sm text-muted-foreground">
                                    Testing and validation equipment for quality assurance.
                                </p>
                            </div>
                            <div className="rounded-lg border p-4">
                                <h3 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Commercialization</h3>
                                <p className="text-sm text-muted-foreground">
                                    Production-ready equipment for commercial manufacturing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
