export const cppLinesBubbleSort = [
  "void bubbleSort(int v[], int n) {",
  "    for (int i = 0; i < n - 1; i++) {",
  "        for (int j = 0; j < n - i - 1; j++) {",
  "            if (v[j] > v[j + 1]) {",
  "                int temp = v[j];",
  "                v[j] = v[j + 1];",
  "                v[j + 1] = temp;",
  "            }",
  "        }",
  "    }",
  "}",
];

export function bubbleSortSteps(input) {
  const a = [...input];
  const steps = [];

  steps.push({
    array: [...a],
    i: null,
    j: null,
    temp: null,
    sortedFrom: a.length,
    activeLine: null,
    description: "Vettore iniziale.",
  });

  for (let i = 0; i < a.length - 1; i++) {
    steps.push({
      array: [...a],
      i,
      j: null,
      temp: null,
      sortedFrom: a.length - i,
      activeLine: 1,
      description: `Inizio passata esterna i = ${i}.`,
    });

    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        array: [...a],
        i,
        j,
        temp: null,
        sortedFrom: a.length - i,
        activeLine: 2,
        description: `Confronto tra v[${j}] = ${a[j]} e v[${j + 1}] = ${a[j + 1]}.`,
      });

      steps.push({
        array: [...a],
        i,
        j,
        temp: null,
        sortedFrom: a.length - i,
        activeLine: 3,
        description: `Verifico se ${a[j]} > ${a[j + 1]}.`,
      });

      if (a[j] > a[j + 1]) {
        const temp = a[j];

        steps.push({
          array: [...a],
          i,
          j,
          temp,
          sortedFrom: a.length - i,
          activeLine: 4,
          description: `Salvo ${a[j]} in temp.`,
        });

        a[j] = a[j + 1];
        steps.push({
          array: [...a],
          i,
          j,
          temp,
          sortedFrom: a.length - i,
          activeLine: 5,
          description: `Assegno v[${j}] = ${a[j]}.`,
        });

        a[j + 1] = temp;
        steps.push({
          array: [...a],
          i,
          j,
          temp,
          sortedFrom: a.length - i,
          activeLine: 6,
          description: `Assegno v[${j + 1}] = temp (${temp}).`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    i: null,
    j: null,
    temp: null,
    sortedFrom: 0,
    activeLine: null,
    description: "Ordinamento completato.",
  });

  return steps;
}