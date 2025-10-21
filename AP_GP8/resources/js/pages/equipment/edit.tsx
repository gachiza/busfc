import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

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
    facility_id?: string;
}

interface Props {
    equipment: Equipment;
    facilities: Facility[];
}

export default function EquipmentEdit({ equipment, facilities }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: equipment.name || '',
        capabilities: equipment.capabilities || '',
        description: equipment.description || '',
        inventory_code: equipment.inventory_code || '',
        usage_domain: equipment.usage_domain || '',
        support_phase: equipment.support_phase || '',
        facility_id: equipment.facility_id || '',
    });

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
        {
            title: 'Edit',
            href: `/equipment/${equipment.equipment_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/equipment/${equipment.equipment_id}`);
    };

    const usageDomains = ['Electronics', 'Mechanical', 'IoT'];
    const supportPhases = ['Training', 'Prototyping', 'Testing', 'Commercialization'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Equipment: ${equipment.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/equipment/${equipment.equipment_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Equipment</h1>
                            <p className="text-muted-foreground">
                                Update equipment information and settings
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
                                        Equipment Name *
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter equipment name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-destructive">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="inventory_code" className="text-sm font-medium">
                                        Inventory Code
                                    </label>
                                    <input
                                        id="inventory_code"
                                        type="text"
                                        value={data.inventory_code}
                                        onChange={(e) => setData('inventory_code', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter inventory code"
                                    />
                                    {errors.inventory_code && (
                                        <p className="text-sm text-destructive">{errors.inventory_code}</p>
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
                                    placeholder="Describe the equipment and its purpose"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Equipment Classification */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Equipment Classification</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="usage_domain" className="text-sm font-medium">
                                        Usage Domain *
                                    </label>
                                    <select
                                        id="usage_domain"
                                        value={data.usage_domain}
                                        onChange={(e) => setData('usage_domain', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select usage domain</option>
                                        {usageDomains.map((domain) => (
                                            <option key={domain} value={domain}>
                                                {domain}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.usage_domain && (
                                        <p className="text-sm text-destructive">{errors.usage_domain}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="support_phase" className="text-sm font-medium">
                                        Support Phase *
                                    </label>
                                    <select
                                        id="support_phase"
                                        value={data.support_phase}
                                        onChange={(e) => setData('support_phase', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select support phase</option>
                                        {supportPhases.map((phase) => (
                                            <option key={phase} value={phase}>
                                                {phase}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.support_phase && (
                                        <p className="text-sm text-destructive">{errors.support_phase}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Capabilities & Location */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Capabilities & Location</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="capabilities" className="text-sm font-medium">
                                    Equipment Capabilities
                                </label>
                                <input
                                    id="capabilities"
                                    type="text"
                                    value={data.capabilities}
                                    onChange={(e) => setData('capabilities', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter capabilities separated by commas (e.g., 3D Printing, CNC Machining, PCB Assembly)"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Separate multiple capabilities with commas
                                </p>
                                {errors.capabilities && (
                                    <p className="text-sm text-destructive">{errors.capabilities}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="facility_id" className="text-sm font-medium">
                                    Located At
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

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href={`/equipment/${equipment.equipment_id}`}
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
