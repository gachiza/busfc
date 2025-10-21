import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface Participant {
    participant_id: string;
    full_name: string;
    email: string;
    affiliation: string;
    specialization: string;
    participant_type: string;
    cross_skill_trained: boolean;
    institution: string;
}

interface Props {
    participant: Participant;
}

export default function ParticipantEdit({ participant }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        full_name: participant.full_name || '',
        email: participant.email || '',
        affiliation: participant.affiliation || '',
        specialization: participant.specialization || '',
        participant_type: participant.participant_type || '',
        cross_skill_trained: participant.cross_skill_trained || false,
        institution: participant.institution || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/',
        },
        {
            title: 'Participants',
            href: '/participants',
        },
        {
            title: participant.full_name,
            href: `/participants/${participant.participant_id}`,
        },
        {
            title: 'Edit',
            href: `/participants/${participant.participant_id}/edit`,
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/participants/${participant.participant_id}`);
    };

    const affiliations = ['CS', 'SE', 'Engineering', 'Other'];
    const specializations = ['Software', 'Hardware', 'Business'];
    const institutions = ['SCIT', 'CEDAT', 'UniPod', 'UIRI', 'Lwera'];
    const participantTypes = ['Student', 'Lecturer', 'Collaborator'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Participant: ${participant.full_name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={`/participants/${participant.participant_id}`}
                            className="inline-flex items-center justify-center rounded-md h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Participant</h1>
                            <p className="text-muted-foreground">
                                Update participant information and settings
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="rounded-lg border bg-card shadow-sm">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Personal Information</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="full_name" className="text-sm font-medium">
                                        Full Name *
                                    </label>
                                    <input
                                        id="full_name"
                                        type="text"
                                        value={data.full_name}
                                        onChange={(e) => setData('full_name', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter full name"
                                        required
                                    />
                                    {errors.full_name && (
                                        <p className="text-sm text-destructive">{errors.full_name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email Address *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Enter email address"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-destructive">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="participant_type" className="text-sm font-medium">
                                    Participant Type *
                                </label>
                                <select
                                    id="participant_type"
                                    value={data.participant_type}
                                    onChange={(e) => setData('participant_type', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select participant type</option>
                                    {participantTypes.map((type) => (
                                        <option key={type} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {errors.participant_type && (
                                    <p className="text-sm text-destructive">{errors.participant_type}</p>
                                )}
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Academic Information</h2>
                            
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="institution" className="text-sm font-medium">
                                        Institution *
                                    </label>
                                    <select
                                        id="institution"
                                        value={data.institution}
                                        onChange={(e) => setData('institution', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select institution</option>
                                        {institutions.map((institution) => (
                                            <option key={institution} value={institution}>
                                                {institution}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.institution && (
                                        <p className="text-sm text-destructive">{errors.institution}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="affiliation" className="text-sm font-medium">
                                        Affiliation *
                                    </label>
                                    <select
                                        id="affiliation"
                                        value={data.affiliation}
                                        onChange={(e) => setData('affiliation', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select affiliation</option>
                                        {affiliations.map((affiliation) => (
                                            <option key={affiliation} value={affiliation}>
                                                {affiliation}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.affiliation && (
                                        <p className="text-sm text-destructive">{errors.affiliation}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="specialization" className="text-sm font-medium">
                                    Specialization *
                                </label>
                                <select
                                    id="specialization"
                                    value={data.specialization}
                                    onChange={(e) => setData('specialization', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    required
                                >
                                    <option value="">Select specialization</option>
                                    {specializations.map((specialization) => (
                                        <option key={specialization} value={specialization}>
                                            {specialization}
                                        </option>
                                    ))}
                                </select>
                                {errors.specialization && (
                                    <p className="text-sm text-destructive">{errors.specialization}</p>
                                )}
                            </div>
                        </div>

                        {/* Skills & Training */}
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold">Skills & Training</h2>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Cross-Skill Training</label>
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="cross_skill_trained"
                                        type="checkbox"
                                        checked={data.cross_skill_trained}
                                        onChange={(e) => setData('cross_skill_trained', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                                    />
                                    <label htmlFor="cross_skill_trained" className="text-sm">
                                        This participant has received cross-skill training
                                    </label>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Cross-skill training indicates exposure to multiple disciplines (hardware, software, business)
                                </p>
                                {errors.cross_skill_trained && (
                                    <p className="text-sm text-destructive">{errors.cross_skill_trained}</p>
                                )}
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                            <Link
                                href={`/participants/${participant.participant_id}`}
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
