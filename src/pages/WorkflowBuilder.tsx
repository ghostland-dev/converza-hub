import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Play,
  Plus,
  Settings,
  Mail,
  Smartphone,
  Clock,
  Users,
  Target,
  Zap,
  GitBranch,
  Save,
  Eye,
  MoreVertical
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const WorkflowBuilder = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState("New Lead Nurturing Workflow");

  // Mock workflow nodes
  const workflowNodes = [
    {
      id: "trigger",
      type: "trigger",
      title: "New Lead Added",
      description: "Triggered when a new lead is added to the system",
      position: { x: 100, y: 50 },
      status: "active"
    },
    {
      id: "wait1",
      type: "wait",
      title: "Wait 1 Day",
      description: "Wait 24 hours before next action",
      position: { x: 100, y: 150 },
      status: "active"
    },
    {
      id: "email1",
      type: "email",
      title: "Welcome Email",
      description: "Send welcome email template",
      position: { x: 100, y: 250 },
      status: "active"
    },
    {
      id: "condition1",
      type: "condition",
      title: "Email Opened?",
      description: "Check if welcome email was opened",
      position: { x: 100, y: 350 },
      status: "active"
    },
    {
      id: "email2a",
      type: "email",
      title: "Follow-up Email",
      description: "Send follow-up for engaged leads",
      position: { x: 50, y: 450 },
      status: "active"
    },
    {
      id: "email2b",
      type: "email",
      title: "Re-engagement Email",
      description: "Send re-engagement for non-openers",
      position: { x: 150, y: 450 },
      status: "inactive"
    }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "trigger":
        return <Zap className="w-4 h-4" />;
      case "email":
        return <Mail className="w-4 h-4" />;
      case "sms":
        return <Smartphone className="w-4 h-4" />;
      case "wait":
        return <Clock className="w-4 h-4" />;
      case "condition":
        return <GitBranch className="w-4 h-4" />;
      case "action":
        return <Target className="w-4 h-4" />;
      default:
        return <Settings className="w-4 h-4" />;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case "trigger":
        return "bg-green-500/10 border-green-500/20 text-green-500";
      case "email":
        return "bg-blue-500/10 border-blue-500/20 text-blue-500";
      case "sms":
        return "bg-purple-500/10 border-purple-500/20 text-purple-500";
      case "wait":
        return "bg-yellow-500/10 border-yellow-500/20 text-yellow-500";
      case "condition":
        return "bg-orange-500/10 border-orange-500/20 text-orange-500";
      case "action":
        return "bg-red-500/10 border-red-500/20 text-red-500";
      default:
        return "bg-muted/10 border-border text-muted-foreground";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/campaigns">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Workflow Builder</h1>
              <p className="text-muted-foreground">Create automated lead nurturing sequences</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="hero">
              <Play className="w-4 h-4 mr-2" />
              Activate Workflow
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {/* Workflow Canvas */}
          <div className="col-span-3">
            <Card className="bg-gradient-card border-border/50 min-h-[800px]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center">
                      <Input
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                        className="text-xl font-semibold border-none bg-transparent p-0 focus-visible:ring-0"
                      />
                    </CardTitle>
                    <CardDescription>
                      Drag and drop nodes to build your automation workflow
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative h-[700px] bg-muted/10 rounded-lg p-6 overflow-auto">
                  {/* Grid Pattern */}
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground)) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />
                  
                  {/* Workflow Nodes */}
                  {workflowNodes.map((node, index) => (
                    <div key={node.id}>
                      {/* Connection Line */}
                      {index < workflowNodes.length - 1 && (
                        <div
                          className="absolute w-0.5 bg-border z-0"
                          style={{
                            left: node.position.x + 96,
                            top: node.position.y + 80,
                            height: workflowNodes[index + 1].position.y - node.position.y - 80
                          }}
                        />
                      )}
                      
                      {/* Node */}
                      <div
                        className={`
                          absolute w-48 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 z-10
                          ${selectedNode === node.id ? 'ring-2 ring-primary' : ''}
                          ${node.status === 'active' ? 'bg-card' : 'bg-muted/20 opacity-60'}
                          ${getNodeColor(node.type)}
                        `}
                        style={{
                          left: node.position.x,
                          top: node.position.y
                        }}
                        onClick={() => setSelectedNode(node.id)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getNodeIcon(node.type)}
                            <span className="font-medium text-sm">{node.title}</span>
                          </div>
                          <Button variant="ghost" size="icon" className="w-6 h-6">
                            <Settings className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">{node.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          {node.type}
                        </Badge>
                      </div>
                    </div>
                  ))}

                  {/* Branch connections for condition node */}
                  <div
                    className="absolute w-0.5 bg-border z-0"
                    style={{
                      left: 146, // condition1 center
                      top: 430, // condition1 bottom
                      height: 20
                    }}
                  />
                  <div
                    className="absolute h-0.5 bg-border z-0"
                    style={{
                      left: 146,
                      top: 450,
                      width: 100
                    }}
                  />
                  <div
                    className="absolute w-0.5 bg-border z-0"
                    style={{
                      left: 146,
                      top: 450,
                      height: 20
                    }}
                  />
                  <div
                    className="absolute w-0.5 bg-border z-0"
                    style={{
                      left: 246,
                      top: 450,
                      height: 20
                    }}
                  />

                  {/* Add Node Button */}
                  <Button 
                    variant="outline" 
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Node
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Node Library */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Node Library</CardTitle>
                <CardDescription>
                  Drag nodes to the canvas to build your workflow
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                    <Mail className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Email</div>
                      <div className="text-xs text-muted-foreground">Send email</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                    <Smartphone className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium text-sm">SMS</div>
                      <div className="text-xs text-muted-foreground">Send SMS</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                    <Clock className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Wait</div>
                      <div className="text-xs text-muted-foreground">Add delay</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                    <GitBranch className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Condition</div>
                      <div className="text-xs text-muted-foreground">If/Then logic</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" size="sm" className="justify-start h-auto p-3">
                    <Target className="w-4 h-4 mr-2" />
                    <div className="text-left">
                      <div className="font-medium text-sm">Action</div>
                      <div className="text-xs text-muted-foreground">Custom action</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Node Settings */}
            {selectedNode && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Node Settings</CardTitle>
                  <CardDescription>
                    Configure the selected node
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Node Name</Label>
                    <Input placeholder="Enter node name..." />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Input placeholder="Enter description..." />
                  </div>
                  
                  {selectedNode.includes('email') && (
                    <>
                      <div className="space-y-2">
                        <Label>Email Template</Label>
                        <Input placeholder="Select template..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject Line</Label>
                        <Input placeholder="Enter subject..." />
                      </div>
                    </>
                  )}
                  
                  {selectedNode.includes('wait') && (
                    <div className="space-y-2">
                      <Label>Wait Duration</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input placeholder="Value" />
                        <select className="px-3 py-2 border border-input rounded-md">
                          <option>Minutes</option>
                          <option>Hours</option>
                          <option>Days</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  <Button variant="hero" size="sm" className="w-full">
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Workflow Stats */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Workflow Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">0</div>
                  <div className="text-sm text-muted-foreground">Active Leads</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">0%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-glow">0</div>
                  <div className="text-sm text-muted-foreground">Conversions</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default WorkflowBuilder;