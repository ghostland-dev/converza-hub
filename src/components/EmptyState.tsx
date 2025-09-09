import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon, Plus, Search, Filter } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  showSearch?: boolean;
  showFilters?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  showSearch = false,
  showFilters = false
}) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center p-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/20 flex items-center justify-center">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-md mb-6">{description}</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {actionLabel && onAction && (
            <Button onClick={onAction} className="min-w-[140px]">
              <Plus className="h-4 w-4 mr-2" />
              {actionLabel}
            </Button>
          )}
          
          {secondaryActionLabel && onSecondaryAction && (
            <Button variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
        
        {(showSearch || showFilters) && (
          <div className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
            {showSearch && (
              <div className="flex items-center gap-1">
                <Search className="h-4 w-4" />
                <span>Try searching</span>
              </div>
            )}
            
            {showSearch && showFilters && (
              <span className="text-muted-foreground/50">or</span>
            )}
            
            {showFilters && (
              <div className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>adjusting filters</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};