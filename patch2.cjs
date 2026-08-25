const fs = require('fs');
let content = fs.readFileSync('src/components/LiveStockGalleryView.tsx', 'utf8');

const targetGrid = `<div className="grid grid-cols-2 gap-3 mb-6 mt-auto">
                  <div className="bg-black/40 rounded border border-white/5 p-2">
                    <span className="block text-[9px] uppercase font-mono text-zinc-500">Diet</span>
                    <span className="text-xs text-zinc-300 font-sans truncate block" title={fish.diet}>{fish.diet}</span>
                  </div>
                  <div className="bg-black/40 rounded border border-white/5 p-2">
                    <span className="block text-[9px] uppercase font-mono text-zinc-500">Origin</span>
                    <span className="text-xs text-zinc-300 font-sans truncate block" title={fish.origin}>{fish.origin}</span>
                  </div>
                </div>`;

content = content.replace(targetGrid, "");
fs.writeFileSync('src/components/LiveStockGalleryView.tsx', content);
