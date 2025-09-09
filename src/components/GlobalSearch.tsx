import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Users, 
  Mail, 
  BarChart3, 
  Settings,
  FileText,
  Zap,
  ArrowRight,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'lead' | 'campaign' | 'template' | 'analytics' | 'workflow';
  url: string;
  metadata?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'high score leads',
    'email templates',
    'campaign analytics'
  ]);
  
  const navigate = useNavigate();

  // Mock search data - in production this would come from API
  const mockData: SearchResult[] = [
    {
      id: '1',
      title: 'Sophie Martin',
      description: 'CTO at TechCorp Solutions - Score: 95',
      type: 'lead',
      url: '/leads',
      metadata: 'Hot Lead'
    },
    {
      id: '2',
      title: 'Spring Launch Campaign',
      description: 'Email campaign with 340% ROI',
      type: 'campaign',
      url: '/campaigns',
      metadata: 'Active'
    },
    {
      id: '3',
      title: 'Welcome Email Template',
      description: 'Onboarding sequence for new leads',
      type: 'template',
      url: '/templates',
      metadata: '89% open rate'
    },
    {
      id: '4',
      title: 'Lead Generation Analytics',
      description: 'Monthly performance dashboard',
      type: 'analytics',
      url: '/analytics',
      metadata: 'Updated 2h ago'
    },
    {
      id: '5',
      title: 'Nurture Workflow',
      description: 'Automated lead nurturing sequence',
      type: 'workflow',
      url: '/workflows',
      metadata: '847 leads enrolled'
    }
  ];

  useEffect(() => {
    if (query.length > 1) {
      setIsSearching(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockData.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [query]);

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'lead': return Users;
      case 'campaign': return Mail;
      case 'template': return FileText;
      case 'analytics': return BarChart3;
      case 'workflow': return Zap;
      default: return Search;
    }
  };

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'lead': return 'bg-blue-100 text-blue-700';
      case 'campaign': return 'bg-green-100 text-green-700';
      case 'template': return 'bg-purple-100 text-purple-700';
      case 'analytics': return 'bg-orange-100 text-orange-700';
      case 'workflow': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches
    const newRecent = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
    setRecentSearches(newRecent);
    
    navigate(result.url);
    onClose();
  };

  const handleRecentClick = (search: string) => {
    setQuery(search);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center px-4 py-3 border-b">
          <Search className="h-4 w-4 text-muted-foreground mr-3" />
          <Input
            placeholder="Search leads, campaigns, templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 focus-visible:ring-0 text-base"
            autoFocus
          />
          {isSearching && (
            <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {query.length <= 1 && recentSearches.length > 0 && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Recent Searches
              </h3>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-2"
                    onClick={() => handleRecentClick(search)}
                  >
                    <Search className="h-4 w-4 mr-3 text-muted-foreground" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-2">
              {results.map((result) => {
                const Icon = getIcon(result.type);
                return (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="w-full justify-start text-left h-auto p-3 hover:bg-muted/50"
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className={`p-2 rounded-md ${getTypeColor(result.type)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium truncate">{result.title}</span>
                          <Badge variant="outline" className="text-xs capitalize">
                            {result.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {result.description}
                        </p>
                        {result.metadata && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {result.metadata}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                );
              })}
            </div>
          )}

          {query.length > 1 && results.length === 0 && !isSearching && (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-1">Try adjusting your search terms</p>
            </div>
          )}
        </div>

        <Separator />
        
        <div className="p-3 text-xs text-muted-foreground bg-muted/20">
          <div className="flex items-center justify-between">
            <span>Press ESC to close</span>
            <span>Use ↑↓ to navigate</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};