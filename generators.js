// generators.js — 78 generadores de ejercicios + cache en memoria

const R = {
  int: (a, b) => Math.floor(Math.random() * (b - a + 1)) + a,
  coef: () => { let c = 0; while (!c) c = R.int(-9, 9); return c; },
  coeff: () => { let c = R.int(1, 9); return c === 1 ? { n: '', v: 1 } : { n: String(c), v: c }; },
  cs: () => { let c = R.int(-9, 9); if (!c) c = 1; return c === 1 ? { n: '', v: 1 } : c === -1 ? { n: '-', v: -1 } : { n: String(c), v: c }; },
  exp: () => R.int(2, 6)
};
function sign(n) { return n >= 0 ? '+' + n : String(n); }

const G = {

// --- DERIVADAS FACIL ---
dF1:()=>{let a=R.cs(),n=R.exp(),b=R.coef(),m=R.int(1,4),c=R.coef(),d=R.coef();return{e:`$$f(x) = ${a.n}x^{${n}} ${sign(b)}x^{${m}} ${sign(c)}x ${sign(d)}$$`,s:[["Derivamos termino a termino con la regla de la potencia.",`f'(x) = ${a.v*n}x^{${n-1}} ${sign(b*m)}x^{${m-1}} ${sign(c)}`]]}},
dF2:()=>{let a=R.coef(),b=R.coef(),c=R.coef();return{e:`$$f(x) = ${a}x^3 ${sign(b)}x^2 ${sign(c)}x$$`,s:[["Derivamos cada termino.",`f'(x) = ${3*a}x^2 ${sign(2*b)}x ${sign(c)}`]]}},
dF3:()=>{let a=R.cs(),n=R.exp(),b=R.coef();return{e:`$$f(x) = ${a.n}x^{${n}} ${sign(b)}$$`,s:[["La derivada de una constante es 0.",`f'(x) = ${a.v*n}x^{${n-1}}`]]}},
dF4:()=>{let a=R.coef(),n=R.exp(),b=R.coef(),c=R.coef();return{e:`$$f(x) = ${a}x^{${n}} ${sign(b)}x^2 ${sign(c)}x$$`,s:[["Regla de la potencia a cada termino.",`f'(x) = ${a*n}x^{${n-1}} ${sign(2*b)}x ${sign(c)}`]]}},
dF5:()=>{let a=R.cs();return{e:`$$f(x) = ${a.n}x^{${R.exp()}}$$`,s:[["Regla de la potencia directamente.",`f'(x) = ${a.v*R.exp()}x`]]}},
dF6:()=>{let a=Math.floor(Math.random()*8)+2,n=R.exp(),c=R.coef();return{e:`$$f(x) = \\frac{1}{${a}}x^{${n}} ${sign(c)}$$`,s:[["La fraccion no cambia la regla.",`f'(x) = \\frac{${n}}{${a}}x^{${n-1}}`]]}},
dF7:()=>{let a=R.cs(),n=R.exp(),m=R.int(n+1,n+4);return{e:`$$f(x) = ${a.n}x^{${n}} + x^{${m}}$$`,s:[["Derivamos ambos terminos.",`f'(x) = ${a.v*n}x^{${n-1}} + ${m}x^{${m-1}}`]]}},
dF8:()=>{let a=R.coef(),b=R.coef(),c=R.coef();return{e:`$$f(x) = ${a}x^4 ${sign(b)}x^3 ${sign(c)}x^2$$`,s:[["Derivamos cada termino.",`f'(x) = ${4*a}x^3 ${sign(3*b)}x^2 ${sign(2*c)}x`]]}},
dF9:()=>{let a=R.cs(),n=R.exp();return{e:`$$f(x) = ${a.n}x^{${n}} + 7x^{${R.int(1,n-1)}}$$`,s:[["Derivamos con la regla de la potencia.",`f'(x) = ${a.v*n}x^{${n-1}} + ${7*(n-1)}x^{${n-2}}`]]}},
dF10:()=>{let a=R.cs(),b=R.coef(),n=R.exp(),m=R.int(1,n-1);return{e:`$$f(x) = ${a.n}x^{${n}} ${sign(b)}x^{${m}}$$`,s:[["Regla de la potencia.",`f'(x) = ${a.v*n}x^{${n-1}} ${sign(b*m)}x^{${m-1}}`]]}},

// --- DERIVADAS INTERMEDIO ---
dM1:()=>{let a=R.int(1,4),b=R.coef(),c=R.int(1,4),d=R.coef(),n=R.int(1,3);return{e:`$$f(x) = (${a}x^{${n}} ${sign(b)})(${c}x ${sign(d)})$$`,s:[["Producto de dos funciones: (uv)' = u'v + uv'.",`u=${a}x^{${n}} ${sign(b)},\\; v=${c}x ${sign(d)}`],["Derivamos cada parte.",`u'=${a*n}x^{${n-1}},\\; v'=${c}`],["Aplicamos la formula del producto.",`f'(x) = ${a*n}x^{${n-1}}(${c}x ${sign(d)}) + (${a}x^{${n}} ${sign(b)})(${c})`],["Desarrollamos.",`f'(x) = ${a*c*(n+1)}x^{${n}} ${sign(a*d*n+b*c)}x^{${n-1}} ${sign(b*d)}`]]}},
dM2:()=>{let a=R.int(1,3),b=R.coef(),n=R.int(1,3),v=R.int(2,6);return{e:`$$f(x) = \\frac{${a}x^{${n}} ${sign(b)}}{x + ${v}}$$`,s:[["Cociente: (u/v)' = (u'v - uv')/v^2.",`u=${a}x^{${n}} ${sign(b)},\\; v=x+${v}`],["Derivamos y aplicamos.",`f'(x) = \\frac{(${a*n}x^{${n-1}})(x+${v}) - (${a}x^{${n}} ${sign(b)})}{(x+${v})^2}`]]}},
dM3:()=>{let a=R.int(1,4),b=R.coef(),k=R.int(3,5),n=R.int(1,2);return{e:`$$f(x) = (${a}x^{${n}} ${sign(b)})^{${k}}$$`,s:[["Cadena: derivamos la potencia y multiplicamos por la derivada interior.",`f'(x) = ${k}(${a}x^{${n}} ${sign(b)})^{${k-1}} \\cdot ${a*n}x^{${n-1}}`],["Simplificamos.",`f'(x) = ${k*a*n}x^{${n-1}}(${a}x^{${n}} ${sign(b)})^{${k-1}}`]]}},
dM4:()=>{let a=R.int(1,4),b=R.int(1,5);return{e:`$$f(x) = ${a}x \\cdot e^{${b}x}$$`,s:[["Producto: derivada de e^x es e^x.",`f'(x) = ${a}e^{${b}x} + ${a*b}xe^{${b}x} = e^{${b}x}(${a} + ${a*b}x)`]]}},
dM5:()=>{let a=R.int(1,5);return{e:`$$f(x) = \\sin(${a}x)$$`,s:[["Cadena: derivada del seno es coseno, por la derivada de dentro.",`f'(x) = ${a}\\cos(${a}x)`]]}},
dM6:()=>{let a=R.int(1,5),b=R.int(1,5);return{e:`$$f(x) = \\ln(${a}x + ${b})$$`,s:[["Derivada del logaritmo: (ln u)' = u'/u.",`f'(x) = \\frac{${a}}{${a}x + ${b}}`]]}},
dM7:()=>{let a=R.int(1,4),b=R.int(2,4);return{e:`$$f(x) = e^{${a}x^{${b}}}$$`,s:[["Cadena: (e^u)' = e^u * u'.",`f'(x) = ${a*b}x^{${b-1}}e^{${a}x^{${b}}}`]]}},
dM8:()=>{let a=R.int(1,4),b=R.int(2,3);return{e:`$$f(x) = \\cos(${a}x^{${b}})$$`,s:[["Cadena: (cos u)' = -sin(u) * u'.",`f'(x) = -${a*b}x^{${b-1}}\\sin(${a}x^{${b}})`]]}},

// --- DERIVADAS AVANZADO ---
dH1:()=>{let a=R.int(2,5),b=R.int(1,3);return{e:`$$f(x) = \\sin(e^{${a}x^{${b}}})$$`,s:[["Cadena triple: seno -> exponencial -> potencia.",`f'(x) = ${a*b}x^{${b-1}}e^{${a}x^{${b}}}\\cos(e^{${a}x^{${b}}})`]]}},
dH2:()=>{let a=R.int(1,4),b=R.int(2,4);return{e:`$$f(x) = \\ln(\\sin(${a}x^{${b}}))$$`,s:[["Cadena triple: ln -> seno -> potencia.",`f'(x) = ${a*b}x^{${b-1}}\\cot(${a}x^{${b}})`]]}},
dH3:()=>{let a=R.int(2,5);return{e:`$$f(x) = x^{${a}} \\sin x$$`,s:[["Producto y cadena.",`f'(x) = x^{${a-1}}(${a}\\sin x + x\\cos x)`]]}},
dH4:()=>{let a=R.int(2,4),b=R.int(1,5);return{e:`$$f(x) = \\frac{\\sin(${a}x)}{\\cos(${b}x)}$$`,s:[["Cociente con regla de cadena.",`f'(x) = \\frac{${a}\\cos(${a}x)\\cos(${b}x) + ${b}\\sin(${a}x)\\sin(${b}x)}{\\cos^2(${b}x)}`]]}},
dH5:()=>{let a=R.int(1,5),b=R.int(2,4),c=R.coef();return{e:`$$f(x) = \\frac{x^{${a}}}{\\sin(${b}x ${sign(c)})}$$`,s:[["Cociente con cadena.",`f'(x) = \\frac{${a}x^{${a-1}}\\sin(${b}x ${sign(c)}) - ${b}x^{${a}}\\cos(${b}x ${sign(c)})}{\\sin^2(${b}x ${sign(c)})}`]]}},
dH6:()=>{let a=R.int(1,4),b=R.int(2,5);return{e:`$$f(x) = e^{${a}x} \\cos(${b}x)$$`,s:[["Producto de exponencial y coseno.",`f'(x) = e^{${a}x}(${a}\\cos(${b}x) - ${b}\\sin(${b}x))`]]}},
dH7:()=>{let a=R.int(1,4),b=R.int(2,5);return{e:`$$f(x) = \\arctan(${a}x^{${b}})$$`,s:[["Derivada de arcotangente: (arctan u)' = u'/(1+u^2).",`f'(x) = \\frac{${a*b}x^{${b-1}}}{1+${a*a}x^{${2*b}}}`]]}},
dH8:()=>{let a=R.int(2,5);return{e:`$$f(x) = x^{${a}} \\ln x$$`,s:[["Producto: u=x^a, v=ln x.",`f'(x) = x^{${a-1}}(${a}\\ln x + 1)`]]}},

// --- INTEGRALES ---
iF1:()=>{let a=R.coef(),b=R.coef(),c=R.coef();return{e:`$$\\int (${a}x^3 ${sign(b)}x^2 ${sign(c)})\\,dx$$`,s:[["Integramos termino a termino: int ax^n = a x^(n+1)/(n+1).",`${a}\\frac{x^4}{4} ${sign(b)}\\frac{x^3}{3} ${sign(c)}x + C`]]}},
iF2:()=>{let a=R.int(1,9),n=R.int(3,7);return{e:`$$\\int ${a}x^{${n}}\\,dx$$`,s:[["Regla de la potencia inversa.",`\\frac{${a}}{${n+1}}x^{${n+1}} + C`]]}},
iF3:()=>({e:"$$\\int e^x\\,dx$$",s:[["La integral de e^x es e^x.","e^x + C"]]}),
iF4:()=>({e:"$$\\int \\frac{1}{x}\\,dx$$",s:[["No se puede usar regla de potencia. int 1/x = ln|x|.","\\ln|x| + C"]]}),
iF5:()=>{let a=R.int(2,6),n=R.int(2,5);return{e:`$$\\int ${a}x^{${n}}\\,dx$$`,s:[["Sumamos 1 al exponente y dividimos.",`\\frac{${a}}{${n+1}}x^{${n+1}} + C`]]}},
iF6:()=>({e:"$$\\int \\sqrt{x}\\,dx$$",s:[["sqrt(x) = x^(1/2).","\\frac{2}{3}x^{3/2} + C"]]}),
iF7:()=>{let a=R.int(2,6),n=R.int(2,4);return{e:`$$\\int \\frac{${a}}{x^{${n}}}\\,dx$$`,s:[["Reescribimos: a/x^n = a x^(-n).",`-\\frac{${a}}{${n-1}x^{${n-1}}} + C`]]}},
iF8:()=>({e:"$$\\int (e^x + \\cos x)\\,dx$$",s:[["int e^x = e^x, int cos x = sin x.","e^x + \\sin x + C"]]}),
iF9:()=>{let a=R.int(1,5);return{e:`$$\\int \\sin(${a}x)\\,dx$$`,s:[["int sin(ax) = -(1/a) cos(ax).",`-\\frac{1}{${a}}\\cos(${a}x) + C`]]}},
iF10:()=>{let a=R.int(1,5);return{e:`$$\\int \\cos(${a}x)\\,dx$$`,s:[["int cos(ax) = (1/a) sin(ax).",`\\frac{1}{${a}}\\sin(${a}x) + C`]]}},

iM1:()=>{let a=R.int(2,5),b=R.int(1,5),c=R.int(1,5),n=R.int(2,4);return{e:`$$\\int ${a}x(${b}x^2 + ${c})^{${n}}\\,dx$$`,s:[["Sustitucion: u = bx^2+c, du = 2bx dx.",`\\frac{${a}}{${2*b*(n+1)}}(${b}x^2+${c})^{${n+1}} + C`]]}},
iM2:()=>({e:"$$\\int \\frac{\\ln x}{x}\\,dx$$",s:[["Sustitucion: u = ln x, du = dx/x.","\\frac{(\\ln x)^2}{2} + C"]]}),
iM3:()=>{let a=R.int(1,5);return{e:`$$\\int ${a}x e^{x}\\,dx$$`,s:[["Partes: u=ax, dv=e^x dx.",`${a}e^x(x-1) + C`]]}},
iM4:()=>{let a=R.int(1,5);return{e:`$$\\int ${a}x \\cos x\\,dx$$`,s:[["Partes: u=ax, dv=cos x dx.",`${a}x\\sin x + ${a}\\cos x + C`]]}},
iM5:()=>({e:"$$\\int \\ln x\\,dx$$",s:[["Partes: u=ln x, dv=dx.","x\\ln x - x + C"]]}),
iM6:()=>{let a=R.int(1,5),b=R.int(1,5);return{e:`$$\\int \\frac{e^{${a}x}}{${b}+e^{${a}x}}\\,dx$$`,s:[["El numerador es la derivada del denominador.",`\\frac{1}{${a}}\\ln(${b}+e^{${a}x}) + C`]]}},
iM7:()=>{let a=R.int(2,5),b=R.int(1,5);return{e:`$$\\int \\frac{${a}x}{\\sqrt{x^2+${b}}}\\,dx$$`,s:[["Sustitucion: u=x^2+b, du=2x dx.",`${a}\\sqrt{x^2+${b}} + C`]]}},
iM8:()=>{let a=R.int(1,4);return{e:`$$\\int \\sin^{${a}}x \\cos x\\,dx$$`,s:[["Sustitucion: u=sin x, du=cos x dx.",`\\frac{\\sin^{${a+1}}x}{${a+1}} + C`]]}},

iH1:()=>({e:"$$\\int e^x\\sin x\\,dx$$",s:[["Ciclica: u=sin x, dv=e^x dx.","I = e^x\\sin x - \\int e^x\\cos x\\,dx"],["Segunda partes. Aparece I de nuevo.","I = e^x\\sin x - e^x\\cos x - I"],["Despejando I.","I = \\frac{e^x}{2}(\\sin x - \\cos x) + C"]]}),
iH2:()=>{let a=R.int(2,4);return{e:`$$\\int x^{${a}} e^x\\,dx$$`,s:[["Partes sucesivas hasta eliminar el polinomio.",`I = e^x(x^{${a}} - ${a}x^{${a-1}} + ${a*(a-1)}x^{${a-2}} - ... + ${a}!) + C`]]}},
iH3:()=>({e:"$$\\int \\tan x\\,dx$$",s:[["tan x = sin x/cos x. u=cos x, du=-sin x dx.","-\\ln|\\cos x| + C = \\ln|\\sec x| + C"]]}),
iH4:()=>({e:"$$\\int \\frac{1}{\\sqrt{1-x^2}}\\,dx$$",s:[["Sustitucion trigonometrica: x = sin(theta).","\\arcsin x + C"]]}),
iH5:()=>({e:"$$\\int \\frac{1}{x^2-1}\\,dx$$",s:[["Fracciones parciales: x^2-1=(x-1)(x+1).","\\frac{1}{2}\\ln\\left|\\frac{x-1}{x+1}\\right| + C"]]}),
iH6:()=>{let a=R.int(2,4);return{e:`$$\\int \\frac{e^{${a}x}}{1+e^{x}}\\,dx$$`,s:[["u=e^x. Division polinomica e integracion.",`\\frac{e^{(${a-1})x}}{${a-1}} - ... - \\ln(1+e^x) + C`]]}},
iH7:()=>({e:"$$\\int \\sec^2 x\\,dx$$",s:[["La derivada de tan x es sec^2 x.","\\tan x + C"]]}),
iH8:()=>{let a=R.int(1,4);return{e:`$$\\int x \\sin(${a}x)\\,dx$$`,s:[["Partes: u=x, dv=sin(ax)dx.",`-\\frac{x}{${a}}\\cos(${a}x) + \\frac{1}{${a*a}}\\sin(${a}x) + C`]]}},

// --- LIMITES ---
lF1:()=>{let a=R.cs(),b=R.coef(),c=R.coef(),x=R.int(1,5);let r=a.v*x*x + b*x + c;return{e:`$$\\lim_{x\\to ${x}} (${a.n}x^2 ${sign(b)}x ${sign(c)})$$`,s:[["Polinomio continuo. Evaluamos directamente.",`f(${x}) = ${r}`]]}},
lF2:()=>{let x=R.int(1,5),a=R.coef(),b=R.coef();return{e:`$$\\lim_{x\\to ${x}} (x^2 ${sign(a)}x ${sign(b)})$$`,s:[["Polinomio continuo. Sustitucion directa.",`${x*x + a*x + b}`]]}},
lF3:()=>{let a=R.int(1,5);return{e:`$$\\lim_{x\\to ${a}} \\frac{x^2-${a*a}}{x-${a}}$$`,s:[["0/0. Factorizamos: (x-a)(x+a). Cancelamos.",`x + ${a}`],["Evaluamos.",`${2*a}`]]}},
lF4:()=>{let a=R.int(1,5),b=R.int(1,5),c=R.int(1,5),d=R.int(1,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^3 + ${b}x}{${c}x^3 - ${d}}$$`,s:[["Comparamos grados (ambos x^3). Cociente de coeficientes.",`\\frac{${a}}{${c}}`]]}},
lF5:()=>{let x=R.int(1,9);return{e:`$$\\lim_{x\\to ${x}} \\sqrt{x}$$`,s:[["Funcion continua para x>0.","\\sqrt{"+x+"}"]]}},
lF6:()=>{let a=R.int(1,4);return{e:`$$\\lim_{x\\to ${a}} \\frac{x-${a}}{x^2-${a*a}}$$`,s:[["0/0. Denominador: (x-a)(x+a). Cancelamos.","\\frac{1}{x+"+a+"}"],["Evaluamos.",`\\frac{1}{${2*a}}`]]}},
lF7:()=>{let a=R.int(1,9);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}}{x^2}$$`,s:[["Numerador constante, denominador -> inf.","0"]]}},
lF8:()=>{let a=R.int(2,6);return{e:`$$\\lim_{x\\to ${a}} \\frac{x^2-${a*a}}{x-${a}}$$`,s:[["0/0. Factorizamos numerador.","x + "+a],["Evaluamos.",`${2*a}`]]}},
lF9:()=>{let x=R.int(2,6),a=R.int(1,4);return{e:`$$\\lim_{x\\to ${x}} \\frac{x^2-${x*x}}{x+${a}}$$`,s:[["Numerador 0, denominador != 0.","0"]]}},
lF10:()=>{let a=R.int(2,8);return{e:`$$\\lim_{x\\to \\infty} \\frac{x + ${a}}{x^2 + 1}$$`,s:[["Grado denominador > grado numerador.","0"]]}},

lM1:()=>({e:"$$\\lim_{x\\to 0} \\frac{\\sqrt{x+1}-1}{x}$$",s:[["0/0. Racionalizamos con el conjugado.","\\frac{1}{\\sqrt{x+1}+1}"],["Evaluamos.","\\frac{1}{2}"]]}),
lM2:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to ${a}} \\frac{x^2-${a*a}}{x^2-${a}x-${a}}$$`,s:[["0/0. Factorizamos ambos.","\\frac{x+"+a+"}{x+1}"],["Evaluamos.",`\\frac{${2*a}}{${a+1}}`]]}},
lM3:()=>({e:"$$\\lim_{x\\to \\infty} \\frac{\\sqrt{x^2+1}}{x}$$",s:[["x = sqrt(x^2) para x>0.","\\sqrt{1+\\frac{1}{x^2}} \\to 1"]]}),
lM4:()=>({e:"$$\\lim_{x\\to 0} \\frac{x^3-2x^2}{x^2+3x}$$",s:[["0/0. Factorizamos x.","\\frac{x^2-2x}{x+3}"],["Evaluamos.","0"]]}),
lM5:()=>({e:"$$\\lim_{x\\to \\infty} (\\sqrt{x^2+x} - x)$$",s:[["inf - inf. Conjugado.","\\frac{1}{\\sqrt{1+1/x}+1} \\to \\frac{1}{2}"]]}),
lM6:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to ${a}} \\frac{x^3-${a*a*a}}{x-${a}}$$`,s:[["Diferencia de cubos: a^3-b^3=(a-b)(a^2+ab+b^2).","x^2+"+a+"x+"+a*a],["Evaluamos.",`${3*a*a}`]]}},
lM7:()=>{let a=R.int(2,5),b=R.int(2,5),c=R.int(1,5),d=R.int(1,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^3 - ${b}x}{${c}x^3 + x^2 - ${d}}$$`,s:[["Terminos de mayor grado.",`\\frac{${a}}{${c}}`]]}},
lM8:()=>({e:"$$\\lim_{x\\to 1} \\frac{\\sqrt{x}-1}{x-1}$$",s:[["Conjugado del numerador.","\\frac{1}{\\sqrt{x}+1} \\to \\frac{1}{2}"]]}),

lH1:()=>{let a=R.int(2,6);return{e:`$$\\lim_{x\\to 0} \\frac{\\sin(${a}x)}{x}$$`,s:[["Limite notable: sin(ax)/x -> a.",`${a}`]]}},
lH2:()=>({e:"$$\\lim_{x\\to 0} \\frac{e^x-1}{x}$$",s:[["L'Hopital o limite notable.","1"]]}),
lH3:()=>({e:"$$\\lim_{x\\to 0} \\frac{1-\\cos x}{x^2}$$",s:[["L'Hopital dos veces.","\\frac{1}{2}"]]}),
lH4:()=>({e:"$$\\lim_{x\\to 0} \\frac{\\tan x}{x}$$",s:[["tan x/x = (sin x/x)*(1/cos x).","1"]]}),
lH5:()=>({e:"$$\\lim_{x\\to \\infty} \\left(1+\\frac{1}{x}\\right)^x$$",s:[["Define el numero e.","e"]]}),
lH6:()=>({e:"$$\\lim_{x\\to 0} \\frac{x-\\sin x}{x^3}$$",s:[["L'Hopital tres veces.","\\frac{1}{6}"]]}),
lH7:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\left(\\frac{x+${a}}{x}\\right)^{x}$$`,s:[["Reescribimos: (1+a/x)^x = [(1+a/x)^(x/a)]^a.","e^{"+a+"}"]]}},
lH8:()=>({e:"$$\\lim_{x\\to 0^+} x\\ln x$$",s:[["0*(-inf). Reescribimos y L'Hopital.","0"]]}),

// --- LIMITES AL INFINITO (FACIL) ---
liF1:()=>{let a=R.cs(),n=R.int(2,5),b=R.coef(),c=R.coef(),m=R.int(2,5),d=R.cs();let r=a.v/d.v;while(r===0||!Number.isInteger(r)){d=R.cs();r=a.v/d.v}return{e:`$$\\lim_{x\\to \\infty} \\frac{${a.n}x^{${n}} ${sign(b)}x^{${n-1}}}{${d.n}x^{${m}} ${sign(c)}}$$`,s:[["Comparamos grados: ambos son x^{max(n,m)}.",`\\frac{${a.n}}{${d.n}}`],["El limite es el cociente de coeficientes lideres.",`\\frac{${a.v}}{${d.v}}`]]}},
liF2:()=>{let a=R.coef(),b=R.coef(),n=R.int(2,4),m=R.int(n+1,n+3);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} ${sign(b)}x^{${n-1}}}{x^{${m}} + 1}$$`,s:[["Grado del denominador ("+m+") > grado del numerador ("+n+").","0"]]}},
liF3:()=>{let a=R.int(2,9),n=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}}{x^{${n}}}$$`,s:[["Numerador constante, denominador -> infinito.","0"]]}},
liF4:()=>{let a=R.coef(),b=R.coef(),n=R.int(2,4);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} ${sign(b)}}{x^{${n}} + x^{${n-1}}}$$`,s:[["Mismo grado en numerador y denominador.",`\\frac{${a}}{1}`],["El limite es el cociente de coeficientes lideres.",`${a}`]]}},
liF5:()=>{let a=R.coef(),b=R.coef(),c=R.coef(),n=R.int(2,4);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} ${sign(b)}x^{${n-1}}}{${c}x^{${n}} + x^{${n-2}}}$$`,s:[["Mismo grado. Cociente de coeficientes lideres.",`\\frac{${a}}{${c}}`]]}},
liF6:()=>{let a=R.int(2,8),b=R.cs(),n=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}}{${b.n}x^{${n}} + 1}$$`,s:[["El denominador crece sin limite.","0"]]}},
liF7:()=>{let a=R.coef(),b=R.cs(),c=R.coef(),n=R.int(2,4);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} ${sign(c)}}{${b.n}x^{${n}} + x^{${n-1}}}$$`,s:[["Mismo grado n="+n+".",`\\frac{${a}}{${b.n}}`],["El limite es a_n/b_n.",`\\frac{${a}}{${b.v}}`]]}},
liF8:()=>{let a=R.coef(),b=R.coef(),c=R.coef(),n=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} ${sign(b)}x^{${n-1}} ${sign(c)}}{x^{${n}} - x^{${n-2}} + 7}$$`,s:[["Ambos polinomios de grado "+n+".",`\\frac{${a}}{1}`],["El limite es el cociente de los coeficientes de x^{"+n+"}.",`${a}`]]}},
liF9:()=>{let a=R.coef(),b=R.coef(),n=R.int(3,6);return{e:`$$\\lim_{x\\to \\infty} \\frac{${a}x^{${n}} + ${b}}{x^{${n-1}} + x^{${n-2}}}$$`,s:[["Grado numerador ("+n+") > grado denominador ("+(n-1)+").","\\infty"]]}},
liF10:()=>{let a=R.cs(),b=R.coef(),n=R.int(3,5),c=R.int(2,6);let num=a.n,den=c;return{e:`$$\\lim_{x\\to \\infty} \\frac{${a.n}x^{${n}} ${sign(b)}x^{${n-2}}}{${c}x^{${n}} + x^{${n-1}}}$$`,s:[["Mismo grado. Cociente de coeficientes lideres.",`\\frac{${num}}{${den}}`]]}},

// --- LIMITES AL INFINITO (AVANZADO) ---
liH1:()=>{let a=R.int(2,6);return{e:`$$\\lim_{x\\to \\infty} (\\sqrt{x^2+${a}x} - x)$$`,s:[["Forma indeterminada: inf - inf. Racionalizamos con el conjugado.",`\\frac{${a}x}{\\sqrt{x^2+${a}x}+x}`],["Dividimos numerador y denominador entre x.",`\\frac{${a}}{\\sqrt{1+${a}/x}+1}`],["Cuando x->inf, ${a}/x -> 0.",`\\frac{${a}}{2}`]]}},
liH2:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\left(1+\\frac{${a}}{x}\\right)^{x}$$`,s:[["Forma 1^inf. Reconocemos el numero e.",`\\left[\\left(1+\\frac{${a}}{x}\\right)^{x/${a}}\\right]^{${a}}`],["Lo de dentro tiende a e.",`e^{${a}}`]]}},
liH3:()=>{let a=R.int(1,4),b=R.int(1,4);return{e:`$$\\lim_{x\\to \\infty} \\left(\\frac{x+${a}}{x}\\right)^{${b}x}$$`,s:[["Reescribimos: (1 + a/x)^(bx).","[(1+a/x)^(x/a)]^(ab)"],["Lo de dentro -> e.",`e^{${a*b}}`]]}},
liH4:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} x\\sin\\left(\\frac{${a}}{x}\\right)$$`,s:[["Sustitucion: t = a/x. Cuando x->inf, t->0^+.",`${a}\\lim_{t\\to 0^+}\\frac{\\sin t}{t}`],["Limite notable: sin(t)/t -> 1.",`${a}`]]}},
liH5:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{\\ln x}{x^{1/${a}}}$$`,s:[["L'Hopital. El logaritmo crece mas lento que cualquier potencia positiva.",`\\lim_{x\\to\\infty} \\frac{1/x}{(1/${a})x^{1/${a}-1}} = \\lim_{x\\to\\infty} \\frac{${a}}{x^{1/${a}}}`],["El denominador -> inf, numerador constante.","0"]]}},
liH6:()=>{let a=R.int(2,4);return{e:`$$\\lim_{x\\to \\infty} \\frac{e^{x}}{x^{${a}}}$$`,s:[["La exponencial crece mas rapido que cualquier polinomio.",`\\frac{\\infty}{\\infty}`],["Aplicamos L'Hopital "+a+" veces. El denominador se vuelve constante, el numerador sigue siendo e^x.",`\\lim_{x\\to\\infty} \\frac{e^x}{${a}!}`],["e^x -> inf.","\\infty"]]}},
liH7:()=>{let a=R.int(2,6);return{e:`$$\\lim_{x\\to \\infty} \\left(\\sqrt{x^2+${a}} - \\sqrt{x^2+${a-1}}\\right)$$`,s:[["Forma inf - inf. Racionalizamos.",`\\frac{${a}-${a-1}}{\\sqrt{x^2+${a}}+\\sqrt{x^2+${a-1}}}`],["Simplificamos el numerador: es 1.",`\\frac{1}{\\sqrt{x^2+${a}}+\\sqrt{x^2+${a-1}}}`],["Cuando x->inf, el denominador -> inf.","0"]]}},
liH8:()=>{let a=R.int(2,6);return{e:`$$\\lim_{x\\to \\infty} \\frac{\\sqrt{x^2+${a}}}{\\sqrt[3]{x^3+1}}$$`,s:[["Dividimos numerador y denominador entre x.",`\\frac{\\sqrt{1+${a}/x^2}}{\\sqrt[3]{1+1/x^3}}`],["Cuando x->inf, "+a+"/x^2->0 y 1/x^3->0.","1"]]}},
liH9:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\left(\\frac{x+${a}}{x-${a}}\\right)^{x}$$`,s:[["Reescribimos la base: 1 + 2a/(x-a).","[(1+2a/(x-a))^{(x-a)/(2a)}]^{2a}"],["El interior -> e.",`e^{${2*a}}`]]}},
liH10:()=>{let a=R.int(2,5);return{e:`$$\\lim_{x\\to \\infty} \\frac{\\ln(x^{${a}}+1)}{\\ln x}$$`,s:[["Ambos -> inf. Aplicamos L'Hopital.",`\\frac{${a}x^{${a-1}}/(x^{${a}}+1)}{1/x} = \\frac{${a}x^{${a}}}{x^{${a}}+1}`],["Cuando x->inf, esta fraccion tiende a...",`${a}`]]}},
};

// ========== CACHE ==========
const cache = new Map();

function generatePool(tema, dificultad, count) {
  const map = {
    derivadas: { facilito: 'dF', dificilito: 'dM', extremo: 'dH' },
    integrales: { facilito: 'iF', dificilito: 'iM', extremo: 'iH' },
    limites: { facilito: 'lF', dificilito: 'lM', extremo: 'lH', 'infi-facil': 'liF', 'infi-dificil': 'liH' }
  };
  const pre = map[tema][dificultad];
  const keys = Object.keys(G).filter(k => k.startsWith(pre));
  const pool = [];
  for (let i = 0; i < count; i++) {
    const key = keys[Math.floor(Math.random() * keys.length)];
    try {
      const ex = G[key]();
      if (ex) {
        ex.id = pre + '-' + i + '-' + Date.now() + '-' + Math.floor(Math.random()*10000);
        ex.t = tema;
        ex.d = dificultad;
        toResultOnly(ex);
        cache.set(ex.id, ex);
        pool.push({ id: ex.id, e: ex.e });
      }
    } catch (e) {}
  }
  return pool;
}

// ========== RESULT ONLY (no steps) ==========
function toResultOnly(ex) {
  if (!ex || !ex.s || !ex.s.length) return ex;
  // Keep only the final formula as the result
  const lastStep = ex.s[ex.s.length - 1];
  ex.s = [[lastStep[1]]];
  return ex;
}

function getSolution(id) {
  const ex = cache.get(id);
  if (ex) return { id: ex.id, e: ex.e, s: ex.s };
  return null;
}

module.exports = { generatePool, getSolution };
