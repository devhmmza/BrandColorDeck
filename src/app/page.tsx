import { palettes, categories } from '@/lib/palettes';
import ColorWeaverClient from '@/components/ColorWeaverClient';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense>
      <ColorWeaverClient palettes={palettes} categories={categories} />
    </Suspense>
  );
}
