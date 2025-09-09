import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload,
  Download,
  FileText,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Users,
  AlertTriangle,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";

const LeadImport = () => {
  const [uploadStep, setUploadStep] = useState(1);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");

  // Mock import results
  const importResults = {
    totalRows: 1500,
    successfulImports: 1347,
    duplicates: 98,
    errors: 55,
    validationErrors: [
      { row: 23, field: 'email', issue: 'Invalid email format', value: 'john.doe@' },
      { row: 67, field: 'phone', issue: 'Invalid phone number', value: '123' },
      { row: 89, field: 'company', issue: 'Company name too long', value: 'Very Long Company Name That Exceeds Character Limit' },
      { row: 142, field: 'email', issue: 'Duplicate email address', value: 'jane@company.com' },
      { row: 203, field: 'score', issue: 'Invalid score value', value: '150' }
    ]
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploadStep(2);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploadStep(3);
        }
      }, 200);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/leads">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <Upload className="w-8 h-8 mr-3 text-primary" />
                Import Leads
              </h1>
              <p className="text-muted-foreground">Upload and manage your lead data</p>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Import History
            </Button>
          </div>
        </div>

        {/* Import Steps */}
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-8">
              <div className={`text-center ${uploadStep >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-12 h-12 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${uploadStep >= 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  1
                </div>
                <h3 className="font-semibold">Upload File</h3>
                <p className="text-sm text-muted-foreground">Choose your CSV or Excel file</p>
              </div>
              
              <div className={`text-center ${uploadStep >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-12 h-12 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${uploadStep >= 2 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  2
                </div>
                <h3 className="font-semibold">Validate Data</h3>
                <p className="text-sm text-muted-foreground">Review and map your fields</p>
              </div>
              
              <div className={`text-center ${uploadStep >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-12 h-12 rounded-full border-2 mx-auto mb-4 flex items-center justify-center ${uploadStep >= 3 ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                  3
                </div>
                <h3 className="font-semibold">Import Complete</h3>
                <p className="text-sm text-muted-foreground">Review results and errors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {uploadStep === 1 && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* File Upload */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Upload Lead File</CardTitle>
                <CardDescription>
                  Choose a CSV or Excel file containing your lead data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Drop your file here</h3>
                    <p className="text-muted-foreground">or click to browse</p>
                  </div>
                  <Input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileUpload}
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="hero" className="mt-4">
                      Choose File
                    </Button>
                  </Label>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium mb-2">Supported formats:</p>
                  <ul className="space-y-1">
                    <li>• CSV files (.csv)</li>
                    <li>• Excel files (.xlsx, .xls)</li>
                    <li>• Maximum file size: 10MB</li>
                    <li>• Maximum rows: 50,000</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Import Guidelines */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Import Guidelines</CardTitle>
                <CardDescription>
                  Follow these guidelines for best results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Required Fields</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="outline">Email</Badge>
                      <Badge variant="outline">First Name</Badge>
                      <Badge variant="outline">Last Name</Badge>
                      <Badge variant="outline">Company</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Optional Fields</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Badge variant="secondary">Phone</Badge>
                      <Badge variant="secondary">Position</Badge>
                      <Badge variant="secondary">Website</Badge>
                      <Badge variant="secondary">Source</Badge>
                      <Badge variant="secondary">Score</Badge>
                      <Badge variant="secondary">Tags</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Data Format Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use valid email addresses (user@domain.com)</li>
                    <li>• Phone numbers with country codes (+1234567890)</li>
                    <li>• Company names without special characters</li>
                    <li>• Lead scores between 0-100</li>
                    <li>• Separate multiple tags with semicolons</li>
                  </ul>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Sample CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {uploadStep === 2 && (
          <Card className="bg-gradient-card border-border/50">
            <CardHeader>
              <CardTitle>Processing: {fileName}</CardTitle>
              <CardDescription>
                Uploading and validating your lead data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Upload Progress</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-3" />
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,500</div>
                  <div className="text-sm text-muted-foreground">Total Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">1,347</div>
                  <div className="text-sm text-muted-foreground">Valid Rows</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">153</div>
                  <div className="text-sm text-muted-foreground">Issues Found</div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <RefreshCw className="w-8 h-8 animate-spin text-primary" />
              </div>
            </CardContent>
          </Card>
        )}

        {uploadStep === 3 && (
          <div className="space-y-8">
            {/* Import Results Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Processed</p>
                      <p className="text-3xl font-bold text-primary">{importResults.totalRows.toLocaleString()}</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Successfully Imported</p>
                      <p className="text-3xl font-bold text-green-500">{importResults.successfulImports.toLocaleString()}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-500/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Duplicates Skipped</p>
                      <p className="text-3xl font-bold text-yellow-500">{importResults.duplicates}</p>
                    </div>
                    <Users className="w-8 h-8 text-yellow-500/50" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-card border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Errors</p>
                      <p className="text-3xl font-bold text-red-500">{importResults.errors}</p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-500/50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Validation Errors */}
            <Card className="bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Validation Issues
                </CardTitle>
                <CardDescription>
                  Review and fix these issues before re-importing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {importResults.validationErrors.map((error, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-red-500/10 rounded-full flex items-center justify-center">
                          <XCircle className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <div className="font-medium">Row {error.row}: {error.issue}</div>
                          <div className="text-sm text-muted-foreground">
                            Field: <span className="font-medium">{error.field}</span> | 
                            Value: <span className="font-medium">"{error.value}"</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="destructive">Error</Badge>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Error Report
                  </Button>
                  <div className="space-x-3">
                    <Button variant="outline" onClick={() => setUploadStep(1)}>
                      Import Another File
                    </Button>
                    <Button variant="hero" asChild>
                      <Link to="/leads">
                        View Imported Leads
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LeadImport;