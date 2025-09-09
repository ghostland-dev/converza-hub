import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { DataTable } from '@/components/DataTable';
import { FormWithValidation } from '@/components/FormWithValidation';
import { StatsCard } from '@/components/StatsCard';
import { BulkActions } from '@/components/BulkActions';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  Star, 
  TrendingUp,
  Plus,
  Upload
} from 'lucide-react';

const Leads = () => {
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const leads = [
    {
      id: 1,
      name: 'Sophie Martin',
      email: 'sophie.martin@techcorp.fr',
      company: 'TechCorp Solutions',
      position: 'CTO',
      phone: '+33 1 23 45 67 89',
      score: 95,
      status: 'Hot Lead',
      source: 'LinkedIn',
      lastContact: '2024-01-15',
    },
    {
      id: 2,
      name: 'Marc Dubois',
      email: 'm.dubois@startup.io',
      company: 'StartupIO',
      position: 'Founder & CEO',
      phone: '+33 1 98 76 54 32',
      score: 87,
      status: 'Warm Lead',
      source: 'Website',
      lastContact: '2024-01-14',
    },
    {
      id: 3,
      name: 'Claire Rousseau',
      email: 'claire@consulting.com',
      company: 'Consulting Plus',
      position: 'Marketing Director',
      phone: '+33 1 11 22 33 44',
      score: 92,
      status: 'Hot Lead',
      source: 'Referral',
      lastContact: '2024-01-13',
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david@ecommerce.fr',
      company: 'E-Commerce Pro',
      position: 'Growth Manager',
      phone: '+33 1 55 66 77 88',
      score: 78,
      status: 'Cold Lead',
      source: 'Google Ads',
      lastContact: '2024-01-12',
    },
    {
      id: 5,
      name: 'Emma Wilson',
      email: 'emma.wilson@agency.co.uk',
      company: 'Digital Agency UK',
      position: 'Account Manager',
      phone: '+44 20 1234 5678',
      score: 83,
      status: 'Warm Lead',
      source: 'Facebook Ads',
      lastContact: '2024-01-11',
    }
  ];

  const columns = [
    {
      key: 'select' as any,
      label: '',
      render: (_: any, item: any) => (
        <Checkbox
          checked={selectedIds.includes(item.id.toString())}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedIds([...selectedIds, item.id.toString()]);
            } else {
              setSelectedIds(selectedIds.filter(id => id !== item.id.toString()));
            }
          }}
        />
      ),
    },
    {
      key: 'name' as keyof typeof leads[0],
      label: 'Name',
      sortable: true,
      filterable: true,
    },
    {
      key: 'email' as keyof typeof leads[0],
      label: 'Email',
      sortable: true,
      filterable: true,
    },
    {
      key: 'company' as keyof typeof leads[0],
      label: 'Company',
      sortable: true,
      filterable: true,
    },
    {
      key: 'position' as keyof typeof leads[0],
      label: 'Position',
      sortable: true,
    },
    {
      key: 'score' as keyof typeof leads[0],
      label: 'Score',
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-emerald-500 transition-all"
              style={{ width: `${value}%` }}
            />
          </div>
          <span className="text-sm font-medium">{value}</span>
        </div>
      ),
    },
    {
      key: 'status' as keyof typeof leads[0],
      label: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <Badge 
          variant={
            value === 'Hot Lead' ? 'destructive' : 
            value === 'Warm Lead' ? 'default' : 
            'secondary'
          }
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'source' as keyof typeof leads[0],
      label: 'Source',
      sortable: true,
      filterable: true,
    },
    {
      key: 'lastContact' as keyof typeof leads[0],
      label: 'Last Contact',
      sortable: true,
    },
  ];

  const handleAddLead = async (data: any) => {
    // This would normally save to backend
    console.log('Adding lead:', data);
    setIsAddLeadOpen(false);
  };

  const totalLeads = leads.length;
  const hotLeads = leads.filter(lead => lead.status === 'Hot Lead').length;
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score, 0) / leads.length);
  const newThisWeek = Math.floor(totalLeads * 0.3); // Mock data

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              Leads Management
            </h1>
            <p className="text-muted-foreground">
              Manage and track your sales leads
            </p>
          </div>
          <Dialog open={isAddLeadOpen} onOpenChange={setIsAddLeadOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <FormWithValidation
                onSubmit={handleAddLead}
                title="Add New Lead"
                description="Enter the lead information below"
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            icon={Users}
            trend={{ value: 12, isPositive: true }}
            description="vs last month"
          />
          <StatsCard
            title="Hot Leads"
            value={hotLeads}
            icon={Star}
            trend={{ value: 8, isPositive: true }}
            description="high priority"
          />
          <StatsCard
            title="Average Score"
            value={avgScore}
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
            description="lead quality"
          />
          <StatsCard
            title="New This Week"
            value={newThisWeek}
            icon={UserPlus}
            trend={{ value: 15, isPositive: true }}
            description="new leads added"
          />
        </div>

        {/* Data Table */}
        {leads.length > 0 ? (
          <DataTable
            data={leads}
            columns={columns}
            searchPlaceholder="Search leads by name, email, or company..."
            itemsPerPage={10}
          />
        ) : (
          <EmptyState
            icon={Users}
            title="No leads found"
            description="Start building your pipeline by adding your first lead or importing from a CSV file."
            actionLabel="Add Lead"
            onAction={() => setIsAddLeadOpen(true)}
            secondaryActionLabel="Import Leads"
            onSecondaryAction={() => {/* Handle import */}}
            showSearch={true}
            showFilters={true}
          />
        )}

        {/* Bulk Actions */}
        <BulkActions
          selectedIds={selectedIds}
          onClearSelection={() => setSelectedIds([])}
          entityType="leads"
        />
      </div>
    </DashboardLayout>
  );
};

export default Leads;