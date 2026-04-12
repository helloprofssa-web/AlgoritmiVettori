export const cppLinesLinearSearchFor = [
  "int ricercaSequenzialeFor(int v[], int n, int x) {",
  "    for (int i = 0; i < n; i++) {",
  "        if (v[i] == x) {",
  "            return i;",
  "        }",
  "    }",
  "    return -1;",
  "}",
];

export function linearSearchForSteps(input, target) {
  const a = [...input];
  const steps = [];

  steps.push({
    array: [...a],
    i: null,
    target,
    foundIndex: null,
    activeLine: null,
    description: `Vettore iniziale. Cerco il valore ${target}.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: [...a],
      i,
      target,
      foundIndex: null,
      activeLine: 1,
      description: `Ciclo for: i = ${i}.`,
    });

    steps.push({
      array: [...a],
      i,
      target,
      foundIndex: null,
      activeLine: 2,
      description: `Controllo se v[${i}] = ${a[i]} è uguale a ${target}.`,
    });

    if (a[i] === target) {
      steps.push({
        array: [...a],
        i,
        target,
        foundIndex: i,
        activeLine: 3,
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
    activeLine: 5,
    description: "Elemento non trovato. Restituisco -1.",
  });

  return steps;
}