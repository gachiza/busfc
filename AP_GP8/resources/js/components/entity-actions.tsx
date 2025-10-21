import { Link, router } from '@inertiajs/react';
import { Eye, Edit, Trash2 } from 'lucide-react';

interface EntityActionsProps {
    entityId: string;
    entityName: string;
    entityType: string;
    showUrl: string;
    editUrl: string;
    deleteUrl: string;
    onDelete?: () => void;
}

export function EntityActions({ 
    entityId, 
    entityName, 
    entityType, 
    showUrl, 
    editUrl, 
    deleteUrl,
    onDelete 
}: EntityActionsProps) {
    const handleDelete = () => {
        if (confirm(`Are you sure you want to delete "${entityName}"? This action cannot be undone.`)) {
            if (onDelete) {
                onDelete();
            } else {
                router.delete(deleteUrl, {
                    onSuccess: () => {
                        // Success message will be handled by the backend
                    },
                    onError: () => {
                        alert(`Failed to delete ${entityType.toLowerCase()}. Please try again.`);
                    }
                });
            }
        }
    };

    return (
        <div className="flex items-center space-x-1">
            <Link
                href={showUrl}
                className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                title={`View ${entityType}`}
            >
                <Eye className="h-4 w-4" />
            </Link>
            <Link
                href={editUrl}
                className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                title={`Edit ${entityType}`}
            >
                <Edit className="h-4 w-4" />
            </Link>
            <button
                className="inline-flex items-center justify-center rounded-md h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-muted"
                onClick={handleDelete}
                title={`Delete ${entityType}`}
            >
                <Trash2 className="h-4 w-4" />
            </button>
        </div>
    );
}
