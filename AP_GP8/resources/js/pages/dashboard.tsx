import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    FolderOpen, 
    Folder, 
    Building2, 
    Wrench, 
    Users, 
    Target, 
    Cog,
    ArrowRight,
    TrendingUp,
    Activity,
    BarChart3
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const modelCards = [
    {
        title: 'Programs',
        description: 'Manage and organize your innovation programs',
        href: '/programs',
        icon: FolderOpen,
        color: 'bg-blue-500',
        count: '12',
        trend: '+2 this month'
    },
    {
        title: 'Projects',
        description: 'Track and manage innovation projects',
        href: '/projects',
        icon: Folder,
        color: 'bg-green-500',
        count: '48',
        trend: '+8 this month'
    },
    {
        title: 'Facilities',
        description: 'Manage research and development facilities',
        href: '/facilities',
        icon: Building2,
        color: 'bg-purple-500',
        count: '6',
        trend: '+1 this month'
    },
    {
        title: 'Equipment',
        description: 'Track and maintain laboratory equipment',
        href: '/equipment',
        icon: Wrench,
        color: 'bg-orange-500',
        count: '124',
        trend: '+15 this month'
    },
    {
        title: 'Services',
        description: 'Manage available research services',
        href: '/services',
        icon: Cog,
        color: 'bg-indigo-500',
        count: '18',
        trend: '+3 this month'
    },
    {
        title: 'Participants',
        description: 'Manage researchers and project participants',
        href: '/participants',
        icon: Users,
        color: 'bg-pink-500',
        count: '89',
        trend: '+12 this month'
    },
];

const statsCards = [
    {
        title: 'Total Projects',
        value: '48',
        change: '+12%',
        changeType: 'positive',
        icon: BarChart3,
    },
    {
        title: 'Active Programs',
        value: '12',
        change: '+8%',
        changeType: 'positive',
        icon: TrendingUp,
    },
    {
        title: 'Research Facilities',
        value: '6',
        change: '+16%',
        changeType: 'positive',
        icon: Activity,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Welcome Section */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Welcome to Innovation Hub</h1>
                    <p className="text-muted-foreground">
                        Manage your research programs, projects, and resources from one central dashboard.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-3">
                    {statsCards.map((stat, index) => (
                        <div
                            key={index}
                            className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between space-y-0 pb-2">
                                <h3 className="text-sm font-medium tracking-wide text-muted-foreground">
                                    {stat.title}
                                </h3>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={`inline-flex items-center ${
                                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {stat.change}
                                    </span>
                                    {' '}from last month
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Model Cards Grid */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Quick Access</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {modelCards.map((card, index) => (
                            <Link
                                key={index}
                                href={card.href}
                                className="group relative overflow-hidden rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3">
                                            <div className={`rounded-lg p-2 ${card.color} text-white`}>
                                                <card.icon className="h-5 w-5" />
                                            </div>
                                            <h3 className="font-semibold">{card.title}</h3>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {card.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="space-y-1">
                                                <div className="text-2xl font-bold">{card.count}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {card.trend}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                                
                                {/* Hover effect overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Recent Activity</h2>
                    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-muted-foreground">2 hours ago</span>
                                <span>New project "AI Research Initiative" was created</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                <span className="text-muted-foreground">4 hours ago</span>
                                <span>Equipment "Microscope XR-2000" was added to Lab A</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                <span className="text-muted-foreground">1 day ago</span>
                                <span>New participant "Dr. Sarah Johnson" joined the Innovation Program</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm">
                                <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                <span className="text-muted-foreground">2 days ago</span>
                                <span>Facility "Research Center B" was updated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
