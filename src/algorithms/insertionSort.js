export const cppLinesInsertionSort = [
  "void insertionSort(int v[], int n) {",
  "    int i, j, key;",
  "    for (i = 1; i < n; i++) {",
  "        key = v[i];",
  "        j = i - 1;",
  "        while (j >= 0 && v[j] > key) {",
  "            v[j + 1] = v[j];",
  "            j--;",
  "        }",
  "        v[j + 1] = key;",
  "    }",
  "}",
];

export function insertionSortSteps(input) {
  const a = [...input];
  const steps = [];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      i,
      j,
      key,
      activeLine: 2,
      description: `Prendo key = ${key}`,
    });

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];

      steps.push({
        array: [...a],
        i,
        j,
        key,
        activeLine: 5,
        description: `Sposto ${a[j]} a destra`,
      });

      j--;
    }

    a[j + 1] = key;

    steps.push({
      array: [...a],
      i,
      j,
      key,
      activeLine: 8,
      description: `Inserisco key in posizione ${j + 1}`,
    });
  }

  return steps;
}