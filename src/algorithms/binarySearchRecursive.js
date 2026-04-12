export const cppLinesBinarySearchRecursive = [
  "int ricercaBinariaRic(int v[], int primo, int ultimo, int x) {",
  "    if (primo > ultimo) {",
  "        return -1;",
  "    }",
  "    int centro = (primo + ultimo) / 2;",
  "    if (v[centro] == x) {",
  "        return centro;",
  "    }",
  "    if (x < v[centro]) {",
  "        return ricercaBinariaRic(v, primo, centro - 1, x);",
  "    } else {",
  "        return ricercaBinariaRic(v, centro + 1, ultimo, x);",
  "    }",
  "}",
];

export function binarySearchRecursiveSteps(input, target) {
  const a = [...input].sort((x, y) => x - y);
  const steps = [];

  steps.push({
    array: [...a],
    primo: 0,
    ultimo: a.length - 1,
    centro: null,
    target,
    foundIndex: null,
    callText: `ricercaBinariaRic(v, 0, ${a.length - 1}, ${target})`,
    depth: 0,
    activeLine: null,
    description: `Vettore ordinato iniziale. Cerco il valore ${target}.`,
  });

  function recurse(primo, ultimo, depth) {
    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro: null,
      target,
      foundIndex: null,
      callText: `ricercaBinariaRic(v, ${primo}, ${ultimo}, ${target})`,
      depth,
      activeLine: 0,
      description: `Chiamata ricorsiva con primo = ${primo} e ultimo = ${ultimo}.`,
    });

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro: null,
      target,
      foundIndex: null,
      callText: `ricercaBinariaRic(v, ${primo}, ${ultimo}, ${target})`,
      depth,
      activeLine: 1,
      description: `Controllo il caso base: primo > ultimo?`,
    });

    if (primo > ultimo) {
      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro: null,
        target,
        foundIndex: null,
        callText: `return -1`,
        depth,
        activeLine: 2,
        description: "Caso base raggiunto: valore non trovato.",
      });
      return -1;
    }

    const centro = Math.floor((primo + ultimo) / 2);

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro,
      target,
      foundIndex: null,
      callText: `ricercaBinariaRic(v, ${primo}, ${ultimo}, ${target})`,
      depth,
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
      callText: `ricercaBinariaRic(v, ${primo}, ${ultimo}, ${target})`,
      depth,
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
        callText: `return ${centro}`,
        depth,
        activeLine: 6,
        description: `Valore trovato in posizione ${centro}.`,
      });
      return centro;
    }

    steps.push({
      array: [...a],
      primo,
      ultimo,
      centro,
      target,
      foundIndex: null,
      callText: `ricercaBinariaRic(v, ${primo}, ${ultimo}, ${target})`,
      depth,
      activeLine: 8,
      description: `Controllo se ${target} < ${a[centro]}.`,
    });

    if (target < a[centro]) {
      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro,
        target,
        foundIndex: null,
        callText: `ricercaBinariaRic(v, ${primo}, ${centro - 1}, ${target})`,
        depth,
        activeLine: 9,
        description: `Nuova chiamata sulla metà sinistra.`,
      });

      return recurse(primo, centro - 1, depth + 1);
    } else {
      steps.push({
        array: [...a],
        primo,
        ultimo,
        centro,
        target,
        foundIndex: null,
        callText: `ricercaBinariaRic(v, ${centro + 1}, ${ultimo}, ${target})`,
        depth,
        activeLine: 11,
        description: `Nuova chiamata sulla metà destra.`,
      });

      return recurse(centro + 1, ultimo, depth + 1);
    }
  }

  recurse(0, a.length - 1, 0);
  return steps;
}