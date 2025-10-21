import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

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
    facility_id?: string;
}

interface Props {
    service: Service;
    facilities: Facility[];
}

export default function ServiceEdit({ service, facilities }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: service.name || '',
        description: service.description || '',
        category: service.category || '',
        skill_type: service.skill_type || '',
        facility_id: service.facility_id || '',
    });

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
        {
            title: 'Edit',
            href: `/services/${service.service_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/services/${service.service_id}`);
    };

    const categories = ['Machining', 'Testing', 'Training'];
    const skillTypes = ['Hardware', 'Software', 'Integration'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Service: ${service.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/services/${service.service_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Service</h1>
                            <p className="text-muted-foreground">
                                Update service information and settings
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
                            
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Service Name *
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter service name"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name}</p>
                                )}
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
                                    placeholder="Describe the service and what it offers"
                                />
                                {errors.description && (
                                    <p className="text-sm text-destructive">{errors.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Service Classification */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Service Classification</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="category" className="text-sm font-medium">
                                        Category *
                                    </label>
                                    <select
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="text-sm text-destructive">{errors.category}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="skill_type" className="text-sm font-medium">
                                        Skill Type *
                                    </label>
                                    <select
                                        id="skill_type"
                                        value={data.skill_type}
                                        onChange={(e) => setData('skill_type', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select skill type</option>
                                        {skillTypes.map((skillType) => (
                                            <option key={skillType} value={skillType}>
                                                {skillType}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.skill_type && (
                                        <p className="text-sm text-destructive">{errors.skill_type}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Facility Association */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Service Provider</h2>
                            
                            <div className="space-y-2">
                                <label htmlFor="facility_id" className="text-sm font-medium">
                                    Associated Facility
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
                                href={`/services/${service.service_id}`}
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
