import {nextHandler} from '@genkit-ai/next';

// This route handler is essential for the Genkit AI framework to properly function within the Next.js environment.
// It exposes the Genkit flows, such as the palette generator, as callable API endpoints.
export const {GET, POST} = nextHandler();
