export const cppLinesOrderedLinearSearch = [
  "int ricercaOrdinataSemplice(int v[], int n, int x) {",
  "    if (x > v[n - 1]) {",
  "        return -1;",
  "    }",
  "    for (int i = 0; i < n; i++) {",
  "        if (v[i] == x) {",
  "            return i;",
  "        }",
  "    }",
  "    return -1;",
  "}",
];

export function orderedLinearSearchSteps(input, target) {
  const a = [...input].sort((x, y) => x - y);
  const steps = [];

  steps.push({
    array: [...a],
    i: null,
    target,
    foundIndex: null,
    activeLine: null,
    description: `Vettore ordinato iniziale. Cerco il valore ${target}.`,
  });

  steps.push({
    array: [...a],
    i: null,
    target,
    foundIndex: null,
    activeLine: 1,
    description: `Controllo se ${target} > ultimo elemento ${a[a.length - 1]}.`,
  });

  if (target > a[a.length - 1]) {
    steps.push({
      array: [...a],
      i: null,
      target,
      foundIndex: null,
      activeLine: 2,
      description: "Il valore è maggiore dell'ultimo elemento. Restituisco -1.",
    });

    return steps;
  }

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: [...a],
      i,
      target,
      foundIndex: null,
      activeLine: 3,
      description: `Ciclo for: i = ${i}.`,
    });

    steps.push({
      array: [...a],
      i,
      target,
      foundIndex: null,
      activeLine: 4,
      description: `Controllo se v[${i}] = ${a[i]} è uguale a ${target}.`,
    });

    if (a[i] === target) {
      steps.push({
        array: [...a],
        i,
        target,
        foundIndex: i,
        activeLine: 5,
        description: `Elemento trovato in posizione ${i}.`,
      });

      return steps;
    }
  }

  steps.push({
    array: [...a],
    i: null,
    target,
    foundIndex: null,
    activeLine: 8,
    description: "Elemento non trovato. Restituisco -1.",
  });

  return steps;
}