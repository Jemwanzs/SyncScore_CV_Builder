import { FileText, Sparkles } from 'lucide-react';

export const FloatingCVElements = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 animate-pulse" />
      
      {/* Sparkling stars */}
      <div className="absolute top-10 left-10 animate-bounce">
        <Sparkles className="w-6 h-6 text-accent" />
      </div>
      <div className="absolute top-32 right-16 animate-bounce delay-100">
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <div className="absolute bottom-40 left-20 animate-bounce delay-200">
        <Sparkles className="w-5 h-5 text-secondary" />
      </div>
      <div className="absolute top-1/2 right-1/3 animate-bounce delay-300">
        <Sparkles className="w-3 h-3 text-accent" />
      </div>

      {/* Floating CV documents */}
      <div className="absolute top-20 right-20 animate-float">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-48 transform rotate-6 hover:rotate-0 transition-transform">
          <FileText className="w-8 h-8 mb-3 text-primary" />
          <div className="space-y-2">
            <div className="h-2 bg-primary/20 rounded w-3/4" />
            <div className="h-2 bg-secondary/20 rounded w-full" />
            <div className="h-2 bg-accent/20 rounded w-2/3" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium">James_Sammy_Resume.pdf</p>
        </div>
      </div>

      <div className="absolute bottom-32 right-32 animate-float delay-200">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-48 transform -rotate-3 hover:rotate-0 transition-transform">
          <FileText className="w-8 h-8 mb-3 text-secondary" />
          <div className="space-y-2">
            <div className="h-2 bg-secondary/20 rounded w-2/3" />
            <div className="h-2 bg-primary/20 rounded w-full" />
            <div className="h-2 bg-accent/20 rounded w-3/4" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium">Bright_Fortune_CV_2024.pdf</p>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float delay-100">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 w-48 hover:scale-105 transition-transform">
          <FileText className="w-8 h-8 mb-3 text-accent" />
          <div className="space-y-2">
            <div className="h-2 bg-accent/20 rounded w-full" />
            <div className="h-2 bg-primary/20 rounded w-2/3" />
            <div className="h-2 bg-secondary/20 rounded w-3/4" />
          </div>
          <p className="text-xs text-muted-foreground mt-3 font-medium">Libbie_Sonia_Professional_CV.pdf</p>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-1/3 left-1/4 animate-float delay-300">
        <div className="bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm rounded-full w-32 h-32 flex items-center justify-center shadow-xl">
          <FileText className="w-12 h-12 text-white" />
        </div>
      </div>

      <div className="absolute bottom-1/4 left-1/3 animate-float delay-400">
        <div className="bg-gradient-to-br from-accent/30 to-primary/30 backdrop-blur-sm rounded-lg w-40 h-24 flex items-center justify-center shadow-xl transform -rotate-12">
          <div className="text-center text-white">
            <FileText className="w-8 h-8 mx-auto mb-2" />
            <p className="text-xs font-semibold">Create Amazing CVs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
