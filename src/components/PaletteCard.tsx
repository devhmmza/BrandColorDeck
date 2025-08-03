
'use client';

import { Palette } from '@/lib/palettes';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import PaletteDetailView from './PaletteDetailView';

type PaletteCardProps = {
  palette: Palette;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
};

export default function PaletteCard({ palette, isFavorite, onToggleFavorite }: PaletteCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex h-32">
              {palette.colors.map((color) => (
                <div key={color} className="flex-1 transition-all duration-300 group-hover:flex-grow-[1.2]" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="p-4 flex justify-between items-center">
              <h3 className="font-semibold text-sm">{palette.name}</h3>
              <button onClick={(e) => { e.stopPropagation(); onToggleFavorite(palette.id); }}>
                <Heart className={cn('h-5 w-5 text-muted-foreground transition-colors hover:text-destructive', isFavorite && 'fill-destructive text-destructive')} />
                <span className="sr-only">Favorite</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{palette.name}</DialogTitle>
        </DialogHeader>
        <PaletteDetailView palette={palette} />
      </DialogContent>
    </Dialog>
  );
}
