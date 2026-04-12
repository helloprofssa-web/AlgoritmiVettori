export const cppLinesLinearSearchWhile = [
  "int ricercaSequenzialeWhile(int v[], int n, int x) {",
  "    int i = 0;",
  "    bool trovato = false;",
  "    while (i < n && !trovato) {",
  "        if (v[i] == x) {",
  "            trovato = true;",
  "        } else {",
  "            i++;",
  "        }",
  "    }",
  "    if (trovato) {",
  "        return i;",
  "    } else {",
  "        return -1;",
  "    }",
  "}",
];

export function linearSearchWhileSteps(input, target) {
  const a = [...input];
  const steps = [];

  let i = 0;
  let trovato = false;

  steps.push({
    array: [...a],
    i,
    target,
    trovato,
    foundIndex: null,
    activeLine: null,
    description: `Vettore iniziale. Cerco il valore ${target}.`,
  });

  steps.push({
    array: [...a],
    i,
    target,
    trovato,
    foundIndex: null,
    activeLine: 1,
    description: "Imposto i = 0.",
  });

  steps.push({
    array: [...a],
    i,
    target,
    trovato,
    foundIndex: null,
    activeLine: 2,
    description: "Imposto trovato = false.",
  });

  while (i < a.length && !trovato) {
    steps.push({
      array: [...a],
      i,
      target,
      trovato,
      foundIndex: null,
      activeLine: 3,
      description: `Controllo while: i < n e !trovato (${i} < ${a.length} e ${!trovato}).`,
    });

    steps.push({
      array: [...a],
      i,
      target,
      trovato,
      foundIndex: null,
      activeLine: 4,
      description: `Controllo se v[${i}] = ${a[i]} è uguale a ${target}.`,
    });

    if (a[i] === target) {
      trovato = true;

      steps.push({
        array: [...a],
        i,
        target,
        trovato,
        foundIndex: i,
        activeLine: 5,
        description: `Elemento trovato in posizione ${i}.`,
      });
    } else {
      steps.push({
        array: [...a],
        i,
        target,
        trovato,
        foundIndex: null,
        activeLine: 7,
        description: `Incremento i da ${i} a ${i + 1}.`,
      });

      i++;
    }
  }

  steps.push({
    array: [...a],
    i,
    target,
    trovato,
    foundIndex: trovato ? i : null,
    activeLine: 10,
    description: trovato
      ? `Restituisco la posizione ${i}.`
      : "Elemento non trovato. Restituisco -1.",
  });

  return steps;
}