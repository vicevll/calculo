const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Cargar datos pre-generados desde exercises.json
const dataPath = path.join(__dirname, 'exercises.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Indexar por id para busqueda rapida
const byId = new Map();
data.exercises.forEach(ex => byId.set(ex.id, ex));

// Indexar por tema+dificultad
const byCategory = {};
data.exercises.forEach(ex => {
  const key = `${ex.tema}-${ex.dificultad}`;
  if (!byCategory[key]) byCategory[key] = [];
  byCategory[key].push(ex);
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// GET /api/exercises?tema=derivadas&dificultad=facilito&count=200
app.get('/api/exercises', (req, res) => {
  const { tema, dificultad, count } = req.query;
  if (!tema || !dificultad) {
    return res.status(400).json({ error: 'Faltan parametros tema y dificultad' });
  }
  const key = `${tema}-${dificultad}`;
  let pool = byCategory[key] || [];

  // Para limites al infinito: incluir tambien ejercicios existentes con x->inf
  if (dificultad === 'infi-facil' || dificultad === 'infi-dificil') {
    const existingInf = (byCategory['limites-facilito'] || [])
      .concat(byCategory['limites-dificilito'] || [])
      .concat(byCategory['limites-extremo'] || [])
      .filter(ex => ex.e && ex.e.includes('\\infty'));
    pool = [...pool, ...existingInf];
  }

  // Shuffle aleatoriamente
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  // Tomar los primeros N (por defecto 200)
  const n = Math.min(parseInt(count) || 200, shuffled.length);

  // Devolver solo preview: {id, e}
  res.json(shuffled.slice(0, n).map(ex => ({ id: ex.id, e: ex.e })));
});

// GET /api/solution/:id — devuelve TODOS los pasos
app.get('/api/solution/:id', (req, res) => {
  const ex = byId.get(req.params.id);
  if (ex) {
    res.json({ id: ex.id, e: ex.e, s: ex.s });
  } else {
    res.status(404).json({ error: 'Ejercicio no encontrado' });
  }
});

// GET /api/stats — estadisticas del dataset
app.get('/api/stats', (req, res) => {
  res.json({
    total: data.total,
    generated: data.generated,
    porCategoria: Object.fromEntries(
      Object.entries(byCategory).map(([k, v]) => [k, v.length])
    )
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Dataset: ${data.total} ejercicios cargados desde exercises.json`);
});
