
export type Palette = {
  id: string;
  name: string;
  colors: string[];
  tags: string[];
};

export const categories = ["Minimal", "Cyberpunk", "Vintage", "Pastel", "Brand", "Dark", "Gradient"];

export const palettes: Palette[] = [
  { id: "1", name: "Google", colors: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"], tags: ["Brand"] },
  { id: "2", name: "Apple", colors: ["#A2AAAD", "#000000", "#F9F6EF"], tags: ["Brand", "Minimal"] },
  { id: "3", name: "Cyberpunk Night", colors: ["#0ff", "#f0f", "#ff0", "#00f"], tags: ["Cyberpunk", "Dark"] },
  { id: "4", name: "Vintage Cafe", colors: ["#4a442d", "#a4915b", "#e3d3b4", "#f4f0e9"], tags: ["Vintage"] },
  { id: "5", name: "Pastel Dream", colors: ["#ffb3ba", "#ffdfba", "#ffffba", "#baffc9"], tags: ["Pastel"] },
  { id: "6", name: "Minimalist Gray", colors: ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da"], tags: ["Minimal"] },
  { id: "7", name: "Ocean Gradient", colors: ["#2193b0", "#6dd5ed"], tags: ["Gradient"] },
  { id: "8", name: "Coca-Cola", colors: ["#F40009", "#FFFFFF", "#000000"], tags: ["Brand"] },
  { id: "9", name: "Neon Glow", colors: ["#39ff14", "#fe019a", "#01fef4", "#fef601"], tags: ["Cyberpunk", "Dark"] },
  { id: "10", name: "70s Groove", colors: ["#f2994a", "#f2c94c", "#27ae60", "#eb5757"], tags: ["Vintage"] },
  { id: "11", name: "Cotton Candy", colors: ["#a0e9ff", "#a1c4fd", "#ffc2d1", "#ffb3c1"], tags: ["Pastel", "Gradient"] },
  { id: "12", name: "Charcoal Slate", colors: ["#232526", "#414345"], tags: ["Minimal", "Dark", "Gradient"] },
  { id: "13", name: "Forest Hike", colors: ["#2c5d3d", "#5d8a6b", "#a0c2a5", "#d6e6d7"], tags: ["Vintage"] },
  { id: "14", name: "Meta", colors: ["#0062E0", "#19A6FF", "#7B42FF"], tags: ["Brand", "Gradient"] },
  { id: "15", name: "Blade Runner", colors: ["#000814", "#001d3d", "#003566", "#ffc300", "#ffd60a"], tags: ["Cyberpunk", "Dark"] },
  { id: "16", name: "Sunset Boulevard", colors: ["#ff9966", "#ff5e62"], tags: ["Gradient", "Vintage"] },
  { id: "17", name: "IKEA", colors: ["#0051BA", "#FFDA1A"], tags: ["Brand"] },
  { id: "18", name: "Lavender Bliss", colors: ["#e6e6fa", "#d8bfd8", "#b0c4de"], tags: ["Pastel"] },
  { id: "19", name: "Monochrome", colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"], tags: ["Minimal"] },
  { id: "20", name: "T-Mobile", colors: ["#E20074"], tags: ["Brand"] },
  { id: "21", name: "Matrix Code", colors: ["#000000", "#003B00", "#008F11", "#00FF41"], tags: ["Cyberpunk", "Dark"] },
  { id: "22", name: "Polaroid Film", colors: ["#bca89f", "#8a7e78", "#5a534f", "#e6d9d3"], tags: ["Vintage"] },
  { id: "23", name: "Minty Fresh", colors: ["#98FB98", "#AFEEEE", "#E0FFFF"], tags: ["Pastel"] },
  { id: "24", name: "Deep Space", colors: ["#000000", "#1E1E1E", "#3C3C3C", "#5A5A5A"], tags: ["Dark", "Minimal"] },
  { id: "25", name: "Microsoft", colors: ["#F25022", "#7FBA00", "#00A4EF", "#FFB900"], tags: ["Brand"] },
  { id: "26", name: "Cosmic Fusion", colors: ["#ff00cc", "#333399"], tags: ["Gradient", "Cyberpunk", "Dark"] },
];
