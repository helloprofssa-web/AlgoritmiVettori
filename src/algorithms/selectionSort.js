export const cppLinesSelectionSort = [
  "void selectionSort(int v[], int n) {",
  "    int i, j, min;",
  "    for (i = 0; i < n - 1; i++) {",
  "        min = i;",
  "        for (j = i + 1; j < n; j++) {",
  "            if (v[j] < v[min]) {",
  "                min = j;",
  "            }",
  "        }",
  "        if (min != i) {",
  "            int temp = v[i];",
  "            v[i] = v[min];",
  "            v[min] = temp;",
  "        }",
  "    }",
  "}",
];

export function selectionSortSteps(input) {
  const a = [...input];
  const steps = [];

  steps.push({
    array: [...a],
    i: null,
    j: null,
    min: null,
    activeLine: null,
    description: "Vettore iniziale.",
  });

  for (let i = 0; i < a.length - 1; i++) {
    let min = i;

    steps.push({
      array: [...a],
      i,
      j: null,
      min,
      activeLine: 2,
      description: `Inizio ciclo esterno i = ${i}.`,
    });

    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        array: [...a],
        i,
        j,
        min,
        activeLine: 4,
        description: `Confronto v[${j}] = ${a[j]} con v[min] = ${a[min]}.`,
      });

      if (a[j] < a[min]) {
        min = j;

        steps.push({
          array: [...a],
          i,
          j,
          min,
          activeLine: 5,
          description: `Nuovo minimo trovato in posizione ${min}.`,
        });
      }
    }

    if (min !== i) {
      const temp = a[i];
      a[i] = a[min];
      a[min] = temp;

      steps.push({
        array: [...a],
        i,
        j: null,
        min,
        activeLine: 9,
        description: `Scambio v[${i}] con v[${min}].`,
      });
    }
  }

  steps.push({
    array: [...a],
    i: null,
    j: null,
    min: null,
    activeLine: null,
    description: "Ordinamento completato.",
  });

  return steps;
}