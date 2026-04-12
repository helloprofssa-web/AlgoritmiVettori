export const cppLinesNaiveSort = [
  "void naiveSort(int v[], int n) {",
  "    for (int i = 0; i < n - 1; i++) {",
  "        for (int j = i + 1; j < n; j++) {",
  "            if (v[i] > v[j]) {",
  "                int temp = v[i];",
  "                v[i] = v[j];",
  "                v[j] = temp;",
  "            }",
  "        }",
  "    }",
  "}",
];

export function naiveSortSteps(input) {
  const a = [...input];
  const steps = [];

  steps.push({
    array: [...a],
    i: null,
    j: null,
    temp: null,
    activeLine: null,
    description: "Vettore iniziale.",
  });

  for (let i = 0; i < a.length - 1; i++) {
    steps.push({
      array: [...a],
      i,
      j: null,
      temp: null,
      activeLine: 1,
      description: `Inizio ciclo esterno i = ${i}.`,
    });

    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        array: [...a],
        i,
        j,
        temp: null,
        activeLine: 2,
        description: `Inizio ciclo interno j = ${j}.`,
      });

      const shouldSwap = a[i] > a[j];

      steps.push({
        array: [...a],
        i,
        j,
        temp: null,
        activeLine: 3,
        description: `Controllo se ${a[i]} > ${a[j]}.`,
      });

      if (shouldSwap) {
        const temp = a[i];

        steps.push({
          array: [...a],
          i,
          j,
          temp,
          activeLine: 4,
          description: `Salvo ${a[i]} in temp.`,
        });

        a[i] = a[j];
        steps.push({
          array: [...a],
          i,
          j,
          temp,
          activeLine: 5,
          description: `Assegno v[${i}] = ${a[i]}.`,
        });

        a[j] = temp;
        steps.push({
          array: [...a],
          i,
          j,
          temp,
          activeLine: 6,
          description: `Assegno v[${j}] = temp (${temp}).`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    i: null,
    j: null,
    temp: null,
    activeLine: null,
    description: "Ordinamento completato.",
  });

  return steps;
}

export function parseVector(text) {
  return text
    .split(",")
    .map((x) => x.trim())
    .filter((x) => x !== "")
    .map(Number)
    .filter((x) => !Number.isNaN(x));
}