// generate_data.js — Genera los 1800 ejercicios con soluciones completas
// y los guarda en exercises.json (fuente unica para web + PDF)

const { generatePool, getSolution } = require('./generators');
const fs = require('fs');
const path = require('path');

const TEMAS = ['derivadas', 'integrales', 'limites'];
const DIFS = ['facilito', 'dificilito', 'extremo'];
const PER_DIFF = {
  derivadas: 300,
  integrales: 234,
  limites: 400
};

const all = [];

for (const tema of TEMAS) {
  for (const diff of DIFS) {
    const count = PER_DIFF[tema];
    const pool = generatePool(tema, diff, count);
    for (const preview of pool) {
      const sol = getSolution(preview.id);
      if (sol) {
        all.push({
          id: sol.id,
          tema: tema,
          dificultad: diff,
          e: sol.e,
          s: sol.s
        });
      }
    }
  }
}

const out = {
  total: all.length,
  generated: new Date().toISOString(),
  exercises: all
};

const outPath = path.join(__dirname, 'exercises.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));

console.log(`JSON generado: ${outPath}`);
console.log(`Total ejercicios: ${all.length}`);
console.log(`Tamano: ${(fs.statSync(outPath).size / 1024 / 1024).toFixed(2)} MB`);

// Verify step counts
const stepCounts = all.map(e => e.s.length);
const min = Math.min(...stepCounts);
const max = Math.max(...stepCounts);
const avg = (stepCounts.reduce((a,b) => a+b, 0) / stepCounts.length).toFixed(1);
console.log(`Pasos por ejercicio: min=${min}, max=${max}, avg=${avg}`);
