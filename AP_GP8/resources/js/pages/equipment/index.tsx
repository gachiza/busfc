import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Eye, Edit, Trash2, Wrench, Building2, Calendar, DollarSign } from 'lucide-react';

interface Facility {
    facility_id: string;
    name: string;
    location?: string;
}

interface Equipment {
    equipment_id: string;
    name: string;
    description?: string;
    equipment_type: string;
    manufacturer?: string;
    model?: string;
    serial_number?: string;
    purchase_date?: string;
    cost?: number;
    status: string;
    facility?: Facility;
    created_at: string;
    updated_at: string;
}

interface Props {
    equipment: Equipment[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Equipment',
        href: '/equipment',
    },
];

export default function EquipmentIndex({ equipment }: Props) {
    const handleDelete = (item: Equipment) => {
        if (confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
            router.delete(`/equipment/${item.equipment_id}`, {
                onSuccess: () => {
                    // Success message will be handled by the backend
                },
                onError: () => {
                    alert('Failed to delete equipment. Please try again.');
                }
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Available':
                return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300';
            case 'In Use':
                return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
            case 'Maintenance':
                return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
            case 'Out of Order':
                return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Laboratory':
                return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300';
            case 'Manufacturing':
                return 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
            case 'Testing':
                return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300';
            default:
                return 'bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-bold tracking-tight">Equipment</h1>
                        <p className="text-muted-foreground">
                            Manage your innovation equipment and assets
                        </p>
                    </div>
                    <Link
                        href="/equipment/create"
                        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        New Equipment
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Wrench className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Equipment</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">{equipment.length}</div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Available</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {equipment.filter(e => e.status === 'Available').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">In Use</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                {equipment.filter(e => e.status === 'In Use').length}
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
                        <div className="flex items-center space-x-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-sm font-medium">Total Value</h3>
                        </div>
                        <div className="mt-2">
                            <div className="text-2xl font-bold">
                                ${equipment.reduce((sum, e) => sum + (e.cost || 0), 0).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Equipment Table */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">All Equipment</h2>
                        {equipment.length === 0 ? (
                            <div className="text-center py-12">
                                <Wrench className="mx-auto h-12 w-12 text-muted-foreground/50" />
                                <h3 className="mt-4 text-lg font-semibold">No equipment found</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Get started by adding your first equipment.
                                </p>
                                <Link
                                    href="/equipment/create"
                                    className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Equipment
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-3 px-4 font-medium">Name</th>
                                            <th className="text-left py-3 px-4 font-medium">Type</th>
                                            <th className="text-left py-3 px-4 font-medium">Facility</th>
                                            <th className="text-left py-3 px-4 font-medium">Status</th>
                                            <th className="text-left py-3 px-4 font-medium">Manufacturer</th>
                                            <th className="text-left py-3 px-4 font-medium">Cost</th>
                                            <th className="text-right py-3 px-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {equipment.map((item) => (
                                            <tr key={item.equipment_id} className="border-b hover:bg-muted/50">
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <div className="font-medium">{item.name}</div>
                                                        {item.model && (
                                                            <div className="text-sm text-muted-foreground">
                                                                Model: {item.model}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getTypeColor(item.equipment_type)}`}>
                                                        {item.equipment_type}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    {item.facility ? (
                                                        <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                                            {item.facility.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground">-</span>
                                                    )}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm">{item.manufacturer || '-'}</span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className="text-sm font-medium">
                                                        {item.cost ? `$${item.cost.toLocaleString()}` : '-'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-end space-x-2 relative z-10">
                                                        <Link
                                                            href={`/equipment/${item.equipment_id}`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Link>
                                                        <Link
                                                            href={`/equipment/${item.equipment_id}/edit`}
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                        <button
                                                            className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                                                            onClick={() => handleDelete(item)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
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
