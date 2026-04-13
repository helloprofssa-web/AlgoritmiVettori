export const cppLinesLastOccurrence = [
  "int ultimaOccorrenza(int v[], int n, int x) {",
  "    int posizione = -1;",
  "    for (int i = 0; i < n; i++) {",
  "        if (v[i] == x) {",
  "            posizione = i;",
  "        }",
  "    }",
  "    return posizione;",
  "}",
];

export function lastOccurrenceSteps(input, target) {
  const a = [...input];
  const steps = [];

  let posizione = -1;

  steps.push({
    array: [...a],
    i: null,
    posizione,
    target,
    activeLine: null,
    description: `Cerco l'ultima occorrenza di ${target}.`,
  });

  for (let i = 0; i < a.length; i++) {
    steps.push({
      array: [...a],
      i,
      posizione,
      target,
      activeLine: 2,
      description: `Controllo posizione ${i}.`,
    });

    if (a[i] === target) {
      posizione = i;

      steps.push({
        array: [...a],
        i,
        posizione,
        target,
        activeLine: 4,
        description: `Aggiorno posizione = ${posizione}.`,
      });
    }
  }

  steps.push({
    array: [...a],
    i: null,
    posizione,
    target,
    activeLine: 7,
    description: `Ultima posizione trovata: ${posizione}.`,
  });

  return steps;
}