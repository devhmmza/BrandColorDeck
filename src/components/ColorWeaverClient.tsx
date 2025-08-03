
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { type Palette, type categories as CategoryType } from '@/lib/palettes';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Wand2 } from 'lucide-react';

import Header from './Header';
import Footer from './Footer';
import PaletteCard from './PaletteCard';
import AIPaletteGenerator from './AIPaletteGenerator';

type ColorWeaverClientProps = {
  palettes: Palette[];
  categories: typeof CategoryType;
};

export default function ColorWeaverClient({ palettes, categories }: ColorWeaverClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [favorites, setFavorites] = useLocalStorage<string[]>('favorite-palettes', []);
  const [isAiGeneratorOpen, setIsAiGeneratorOpen] = useState(false);
  const [randomPalette, setRandomPalette] = useState<Palette | null>(null);

  const filteredPalettes = useMemo(() => {
    return palettes
      .filter((p) => {
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Favorites') return favorites.includes(p.id);
        return p.tags.includes(activeCategory);
      })
      .filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
  }, [palettes, activeCategory, searchQuery, favorites]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };
  
  const showRandomPalette = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * palettes.length);
    setRandomPalette(palettes[randomIndex]);
  }, [palettes]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        showRandomPalette();
      }
      if (e.code === 'Escape' && randomPalette) {
        setRandomPalette(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [randomPalette, showRandomPalette]);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-background font-body">
        <Header />
        <main className="flex-grow">
          <section className="text-center py-16 md:py-24 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tighter font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            >
              BrandColorDeck
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-2xl mx-auto mt-4 text-muted-foreground md:text-xl"
            >
              Explore 2000+ stunning color palettes. Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">Space</kbd> to discover a new palette.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <Button onClick={() => setIsAiGeneratorOpen(true)}>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
            </motion.div>
          </section>

          <div className="container max-w-screen-2xl mx-auto px-4 pb-16">
            <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-[57px] z-40 bg-background/80 backdrop-blur-sm py-4 -my-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search palettes by name or tag (e.g., 'Google', 'Vintage')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
                <TabsList className="w-full md:w-auto overflow-x-auto">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Favorites">Favorites</TabsTrigger>
                  {categories.map(cat => <TabsTrigger key={cat} value={cat}>{cat}</TabsTrigger>)}
                </TabsList>
              </Tabs>
            </div>
            
            <AnimatePresence>
              <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredPalettes.map((palette) => (
                  <motion.div layout key={palette.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <PaletteCard
                      palette={palette}
                      isFavorite={favorites.includes(palette.id)}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
            
            {filteredPalettes.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg font-semibold">No palettes found</p>
                    <p>Try adjusting your search or filters.</p>
                </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
      
      <AIPaletteGenerator
        isOpen={isAiGeneratorOpen}
        onOpenChange={setIsAiGeneratorOpen}
      />

      <AnimatePresence>
        {randomPalette && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setRandomPalette(null)}
              className="absolute top-4 right-4 z-20 bg-black/20 hover:bg-black/40 text-white hover:text-white"
            >
              <X />
            </Button>
            {randomPalette.colors.map((color, index) => (
              <motion.div
                key={color}
                className="flex-1 flex items-center justify-center"
                style={{ backgroundColor: color }}
                initial={{ height: 0 }}
                animate={{ height: '100%' }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: "easeInOut" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="font-mono text-lg font-semibold text-white"
                  style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}
                >
                  {color.toUpperCase()}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
