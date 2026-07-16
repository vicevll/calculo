// generate_pdf.js — Genera el PDF desde exercises.json (misma fuente que la web)

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'exercises.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const DIFS = [
  { key: 'facilito', label: 'Facil' },
  { key: 'dificilito', label: 'Intermedio' },
  { key: 'extremo', label: 'Avanzado' }
];
const temaLabel = { derivadas:'Derivadas', integrales:'Integrales', limites:'Limites', sistemas:'Sistemas de Ecuaciones 2x2', cuadraticas:'Ecuaciones de Segundo Grado', logaritmos:'Logaritmos', funciones:'Funcion Exponencial y Logaritmica' };

function escapeText(s) { return s.replace(/_/g,'\\_').replace(/\^/g,'\\^{}').replace(/&/g,'\\&').replace(/%/g,'\\%').replace(/#/g,'\\#'); }

let tex = '';
tex += '\\documentclass[10pt,a4paper]{article}\n';
tex += '\\usepackage[utf8]{inputenc}\n\\usepackage[T1]{fontenc}\n';
tex += '\\usepackage[margin=1.8cm]{geometry}\n';
tex += '\\usepackage{amsmath,amssymb}\n\\usepackage{enumitem}\n\\usepackage{titlesec}\n';
tex += '\\usepackage{xcolor}\n\\usepackage{fancyhdr}\n\\usepackage{tcolorbox}\n';
tex += '\\usepackage{hyperref}\n\\usepackage[spanish]{babel}\n\n';
tex += '\\geometry{top=2cm,bottom=2cm,left=2cm,right=2cm}\n';
tex += '\\setlength{\\parindent}{0pt}\n\\setlength{\\parskip}{0.4em}\n\n';
tex += '\\titleformat{\\section}{\\Large\\bfseries\\color{blue!60!black}}{}{0pt}{}\n';
tex += '\\titleformat{\\subsection}{\\large\\bfseries\\color{blue!40!black}}{}{0pt}{}\n\n';
tex += '\\pagestyle{fancy}\n\\fancyhf{}\n';
tex += '\\fancyhead[L]{\\small Ejercicicios del vixo --- Solucionario}\n';
tex += '\\fancyhead[R]{\\small \\thepage}\n';
tex += '\\renewcommand{\\headrulewidth}{0.4pt}\n\n';
tex += '\\newtcolorbox{ejbox}{colback=blue!3!white,colframe=blue!30!white,boxrule=0.5pt,arc=2mm,left=4mm,right=4mm,top=2mm,bottom=2mm,before skip=6pt,after skip=6pt}\n';
tex += '\\newtcolorbox{solbox}{colback=green!3!white,colframe=green!30!white,boxrule=0.5pt,arc=2mm,left=4mm,right=4mm,top=2mm,bottom=2mm,before skip=4pt,after skip=6pt}\n\n';
tex += '\\begin{document}\n';
tex += '\\begin{titlepage}\n\\centering\n\\vspace*{3cm}\n';
tex += '{\\Huge\\bfseries Solucionario Completo}\\\\[1cm]\n';
tex += `{\\Large ${data.total} ejercicios resueltos paso a paso}\\\\[3cm]\n`;
tex += '\\vfill\n{\\small Generado automaticamente}\n\\end{titlepage}\n\n';
tex += '\\tableofcontents\n\\newpage\n\n';

let totalEx = 0;

for (const tema of ['derivadas','integrales','limites','sistemas','cuadraticas','logaritmos','funciones']) {
  const temaExs = data.exercises.filter(ex => ex.tema === tema);
  tex += `\\section{${temaLabel[tema] || tema}}\n\n`;
  const allDiffs = [...new Set(temaExs.map(ex => ex.dificultad))];
  for (const d of allDiffs) {
    const diffExs = temaExs.filter(ex => ex.dificultad === d);
    if (!diffExs.length) continue;
    const dLabel = {facilito:'Facil',dificilito:'Intermedio',extremo:'Avanzado','infi-facil':'Infinito Facil','infi-dificil':'Infinito Dificil'}[d] || d;
    tex += `\\subsection{${dLabel} (${diffExs.length})}\n\n`;
    for (let i = 0; i < diffExs.length; i++) {
      const ex = diffExs[i]; totalEx++;
      const enunciado = ex.e.replace(/^\\$\\$/, '').replace(/\\$\\$$/, '');
      tex += `\\begin{ejbox}\n\\textbf{Ejercicio ${totalEx}.}\\quad $${enunciado}$\n\\end{ejbox}\n\n`;
      tex += `\\begin{solbox}\n\\textbf{Resultado:} `;
      if (ex.s && ex.s.length > 0) tex += `\\(\\displaystyle ${ex.s[ex.s.length - 1][0]}\\)\n`;
      tex += `\\end{solbox}\n\n`;
      if ((i + 1) % 3 === 0) tex += '\\newpage\n';
    }
    tex += '\\newpage\n';
  }
}

tex += '\\end{document}\n';

const outPath = path.join(__dirname, 'solucionario.tex');
fs.writeFileSync(outPath, tex);
console.log(`LaTeX generado: ${outPath}`);
console.log(`Total ejercicios: ${totalEx}`);
console.log(`Tamano: ${(tex.length / 1024).toFixed(0)} KB`);

tex += `\\end{document}\n`;

const outPath = path.join(__dirname, 'solucionario.tex');
fs.writeFileSync(outPath, tex);
console.log(`LaTeX generado: ${outPath}`);
console.log(`Total ejercicios: ${totalEx}`);
console.log(`Tamano: ${(tex.length / 1024).toFixed(0)} KB`);
