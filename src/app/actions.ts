
'use server';

import { generatePaletteFromKeywords } from '@/ai/flows/generate-palette-from-keywords';
import { GeneratePaletteOutputSchema } from '@/ai/schemas';
import { z } from 'zod';

const ActionResponseSchema = z.object({
  success: z.boolean(),
  palette: GeneratePaletteOutputSchema.optional(),
  error: z.string().optional(),
});

type ActionResponse = z.infer<typeof ActionResponseSchema>;

export async function getAIPalette(keywords: string): Promise<ActionResponse> {
  if (!keywords || typeof keywords !== 'string' || keywords.trim().length === 0) {
    return { success: false, error: 'Keywords are required.' };
  }

  try {
    const result = await generatePaletteFromKeywords({ keywords });
    if (!result || !result.colors || result.colors.length === 0) {
      return { success: false, error: 'AI could not generate a palette. Please try different keywords.' };
    }
    return { success: true, palette: result };
  } catch (error) {
    console.error('Error generating AI palette:', error);
    return { success: false, error: 'An unexpected error occurred. Please try again later.' };
  }
}
