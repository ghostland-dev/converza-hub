import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { LoadingSpinner } from './LoadingSpinner';
import { useToast } from '@/hooks/use-toast';
import {
  ChevronDown,
  Mail,
  Tag,
  Trash2,
  Download,
  UserPlus,
  Star,
  Archive,
  MoreHorizontal
} from 'lucide-react';

interface BulkActionsProps {
  selectedIds: string[];
  onClearSelection: () => void;
  entityType: 'leads' | 'campaigns' | 'templates';
}

export const BulkActions: React.FC<BulkActionsProps> = ({
  selectedIds,
  onClearSelection,
  entityType
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();

  const getActions = () => {
    switch (entityType) {
      case 'leads':
        return [
          { icon: Mail, label: 'Send Email', action: 'email' },
          { icon: Tag, label: 'Add Tags', action: 'tag' },
          { icon: UserPlus, label: 'Add to Campaign', action: 'campaign' },
          { icon: Star, label: 'Update Score', action: 'score' },
          { icon: Download, label: 'Export', action: 'export' },
          { icon: Archive, label: 'Archive', action: 'archive' },
          { icon: Trash2, label: 'Delete', action: 'delete', destructive: true }
        ];
      case 'campaigns':
        return [
          { icon: Mail, label: 'Duplicate', action: 'duplicate' },
          { icon: Archive, label: 'Archive', action: 'archive' },
          { icon: Download, label: 'Export Results', action: 'export' },
          { icon: Trash2, label: 'Delete', action: 'delete', destructive: true }
        ];
      case 'templates':
        return [
          { icon: Mail, label: 'Duplicate', action: 'duplicate' },
          { icon: Tag, label: 'Add Tags', action: 'tag' },
          { icon: Download, label: 'Export', action: 'export' },
          { icon: Archive, label: 'Archive', action: 'archive' },
          { icon: Trash2, label: 'Delete', action: 'delete', destructive: true }
        ];
      default:
        return [];
    }
  };

  const handleAction = async (action: string) => {
    if (action === 'delete') {
      setShowDeleteDialog(true);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let successMessage = '';
      switch (action) {
        case 'email':
          successMessage = `Email sent to ${selectedIds.length} lead(s)`;
          break;
        case 'tag':
          successMessage = `Tags added to ${selectedIds.length} item(s)`;
          break;
        case 'campaign':
          successMessage = `${selectedIds.length} lead(s) added to campaign`;
          break;
        case 'score':
          successMessage = `Score updated for ${selectedIds.length} lead(s)`;
          break;
        case 'export':
          successMessage = `${selectedIds.length} item(s) exported successfully`;
          break;
        case 'archive':
          successMessage = `${selectedIds.length} item(s) archived`;
          break;
        case 'duplicate':
          successMessage = `${selectedIds.length} item(s) duplicated`;
          break;
        default:
          successMessage = 'Action completed successfully';
      }
      
      toast({
        title: 'Success',
        description: successMessage,
      });
      
      onClearSelection();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to perform bulk action. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    setShowDeleteDialog(false);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: 'Success',
        description: `${selectedIds.length} item(s) deleted successfully`,
      });
      
      onClearSelection();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete items. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedIds.length === 0) {
    return null;
  }

  const actions = getActions();

  return (
    <>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-card border rounded-lg shadow-lg p-4 min-w-[400px]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-medium">
                {selectedIds.length} selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearSelection}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAction('export')}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>

              {entityType === 'leads' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleAction('email')}
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              )}

              {/* More Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" disabled={isLoading}>
                    {isLoading ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      <>
                        <MoreHorizontal className="h-4 w-4 mr-2" />
                        More
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {actions.map((action, index) => (
                    <React.Fragment key={action.action}>
                      {action.action === 'delete' && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        onClick={() => handleAction(action.action)}
                        disabled={isLoading}
                        className={action.destructive ? 'text-red-600 focus:text-red-600' : ''}
                      >
                        <action.icon className="h-4 w-4 mr-2" />
                        {action.label}
                      </DropdownMenuItem>
                    </React.Fragment>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{' '}
              <strong>{selectedIds.length}</strong> {entityType} from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete {selectedIds.length} item(s)
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};