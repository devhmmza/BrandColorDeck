
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wand2, Loader2 } from 'lucide-react';

import { getAIPalette } from '@/app/actions';
import type { Palette } from '@/lib/palettes';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PaletteDetailView from './PaletteDetailView';

const formSchema = z.object({
  keywords: z.string().min(3, { message: 'Please enter at least 3 characters.' }),
});

type AIPaletteGeneratorProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

export default function AIPaletteGenerator({ isOpen, onOpenChange }: AIPaletteGeneratorProps) {
  const [generatedPalette, setGeneratedPalette] = useState<Palette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { keywords: '' },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError(null);
    setGeneratedPalette(null);
    const result = await getAIPalette(values.keywords);
    if (result.success && result.palette) {
      setGeneratedPalette({
        id: `ai-${Date.now()}`,
        name: `AI: ${values.keywords}`,
        colors: result.palette.colors,
        tags: ['AI Generated'],
      });
    } else {
      setError(result.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  };
  
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      form.reset();
      setGeneratedPalette(null);
      setError(null);
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="h-5 w-5 text-primary" />
            AI Palette Generator
          </DialogTitle>
          <DialogDescription>
            Describe the vibe, theme, or colors you're looking for, and let AI create a unique palette for you.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Gothic library', '80s retro sunset', 'deep ocean tranquility'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Palette
            </Button>
          </form>
        </Form>
        
        {error && (
            <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {generatedPalette && (
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Generated Palette</h3>
                <PaletteDetailView palette={generatedPalette} />
            </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
