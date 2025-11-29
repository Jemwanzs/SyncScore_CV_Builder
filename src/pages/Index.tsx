import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CVData, TemplateType } from '@/types/cv';
import { CVEditor } from '@/components/cv/CVEditor';
import { ColorPicker } from '@/components/cv/ColorPicker';
import { ModernTemplate } from '@/components/cv/templates/ModernTemplate';
import { CreativeTemplate } from '@/components/cv/templates/CreativeTemplate';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Eye, Edit3, Palette, LogOut, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser, logout, decrementDownloads } from '@/lib/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import html2pdf from 'html2pdf.js';

const defaultCVData: CVData = {
  personalInfo: {
    fullName: 'John Doe',
    title: 'Senior Software Engineer',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with 8+ years of expertise in building scalable web applications. **Passionate** about clean code and innovative solutions.\n• Led cross-functional teams\n• Delivered multiple high-impact projects'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2020-01',
      endDate: '',
      current: true,
      description: '• Architected and developed microservices handling 1M+ daily requests\n• Mentored 5 junior developers\n• **Improved** system performance by 40%'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2012-09',
      endDate: '2016-05',
      current: false,
      gpa: '3.8'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript/TypeScript', level: 95 },
    { id: '2', name: 'React & Next.js', level: 90 },
    { id: '3', name: 'Node.js', level: 85 },
    { id: '4', name: 'PostgreSQL', level: 80 }
  ],
  publications: [],
  awards: [],
  volunteering: [],
  hobbies: [],
  references: [],
  customSections: [],
  sectionTitles: {
    experience: 'Work Experience',
    education: 'Education',
    skills: 'Skills',
    publications: 'Publications',
    awards: 'Awards & Certifications',
    volunteering: 'Volunteering & Leadership',
    hobbies: 'Hobbies & Interests',
    references: 'References'
  },
  sectionOrder: ['experience', 'education', 'skills', 'publications', 'awards', 'volunteering', 'hobbies', 'references'],
  colorScheme: {
    primary: '#059669',
    secondary: '#0d9488',
    accent: '#f97316'
  }
};

const Index = () => {
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    publications: [],
    awards: [],
    volunteering: [],
    hobbies: [],
    references: [],
    customSections: [],
    sectionTitles: {
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills',
      publications: 'Publications',
      awards: 'Awards & Certifications',
      volunteering: 'Volunteering & Leadership',
      hobbies: 'Hobbies & Interests',
      references: 'References'
    },
    sectionOrder: ['experience', 'education', 'skills', 'publications', 'awards', 'volunteering', 'hobbies', 'references'],
    colorScheme: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6'
    }
  });
  const [template, setTemplate] = useState<TemplateType>('modern');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const { toast } = useToast();
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cvData');
    if (saved) {
      try {
        setCvData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load CV data', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('cvData', JSON.stringify(cvData));
  }, [cvData]);

  const handleExportPDF = async () => {
    if (!user?.isActivated) {
      toast({
        title: 'Account Not Activated',
        description: 'Please activate your account to download CVs',
        variant: 'destructive'
      });
      return;
    }

    if (user.downloadsRemaining <= 0) {
      toast({
        title: 'Download Limit Reached',
        description: 'You have used all your downloads. Please contact support.',
        variant: 'destructive'
      });
      return;
    }

    try {
      toast({
        title: 'Generating PDF',
        description: 'Please wait while your CV is being prepared...'
      });

      const element = document.getElementById('cv-preview');
      
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number], // slim margins in mm: top, left, bottom, right
        filename: `${cvData.personalInfo.fullName}_CV.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
      };

      await html2pdf().set(opt).from(element).save();

      // Decrement downloads
      const result = decrementDownloads();
      
      toast({
        title: 'PDF Downloaded',
        description: `Your CV has been downloaded. ${result.remaining} downloads remaining.`
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: 'Download Failed',
        description: 'There was an error generating your PDF. Please try again.',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={cvData} />;
      case 'creative':
        return <CreativeTemplate data={cvData} />;
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-orange-50">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                CV
              </h1>
              <p className="text-sm text-muted-foreground">
                Professional CV Builder • {user?.email}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              {user?.isActivated && (
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                title="downloads left"
                >
                  {user.downloadsRemaining} trials
                </div>
              )}
              <Button
                variant={view === 'edit' ? 'default' : 'outline'}
                onClick={() => setView('edit')}
                size="sm"
                disabled={!user?.isActivated}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              {/*<Button
                variant={view === 'preview' ? 'default' : 'outline'}
                onClick={() => setView('preview')}
                size="sm"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>*/}
              <Button
                variant={view === 'preview' ? 'default' : 'outline'}
                onClick={() => setView('preview')}
                size="sm"
                title="Preview" // hover tooltip
              >
                <Eye className="h-4 w-4" />
              </Button>

              <Button onClick={handleExportPDF} size="sm" disabled={!user?.isActivated || user.downloadsRemaining <= 0}>
                <Download className="h-4 w-4 mr-2" />
                Print PDF
              </Button>
              <Button onClick={handleLogout} size="sm" variant="ghost">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!user?.isActivated && (
          <Alert className="mb-6 border-accent bg-accent/10">
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription>
              Your email is pending activation. You can preview CVs but cannot edit or download until activated.{' '}
              <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/activation')}>
                Enter activation code
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {user?.isActivated && user.downloadsRemaining <= 0 && (
          <Alert className="mb-6 border-destructive bg-destructive/10">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <AlertDescription>
              You have used all your downloads.{' '}
              <Button variant="link" className="p-0 h-auto text-destructive underline" onClick={() => navigate('/activation')}>
                Renew access
              </Button>
              {' '}to continue downloading.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          {view === 'edit' && (
            <div className="space-y-6">
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">
                    <Edit3 className="h-4 w-4 mr-2" />
                    Content
                  </TabsTrigger>
                  <TabsTrigger value="style">
                    <Palette className="h-4 w-4 mr-2" />
                    Style
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-6 mt-6">
                  <CVEditor data={cvData} onChange={setCvData} />
                </TabsContent>
                
                <TabsContent value="style" className="space-y-6 mt-6">
                  <ColorPicker
                    colorScheme={cvData.colorScheme}
                    onChange={(colors) => setCvData({ ...cvData, colorScheme: colors })}
                  />
                  
                  <div className="bg-card p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold mb-4">Template</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setTemplate('modern')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          template === 'modern' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-emerald-100 to-teal-100 rounded mb-2" />
                        <p className="font-medium text-center">Modern</p>
                      </button>
                      <button
                        onClick={() => setTemplate('creative')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          template === 'creative' 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="aspect-[3/4] bg-gradient-to-r from-emerald-600 to-teal-600 rounded mb-2" />
                        <p className="font-medium text-center">Creative</p>
                      </button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Preview Panel */}
          <div className={`${view === 'edit' ? '' : 'col-span-1 lg:col-span-2'}`}>
            <div id="cv-preview" className="bg-white rounded-lg shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          /* Hide everything except the CV */
          body > div:not(#root) {
            display: none !important;
          }
          
          header,
          button,
          .sticky,
          nav,
          [class*="tab"],
          [class*="Tab"] {
            display: none !important;
          }
          
          /* Show only the CV preview */
          #cv-preview {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: auto !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          
          #cv-preview * {
            visibility: visible !important;
          }
          
          /* Hide all parent containers except those containing the CV */
          .container,
          .grid,
          .gap-8 {
            all: unset !important;
            display: block !important;
          }
          
          /* Ensure proper page breaks */
          .cv-section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
