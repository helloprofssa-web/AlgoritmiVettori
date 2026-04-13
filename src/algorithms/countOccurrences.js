export const cppLinesCountOccurrences = [
  "int contaOccorrenze(int v[], int n, int x) {",
  "    int count = 0;",
  "    for (int i = 0; i < n; i++) {",
  "        if (v[i] == x) {",
  "            count++;",
  "        }",
  "    }",
  "    return count;",
  "}",
];

export function countOccurrencesSteps(input, target) {
  const a = [...input];
  const steps = [];

  let count = 0;

  steps.push({
    array: [...a],
    i: null,
    count,
    target,
    activeLine: null,
    description: `Cerco quante volte compare ${target}.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: [...a],
      i,
      count,
      target,
      activeLine: 2,
      description: `Controllo posizione ${i}.`,
    });

    if (a[i] === target) {
      count++;

      steps.push({
        array: [...a],
        i,
        count,
        target,
        activeLine: 4,
        description: `Trovato! count = ${count}.`,
      });
    }
  }

  steps.push({
    array: [...a],
    i: null,
    count,
    target,
    activeLine: 7,
    description: `Totale occorrenze: ${count}.`,
  });

  return steps;
}