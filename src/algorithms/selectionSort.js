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

  // stato iniziale
  steps.push({
    array: [...a],
    i: null,
    j: null,
    min: null,
    temp: null,
    activeLine: null,
    description: "Vettore iniziale.",
  });

  for (let i = 0; i < a.length - 1; i++) {
    let min = i;

    // inizio ciclo esterno
    steps.push({
      array: [...a],
      i,
      j: null,
      min,
      temp: null,
      activeLine: 2,
      description: `Inizio ciclo esterno: i = ${i}. Imposto min = ${min}.`,
    });

    for (let j = i + 1; j < a.length; j++) {
      // confronto
      steps.push({
        array: [...a],
        i,
        j,
        min,
        temp: null,
        activeLine: 4,
        description: `Confronto v[${j}] = ${a[j]} con v[min] = ${a[min]}.`,
      });

      if (a[j] < a[min]) {
        min = j;

        // nuovo minimo
        steps.push({
          array: [...a],
          i,
          j,
          min,
          temp: null,
          activeLine: 5,
          description: `Nuovo minimo trovato: posizione ${min} (valore ${a[min]}).`,
        });
      }
    }

    // controllo se serve scambio
    steps.push({
      array: [...a],
      i,
      j: null,
      min,
      temp: null,
      activeLine: 8,
      description:
        min !== i
          ? `min (${min}) è diverso da i (${i}) → eseguo lo scambio.`
          : `min coincide con i → nessuno scambio necessario.`,
    });

    if (min !== i) {
      const temp = a[i];

      // salvo temp
      steps.push({
        array: [...a],
        i,
        j: null,
        min,
        temp,
        activeLine: 9,
        description: `Salvo v[${i}] = ${temp} in temp.`,
      });

      a[i] = a[min];

      // assegno v[i]
      steps.push({
        array: [...a],
        i,
        j: null,
        min,
        temp,
        activeLine: 10,
        description: `Assegno v[${i}] = ${a[i]}.`,
      });

      a[min] = temp;

      // assegno v[min]
      steps.push({
        array: [...a],
        i,
        j: null,
        min,
        temp,
        activeLine: 11,
        description: `Assegno v[${min}] = temp (${temp}).`,
      });
    }
  }

  // fine algoritmo
  steps.push({
    array: [...a],
    i: null,
    j: null,
    min: null,
    temp: null,
    activeLine: null,
    description: "Ordinamento completato.",
  });

  return steps;
}