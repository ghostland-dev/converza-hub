import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Mail, 
  Smartphone, 
  Calendar, 
  Users, 
  Target,
  Save,
  Send,
  Eye,
  Plus,
  X,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const CreateCampaign = () => {
  const [step, setStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    name: "",
    type: "",
    subject: "",
    previewText: "",
    content: "",
    audience: "",
    scheduleType: "now",
    scheduleDate: "",
    scheduleTime: "",
    enableAB: false,
    tags: [] as string[],
    goals: {
      opens: 25,
      clicks: 5,
      conversions: 2
    }
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleInputChange = (field: string, value: any) => {
    setCampaignData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = (tag: string) => {
    if (tag && !campaignData.tags.includes(tag)) {
      setCampaignData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setCampaignData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Campaign Basics
              </CardTitle>
              <CardDescription>
                Set up the fundamental details of your campaign
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Spring Product Launch"
                  value={campaignData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campaign type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Campaign
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center">
                        <Smartphone className="w-4 h-4 mr-2" />
                        SMS Campaign
                      </div>
                    </SelectItem>
                    <SelectItem value="mixed">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-1" />
                        <Smartphone className="w-4 h-4 mr-2" />
                        Email + SMS
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select onValueChange={(value) => handleInputChange('audience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Leads (12,847)</SelectItem>
                    <SelectItem value="qualified">Qualified Leads (8,921)</SelectItem>
                    <SelectItem value="hot">Hot Leads (3,421)</SelectItem>
                    <SelectItem value="cold">Cold Leads (1,505)</SelectItem>
                    <SelectItem value="custom">Custom Segment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable A/B Testing</Label>
                    <p className="text-sm text-muted-foreground">
                      Test different versions to optimize performance
                    </p>
                  </div>
                  <Switch
                    checked={campaignData.enableAB}
                    onCheckedChange={(checked) => handleInputChange('enableAB', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Content & Message
              </CardTitle>
              <CardDescription>
                Create your campaign content and subject line
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  placeholder="Write a compelling subject line..."
                  value={campaignData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Keep it under 50 characters for better mobile display
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preview">Preview Text</Label>
                <Input
                  id="preview"
                  placeholder="This appears after the subject line..."
                  value={campaignData.previewText}
                  onChange={(e) => handleInputChange('previewText', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your email content here..."
                  value={campaignData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={10}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add CTA Button
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>

              {/* Template Suggestions */}
              <div className="space-y-3">
                <Label>Quick Templates</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="sm" className="h-auto p-3 text-left">
                    <div>
                      <div className="font-medium text-sm">Welcome Series</div>
                      <div className="text-xs text-muted-foreground">New lead nurturing</div>
                    </div>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto p-3 text-left">
                    <div>
                      <div className="font-medium text-sm">Product Demo</div>
                      <div className="text-xs text-muted-foreground">Feature showcase</div>
                    </div>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto p-3 text-left">
                    <div>
                      <div className="font-medium text-sm">Special Offer</div>
                      <div className="text-xs text-muted-foreground">Promotional campaign</div>
                    </div>
                  </Button>
                  <Button variant="outline" size="sm" className="h-auto p-3 text-left">
                    <div>
                      <div className="font-medium text-sm">Webinar Invite</div>
                      <div className="text-xs text-muted-foreground">Event promotion</div>
                    </div>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule & Settings
              </CardTitle>
              <CardDescription>
                Configure when and how your campaign will be sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Send Schedule</Label>
                <Select onValueChange={(value) => handleInputChange('scheduleType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="When to send?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Immediately</SelectItem>
                    <SelectItem value="scheduled">Schedule for Later</SelectItem>
                    <SelectItem value="optimal">AI Optimal Time</SelectItem>
                    <SelectItem value="drip">Drip Campaign</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {campaignData.scheduleType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                      type="date"
                      value={campaignData.scheduleDate}
                      onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <Input
                      type="time"
                      value={campaignData.scheduleTime}
                      onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Campaign Goals */}
              <div className="space-y-4">
                <Label>Campaign Goals</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Open Rate %</Label>
                    <Input
                      type="number"
                      value={campaignData.goals.opens}
                      onChange={(e) => handleInputChange('goals', { ...campaignData.goals, opens: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Click Rate %</Label>
                    <Input
                      type="number"
                      value={campaignData.goals.clicks}
                      onChange={(e) => handleInputChange('goals', { ...campaignData.goals, clicks: Number(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Conversion %</Label>
                    <Input
                      type="number"
                      value={campaignData.goals.conversions}
                      onChange={(e) => handleInputChange('goals', { ...campaignData.goals, conversions: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Campaign Tags</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {campaignData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTag((e.target as HTMLInputElement).value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }}
                  />
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Review & Launch
              </CardTitle>
              <CardDescription>
                Review your campaign settings before sending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Campaign Summary */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Campaign Name</Label>
                    <div className="font-medium">{campaignData.name || "Untitled Campaign"}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Type</Label>
                    <div className="font-medium capitalize">{campaignData.type || "Not selected"}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Audience</Label>
                    <div className="font-medium">{campaignData.audience || "Not selected"}</div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Schedule</Label>
                    <div className="font-medium capitalize">{campaignData.scheduleType || "Now"}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Subject Line</Label>
                  <div className="font-medium">{campaignData.subject || "No subject"}</div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Preview Text</Label>
                  <div className="text-sm text-muted-foreground">{campaignData.previewText || "No preview text"}</div>
                </div>
              </div>

              {/* Estimated Performance */}
              <div className="space-y-4 p-4 bg-muted/20 rounded-lg">
                <Label className="text-sm font-medium">Estimated Performance</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2,847</div>
                    <div className="text-sm text-muted-foreground">Est. Opens</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">421</div>
                    <div className="text-sm text-muted-foreground">Est. Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-glow">84</div>
                    <div className="text-sm text-muted-foreground">Est. Conversions</div>
                  </div>
                </div>
              </div>

              {/* Pre-send Checklist */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Pre-send Checklist</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Subject line added</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Content created</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Audience selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Schedule configured</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
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
              <h1 className="text-3xl font-bold">Create New Campaign</h1>
              <p className="text-muted-foreground">Step {step} of {totalSteps}</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            {step === totalSteps && (
              <Button variant="hero">
                <Send className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className={`text-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${step >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  1
                </div>
                <span className="text-xs">Basics</span>
              </div>
              <div className={`text-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${step >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  2
                </div>
                <span className="text-xs">Content</span>
              </div>
              <div className={`text-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${step >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  3
                </div>
                <span className="text-xs">Schedule</span>
              </div>
              <div className={`text-center ${step >= 4 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-8 h-8 rounded-full border-2 mx-auto mb-2 flex items-center justify-center ${step >= 4 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  4
                </div>
                <span className="text-xs">Review</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button 
            variant="hero" 
            onClick={handleNext}
            disabled={step === totalSteps}
          >
            {step === totalSteps ? 'Ready to Launch' : 'Next Step'}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateCampaign;