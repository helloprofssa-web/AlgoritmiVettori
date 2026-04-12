export const cppLinesBinarySearch = [
  "int ricercaBinaria(int v[], int n, int x) {",
  "    int primo = 0;",
  "    int ultimo = n - 1;",
  "    while (primo <= ultimo) {",
  "        int centro = (primo + ultimo) / 2;",
  "        if (v[centro] == x) {",
  "            return centro;",
  "        } else if (x < v[centro]) {",
  "            ultimo = centro - 1;",
  "        } else {",
  "            primo = centro + 1;",
  "        }",
  "    }",
  "    return -1;",
  "}",
];

export function binarySearchSteps(input, target) {
  const a = [...input].sort((x, y) => x - y);
  const steps = [];

  let primo = 0;
  let ultimo = a.length - 1;

  steps.push({
    array: [...a],
    primo,
    ultimo,
    centro: null,
    target,
    foundIndex: null,
    activeLine: null,
    description: `Vettore ordinato iniziale. Cerco il valore ${target}.`,
  });

  steps.push({
    array: [...a],
    primo,
    ultimo,
    centro: null,
    target,
    foundIndex: null,
    activeLine: 1,
    description: `Imposto primo = ${primo}.`,
  });

  steps.push({
    array: [...a],
    primo,
    ultimo,
    centro: null,
    target,
    foundIndex: null,
    activeLine: 2,
    description: `Imposto ultimo = ${ultimo}.`,
  });

  while (primo <= ultimo) {
    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro: null,
      target,
      foundIndex: null,
      activeLine: 3,
      description: `Controllo se primo <= ultimo (${primo} <= ${ultimo}).`,
    });

    const centro = Math.floor((primo + ultimo) / 2);

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro,
      target,
      foundIndex: null,
      activeLine: 4,
      description: `Calcolo centro = ${centro}.`,
    });

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro,
      target,
      foundIndex: null,
      activeLine: 5,
      description: `Controllo se v[centro] = ${a[centro]} è uguale a ${target}.`,
    });

    if (a[centro] === target) {
      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro,
        target,
        foundIndex: centro,
        activeLine: 6,
        description: `Valore trovato in posizione ${centro}.`,
      });

      return steps;
    }

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro,
      target,
      foundIndex: null,
      activeLine: 7,
      description: `Controllo se ${target} < ${a[centro]}.`,
    });

    if (target < a[centro]) {
      ultimo = centro - 1;

      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro,
        target,
        foundIndex: null,
        activeLine: 8,
        description: `Restringo la ricerca a sinistra: ultimo = ${ultimo}.`,
      });
    } else {
      primo = centro + 1;

      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro,
        target,
        foundIndex: null,
        activeLine: 10,
        description: `Restringo la ricerca a destra: primo = ${primo}.`,
      });
    }
  }

  steps.push({
    array: [...a],
    primo,
    ultimo,
    centro: null,
    target,
    foundIndex: null,
    activeLine: 13,
    description: "Valore non trovato. Restituisco -1.",
  });

  return steps;
}