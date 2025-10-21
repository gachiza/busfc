import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Cog, Building2, Users, Target } from 'lucide-react';

interface Service {
    service_id: string;
    name: string;
    description?: string;
    service_type: string;
    provider?: string;
    cost?: number;
    availability?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    services: Service[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Services',
        href: '/services',
    },
];

export default function ServicesIndex({ services }: Props) {
    const handleDelete = (service: Service) => {
        if (confirm(`Are you sure you want to delete "${service.name}"? This action cannot be undone.`)) {
            router.delete(`/services/${service.service_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete service. Please try again.');
                }
            });
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Consulting':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'Training':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            case 'Technical Support':
                return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
            case 'Research':
                return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Services" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Services</h1>
                        <p className="text-muted-foreground">
                            Manage your innovation services and offerings
                        </p>
                    </div>
                    <Link
                        href="/services/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Service
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Cog className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Services</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{services.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Consulting</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {services.filter(s => s.service_type === 'Consulting').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Training</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {services.filter(s => s.service_type === 'Training').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Providers</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {new Set(services.map(s => s.provider).filter(Boolean)).size}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">All Services</h2>
                    {services.length === 0 ? (
                        <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
                            <Cog className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            <h3 className="mt-4 text-lg font-semibold">No services found</h3>
                            <p className="mt-2 text-muted-foreground">
                                Get started by adding your first service.
                            </p>
                            <Link
                                href="/services/create"
                                className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Service
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <div
                                    key={service.service_id}
                                    className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg"
                                >
                                    <div className="space-y-4">
                                        {/* Header */}
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <h3 className="font-semibold text-lg">{service.name}</h3>
                                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                    <Cog className="h-3 w-3" />
                                                    <span>{service.service_type}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-1 relative z-10">
                                                <Link
                                                    href={`/services/${service.service_id}`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    href={`/services/${service.service_id}/edit`}
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                    onClick={() => handleDelete(service)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Type */}
                                        <div className="space-y-2">
                                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(service.service_type)}`}>
                                                {service.service_type}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        {service.description && (
                                            <p className="text-sm text-muted-foreground line-clamp-3">
                                                {service.description}
                                            </p>
                                        )}

                                        {/* Provider */}
                                        {service.provider && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                    Provider
                                                </h4>
                                                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">
                                                    {service.provider}
                                                </span>
                                            </div>
                                        )}

                                        {/* Cost and Availability */}
                                        <div className="flex items-center justify-between">
                                            {service.cost && (
                                                <div className="space-y-1">
                                                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                        Cost
                                                    </h4>
                                                    <span className="text-sm font-medium">
                                                        ${service.cost.toLocaleString()}
                                                    </span>
                                                </div>
                                            )}
                                            {service.availability && (
                                                <div className="space-y-1">
                                                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                                                        Availability
                                                    </h4>
                                                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                                        {service.availability}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t">
                                            <span className="text-xs text-muted-foreground">
                                                Added {new Date(service.created_at).toLocaleDateString()}
                                            </span>
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
