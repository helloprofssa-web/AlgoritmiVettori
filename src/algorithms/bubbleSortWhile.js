export const cppLinesBubbleSortWhile = [
  "void BubbleSort(int Vet[], int n) {",
  "    int i, k, sup, comodo;",
  "    bool continua = true;",
  "    k = n - 1;",
  "    while (continua) {",
  "        sup = k + 1;",
  "        continua = false;",
  "        for (i = 0; i < sup - 1; i++) {",
  "            if (Vet[i] > Vet[i + 1]) {",
  "                comodo = Vet[i];",
  "                Vet[i] = Vet[i + 1];",
  "                Vet[i + 1] = comodo;",
  "                continua = true;",
  "                k = i;",
  "            }",
  "        }",
  "    }",
  "}",
];

export function bubbleSortWhileSteps(input) {
  const a = [...input];
  const steps = [];

  let k = a.length - 1;
  let continua = true;

  steps.push({
    array: [...a],
    i: null,
    k,
    sup: null,
    comodo: null,
    continua,
    activeLine: null,
    description: "Vettore iniziale.",
  });

  steps.push({
    array: [...a],
    i: null,
    k,
    sup: null,
    comodo: null,
    continua,
    activeLine: 2,
    description: "Imposto continua = true.",
  });

  steps.push({
    array: [...a],
    i: null,
    k,
    sup: null,
    comodo: null,
    continua,
    activeLine: 3,
    description: `Imposto k = ${k}.`,
  });

  while (continua) {
    steps.push({
      array: [...a],
      i: null,
      k,
      sup: null,
      comodo: null,
      continua,
      activeLine: 4,
      description: "Controllo while (continua).",
    });

    const sup = k + 1;

    steps.push({
      array: [...a],
      i: null,
      k,
      sup,
      comodo: null,
      continua,
      activeLine: 5,
      description: `Calcolo sup = ${sup}.`,
    });

    continua = false;

    steps.push({
      array: [...a],
      i: null,
      k,
      sup,
      comodo: null,
      continua,
      activeLine: 6,
      description: "Imposto continua = false.",
    });

    for (let i = 0; i < sup - 1; i++) {
      steps.push({
        array: [...a],
        i,
        k,
        sup,
        comodo: null,
        continua,
        activeLine: 7,
        description: `Ciclo for: i = ${i}.`,
      });

      steps.push({
        array: [...a],
        i,
        k,
        sup,
        comodo: null,
        continua,
        activeLine: 8,
        description: `Controllo se Vet[${i}] = ${a[i]} è maggiore di Vet[${i + 1}] = ${a[i + 1]}.`,
      });

      if (a[i] > a[i + 1]) {
        const comodo = a[i];

        steps.push({
          array: [...a],
          i,
          k,
          sup,
          comodo,
          continua,
          activeLine: 9,
          description: `Salvo ${a[i]} in comodo.`,
        });

        a[i] = a[i + 1];

        steps.push({
          array: [...a],
          i,
          k,
          sup,
          comodo,
          continua,
          activeLine: 10,
          description: `Assegno Vet[${i}] = ${a[i]}.`,
        });

        a[i + 1] = comodo;

        steps.push({
          array: [...a],
          i,
          k,
          sup,
          comodo,
          continua,
          activeLine: 11,
          description: `Assegno Vet[${i + 1}] = ${comodo}.`,
        });

        continua = true;

        steps.push({
          array: [...a],
          i,
          k,
          sup,
          comodo,
          continua,
          activeLine: 12,
          description: "Imposto continua = true.",
        });

        k = i;

        steps.push({
          array: [...a],
          i,
          k,
          sup,
          comodo,
          continua,
          activeLine: 13,
          description: `Aggiorno k = ${k}.`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    i: null,
    k,
    sup: null,
    comodo: null,
    continua,
    activeLine: null,
    description: "Ordinamento completato.",
  });

  return steps;
}