import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  EyeOff, 
  Type, 
  Contrast, 
  MousePointer, 
  Keyboard,
  Volume2,
  VolumeX
} from 'lucide-react';

interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  keyboardNavigation: boolean;
  soundEnabled: boolean;
}

export const AccessibilityToolbar: React.FC = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    soundEnabled: true,
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('accessibility-settings');
    if (saved) {
      const parsedSettings = JSON.parse(saved);
      setSettings(parsedSettings);
      applySettings(parsedSettings);
    }
  }, []);

  const updateSetting = (key: keyof AccessibilitySettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('accessibility-settings', JSON.stringify(newSettings));
    applySettings(newSettings);
  };

  const applySettings = (settings: AccessibilitySettings) => {
    const root = document.documentElement;
    
    // High contrast
    root.classList.toggle('high-contrast', settings.highContrast);
    
    // Large text
    root.classList.toggle('large-text', settings.largeText);
    
    // Reduced motion
    if (settings.reducedMotion) {
      root.style.setProperty('--transition-smooth', 'none');
      root.style.setProperty('--transition-spring', 'none');
    } else {
      root.style.removeProperty('--transition-smooth');
      root.style.removeProperty('--transition-spring');
    }
    
    // Screen reader announcements
    if (settings.screenReader) {
      announceToScreenReader('Accessibility settings updated');
    }
  };

  const announceToScreenReader = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  };

  // Keyboard navigation enhancement
  useEffect(() => {
    if (settings.keyboardNavigation) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Alt + A: Open accessibility toolbar
        if (e.altKey && e.key === 'a') {
          e.preventDefault();
          setIsOpen(!isOpen);
        }
        
        // Alt + H: Toggle high contrast
        if (e.altKey && e.key === 'h') {
          e.preventDefault();
          updateSetting('highContrast', !settings.highContrast);
        }
        
        // Alt + T: Toggle large text
        if (e.altKey && e.key === 't') {
          e.preventDefault();
          updateSetting('largeText', !settings.largeText);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [settings.keyboardNavigation, isOpen, settings.highContrast, settings.largeText]);

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
        aria-label="Open accessibility options"
      >
        <Eye className="w-4 h-4" />
        <span className="sr-only">Accessibility Options</span>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-y-auto">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Accessibility</CardTitle>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="sm"
            aria-label="Close accessibility options"
          >
            <EyeOff className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* High Contrast */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Contrast className="w-4 h-4" />
            <span className="text-sm">High Contrast</span>
          </div>
          <Button
            onClick={() => updateSetting('highContrast', !settings.highContrast)}
            variant={settings.highContrast ? "default" : "outline"}
            size="sm"
          >
            {settings.highContrast ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Large Text */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Type className="w-4 h-4" />
            <span className="text-sm">Large Text</span>
          </div>
          <Button
            onClick={() => updateSetting('largeText', !settings.largeText)}
            variant={settings.largeText ? "default" : "outline"}
            size="sm"
          >
            {settings.largeText ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MousePointer className="w-4 h-4" />
            <span className="text-sm">Reduce Motion</span>
          </div>
          <Button
            onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
            variant={settings.reducedMotion ? "default" : "outline"}
            size="sm"
          >
            {settings.reducedMotion ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Keyboard Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Keyboard className="w-4 h-4" />
            <span className="text-sm">Keyboard Shortcuts</span>
          </div>
          <Button
            onClick={() => updateSetting('keyboardNavigation', !settings.keyboardNavigation)}
            variant={settings.keyboardNavigation ? "default" : "outline"}
            size="sm"
          >
            {settings.keyboardNavigation ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Sound */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="text-sm">Sound Feedback</span>
          </div>
          <Button
            onClick={() => updateSetting('soundEnabled', !settings.soundEnabled)}
            variant={settings.soundEnabled ? "default" : "outline"}
            size="sm"
          >
            {settings.soundEnabled ? 'ON' : 'OFF'}
          </Button>
        </div>

        {/* Keyboard shortcuts help */}
        {settings.keyboardNavigation && (
          <div className="mt-4 p-3 bg-muted/20 rounded-md">
            <p className="text-xs font-medium mb-2">Keyboard Shortcuts:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>Alt + A: Toggle accessibility panel</div>
              <div>Alt + H: Toggle high contrast</div>
              <div>Alt + T: Toggle large text</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Add these CSS styles to your global CSS
export const accessibilityStyles = `
.high-contrast {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 0 0% 5%;
  --card-foreground: 0 0% 100%;
  --primary: 60 100% 50%;
  --primary-foreground: 0 0% 0%;
  --muted: 0 0% 10%;
  --muted-foreground: 0 0% 90%;
}

.large-text {
  font-size: 1.125rem !important;
}

.large-text h1 { font-size: 2.5rem !important; }
.large-text h2 { font-size: 2rem !important; }
.large-text h3 { font-size: 1.75rem !important; }
.large-text button { font-size: 1.125rem !important; }
.large-text input { font-size: 1.125rem !important; }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;