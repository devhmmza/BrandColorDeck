
import { z } from 'zod';

export const GeneratePaletteInputSchema = z.object({
  keywords: z.string().describe('Keywords describing the desired color palette aesthetic.'),
});
export type GeneratePaletteInput = z.infer<typeof GeneratePaletteInputSchema>;

export const GeneratePaletteOutputSchema = z.object({
  colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/)).describe('An array of hex color codes.'),
});
export type GeneratePaletteOutput = z.infer<typeof GeneratePaletteOutputSchema>;
