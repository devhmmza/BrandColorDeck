
'use client';

import { Palette } from "@/lib/palettes";
import { hexToRgb, copyTextToClipboard } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";

type PaletteDetailViewProps = {
  palette: Palette;
};

export default function PaletteDetailView({ palette }: PaletteDetailViewProps) {
  const { toast } = useToast();

  const handleCopy = async (color: string) => {
    const success = await copyTextToClipboard(color);
    if (success) {
      toast({
        title: "Copied!",
        description: `${color} copied to clipboard.`,
      });
    } else {
      toast({
        title: "Failed to copy",
        description: "Could not copy color to clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {palette.tags.map((tag) => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {palette.colors.map((color) => (
          <div key={color} className="flex flex-col gap-2 group">
            <div
              className="h-32 w-full rounded-md border"
              style={{ backgroundColor: color }}
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-semibold tracking-tighter">{color.toUpperCase()}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {hexToRgb(color)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(color)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
