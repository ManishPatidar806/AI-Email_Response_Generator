
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Mail, Sparkles, Copy, Download, RefreshCw, Check, Loader2 } from "lucide-react";

interface ApiResponse {
  reply: string;
}

const Index = () => {
  const [originalEmail, setOriginalEmail] = useState('');
  const [selectedTone, setSelectedTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const { toast } = useToast();
  const outputRef = useRef<HTMLTextAreaElement>(null);

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-appropriate' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'formal', label: 'Formal', description: 'Very structured and official' },
    { value: 'casual', label: 'Casual', description: 'Relaxed and informal' },
    { value: 'apologetic', label: 'Apologetic', description: 'Expressing regret or sympathy' },
    { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic and positive' }
  ];

  const generateReply = async () => {
    if (!originalEmail.trim() || !selectedTone) {
      toast({
        title: "Missing Information",
        description: "Please provide the original email and select a tone.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    console.log('Generating reply for email:', originalEmail.substring(0, 50) + '...');
    console.log('Selected tone:', selectedTone);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/email/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalEmail: originalEmail,
          tone: selectedTone
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const ApiResponse = await response.text();
      setGeneratedReply(ApiResponse);
      setShowOutput(true);
      
      toast({
        title: "Reply Generated Successfully!",
        description: "Your professional email reply is ready.",
      });
    } catch (error) {
      console.error('Error generating reply:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate reply. Please check if the backend service is running.",
        variant: "destructive"
      });
      
      // Fallback demo reply for development
      const demoReply = `Dear [Recipient],

Thank you for your email. I appreciate you taking the time to reach out.

I understand your request and will be happy to assist you with this matter. Let me review the details and get back to you with a comprehensive response by [date].

If you have any urgent concerns or additional information that might be helpful, please don't hesitate to let me know.

Best regards,
[Your Name]`;
      
      setGeneratedReply(demoReply);
      setShowOutput(true);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply);
      setIsCopied(true);
      toast({
        title: "Copied to Clipboard",
        description: "The email reply has been copied successfully.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadReply = () => {
    const blob = new Blob([generatedReply], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-reply.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Your email reply is being downloaded.",
    });
  };

  const clearAll = () => {
    setOriginalEmail('');
    setSelectedTone('');
    setGeneratedReply('');
    setShowOutput(false);
    setIsCopied(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      generateReply();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Email Writer</h1>
          <p className="text-xl text-gray-600">Generate professional email replies instantly</p>
        </div>

        {/* Main Input Card */}
        <Card className="mb-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
              <Mail className="h-6 w-6 text-blue-600" />
              Compose Your Reply
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Original Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Original Email Content
              </label>
              <Textarea
                placeholder="Paste the original email you want to reply to..."
                value={originalEmail}
                onChange={(e) => setOriginalEmail(e.target.value)}
                className="min-h-[200px] text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                onKeyDown={handleKeyPress}
              />
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Press Ctrl+Enter to generate</span>
                <span>{originalEmail.length} characters</span>
              </div>
            </div>

            {/* Tone Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Reply Tone
              </label>
              <Select value={selectedTone} onValueChange={setSelectedTone}>
                <SelectTrigger className="w-full border-2 border-gray-200 focus:border-blue-500">
                  <SelectValue placeholder="Select the tone for your reply" />
                </SelectTrigger>
                <SelectContent>
                  {toneOptions.map((tone) => (
                    <SelectItem key={tone.value} value={tone.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{tone.label}</span>
                        <span className="text-xs text-gray-500">{tone.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button
              onClick={generateReply}
              disabled={!originalEmail.trim() || !selectedTone || isLoading}
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Reply...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Reply
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        {showOutput && (
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm animate-fade-in">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                <Check className="h-6 w-6 text-green-600" />
                Generated Reply
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generated Reply Display */}
              <div className="space-y-2">
                <Textarea
                  ref={outputRef}
                  value={generatedReply}
                  onChange={(e) => setGeneratedReply(e.target.value)}
                  className="min-h-[300px] text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                  placeholder="Your generated reply will appear here..."
                />
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Feel free to edit the generated reply</span>
                  <div className="flex gap-4">
                    <span>{generatedReply.length} characters</span>
                    <span>{generatedReply.split(/\s+/).filter(word => word.length > 0).length} words</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={copyToClipboard}
                  className="flex-1 min-w-[120px] bg-green-600 hover:bg-green-700"
                >
                  {isCopied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
                <Button
                  onClick={downloadReply}
                  variant="outline"
                  className="flex-1 min-w-[120px] border-2 hover:bg-gray-50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="flex-1 min-w-[120px] border-2 hover:bg-gray-50"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Reply generated successfully
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-sm">
            Powered by AI • Create professional email replies in seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
