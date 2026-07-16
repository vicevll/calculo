// generate_data.js — Genera ejercicios con soluciones completas
const { generatePool, getSolution } = require('./generators');
const fs = require('fs');
const path = require('path');

// Estructura: { tema, [ { dificultad, count } ] }
const PLAN = {
  derivadas:   [['facilito',300],['dificilito',300],['extremo',300]],
  integrales:  [['facilito',234],['dificilito',234],['extremo',234]],
  limites:     [['facilito',400],['dificilito',400],['extremo',400],['infi-facil',150],['infi-dificil',150]],
  sistemas:    [['facilito',50],['extremo',100]],
  cuadraticas: [['extremo',150]],
  logaritmos:  [['dificilito',100],['extremo',100]],
  funciones:   [['dificilito',50]]
};

const all = [];

for (const tema of Object.keys(PLAN)) {
  for (const [diff, count] of PLAN[tema]) {
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

const stepCounts = all.map(e => e.s.length);
const min = Math.min(...stepCounts);
const max = Math.max(...stepCounts);
const avg = (stepCounts.reduce((a,b) => a+b, 0) / stepCounts.length).toFixed(1);
console.log(`Pasos: min=${min}, max=${max}, avg=${avg}`);
