// The generatePaletteFromKeywords flow generates a color palette based on user-provided keywords.
// It takes keywords as input and returns a JSON object containing an array of hex color codes.

'use server';

import {ai} from '@/ai/genkit';
import { GeneratePaletteInputSchema, GeneratePaletteOutputSchema, type GeneratePaletteInput, type GeneratePaletteOutput } from '@/ai/schemas';

export async function generatePaletteFromKeywords(input: GeneratePaletteInput): Promise<GeneratePaletteOutput> {
  return generatePaletteFromKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePalettePrompt',
  input: {schema: GeneratePaletteInputSchema},
  output: {schema: GeneratePaletteOutputSchema},
  prompt: `You are a color palette generator. Generate a color palette consisting of 4-6 hex codes, based on the following keywords: {{{keywords}}}. Return the palette as a JSON object with a single key called "colors", which is an array of hex color codes. Ensure that all colors are valid hex codes. Do not include any commentary or extraneous text in your response. For example:

{
  "colors": ["#f0f8ff", "#e6e6fa", "#d8bfd8", "#d8bfd8"]
}`, 
});

const generatePaletteFromKeywordsFlow = ai.defineFlow(
  {
    name: 'generatePaletteFromKeywordsFlow',
    inputSchema: GeneratePaletteInputSchema,
    outputSchema: GeneratePaletteOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
