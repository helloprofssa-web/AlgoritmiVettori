import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, SkipForward, ArrowUpDown, Code2 } from "lucide-react";

// Codice C++ corretto con funzione
const cppLines = [
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

function naiveSortSteps(input) {
  const a = [...input];
  const steps = [];

  steps.push({ array: [...a], i: null, j: null, temp: null, activeLine: null, description: "Vettore iniziale." });

  for (let i = 0; i < a.length - 1; i++) {
    steps.push({ array: [...a], i, j: null, temp: null, activeLine: 1, description: `Inizio ciclo esterno i = ${i}.` });

    for (let j = i + 1; j < a.length; j++) {
      steps.push({ array: [...a], i, j, temp: null, activeLine: 2, description: `Inizio ciclo interno j = ${j}.` });

      const shouldSwap = a[i] > a[j];
      steps.push({ array: [...a], i, j, temp: null, activeLine: 3, description: `Controllo se ${a[i]} > ${a[j]}.` });

      if (shouldSwap) {
        const temp = a[i];

        steps.push({ array: [...a], i, j, temp, activeLine: 4, description: `Salvo ${a[i]} in temp.` });

        a[i] = a[j];
        steps.push({ array: [...a], i, j, temp, activeLine: 5, description: `Assegno v[${i}] = ${a[i]}.` });

        a[j] = temp;
        steps.push({ array: [...a], i, j, temp, activeLine: 6, description: `Assegno v[${j}] = temp (${temp}).` });
      }
    }
  }

  steps.push({ array: [...a], i: null, j: null, temp: null, activeLine: null, description: "Ordinamento completato." });
  return steps;
}

function parseVector(text) {
  return text.split(",").map(x => x.trim()).filter(x => x !== "").map(Number).filter(x => !Number.isNaN(x));
}

function CodeSidebar({ activeLine }) {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Code2 className="h-5 w-5" />
        <span className="font-semibold">Codice C++</span>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-sm">
        {cppLines.map((line, index) => {
          const isActive = activeLine === index;
          return (
            <div key={index} className={`flex gap-3 px-4 py-1 ${isActive ? "bg-amber-400/20" : ""}`}>
              <span className={`w-6 text-right text-xs ${isActive ? "text-amber-300" : "text-slate-500"}`}>
                {index + 1}
              </span>
              <span className={isActive ? "text-amber-100" : "text-slate-200"} style={{ whiteSpace: 'pre' }}>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SortingDemoApp() {
  const [inputText, setInputText] = useState("7, 3, 9, 2, 5");
  const [baseArray, setBaseArray] = useState([7, 3, 9, 2, 5]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);

  const steps = useMemo(() => naiveSortSteps(baseArray), [baseArray]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const visibleDescriptions = steps.slice(0, stepIndex + 1).map(step => step.description);
  const descRef = useRef(null);

  useEffect(() => {
    if (!isPlaying) return;
    timerRef.current = setInterval(() => {
      setStepIndex(prev => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, steps.length]);

  // Auto-scroll descrizioni verso il basso
  useEffect(() => {
    if (descRef.current) {
      descRef.current.scrollTop = descRef.current.scrollHeight;
    }
  }, [stepIndex]);

  const comparisonsCount = steps.slice(0, stepIndex + 1).filter(s => s.activeLine === 3).length;
  const swapsCount = steps.slice(0, stepIndex + 1).filter(s => s.activeLine === 6).length;

  const applyInput = () => {
    const parsed = parseVector(inputText);
    if (parsed.length > 0) {
      setBaseArray(parsed);
      setStepIndex(0);
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    setStepIndex(prev => Math.min(prev + 1, steps.length - 1));
    setIsPlaying(false);
  };

  return (
    <div className="h-screen flex">
      <div className="w-[360px] border-r border-slate-200">
        <CodeSidebar activeLine={currentStep.activeLine} />
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Demo ordinamento di un vettore</h1>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" /> Simulazione
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input value={inputText} onChange={e => setInputText(e.target.value)} />
                  <Button onClick={applyInput}>Carica</Button>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setIsPlaying(v => !v)}>
                    {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isPlaying ? "Pausa" : "Avvia"}
                  </Button>
                  <Button onClick={nextStep}><SkipForward className="mr-2 h-4 w-4" />Step</Button>
                  <Button onClick={reset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
                </div>

                <div>
                  <input type="range" min="300" max="1600" step="100" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {currentStep.array.map((v, i) => {
                    const isI = i === currentStep.i;
                    const isJ = i === currentStep.j;
                    return (
                      <div
                        key={i}
                        className={`w-14 h-14 flex items-center justify-center border rounded font-bold ${
                          isI
                            ? "bg-purple-200 border-purple-500"
                            : isJ
                            ? "bg-pink-200 border-pink-500"
                            : "bg-white"
                        }`}
                      >
                        {v}
                      </div>
                    );
                  })}
                </div>

                {/* Riga 1: i, j, temp */}
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="p-3 border rounded bg-amber-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">i</div>
                    <div className="mt-1 text-2xl font-bold text-amber-900">{currentStep.i !== null ? currentStep.i : "-"}</div>
                  </div>
                  <div className="p-3 border rounded bg-emerald-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">j</div>
                    <div className="mt-1 text-2xl font-bold text-emerald-900">{currentStep.j !== null ? currentStep.j : "-"}</div>
                  </div>
                  <div className="p-3 border rounded bg-blue-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">temp</div>
                    <div className="mt-1 text-2xl font-bold text-blue-900">{currentStep.temp !== null ? currentStep.temp : "-"}</div>
                  </div>
                </div>

                {/* Riga 2: posizioni e valori del vettore */}
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="p-3 border rounded bg-purple-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                      {currentStep.i !== null ? `v[${currentStep.i}]` : "v[i]"}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-purple-900">
                      {currentStep.i !== null ? currentStep.array[currentStep.i] : "-"}
                    </div>
                  </div>
                  <div className="p-3 border rounded bg-pink-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-pink-700">
                      {currentStep.j !== null ? `v[${currentStep.j}]` : "v[j]"}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-pink-900">
                      {currentStep.j !== null ? currentStep.array[currentStep.j] : "-"}
                    </div>
                  </div>
                  <div></div>
                </div>

                <div ref={descRef} className="rounded-md border bg-white p-3 max-h-56 overflow-y-auto">
                  <div className="space-y-1 text-sm">
                    {visibleDescriptions.map((description, index) => {
                      const isCurrent = index === stepIndex;
                      return (
                        <div
                          key={index}
                          className={`flex gap-2 items-start border-b last:border-b-0 pb-1 last:pb-0 ${isCurrent ? "bg-amber-100" : ""}`}
                        >
                          <span className={`w-8 text-xs font-mono ${isCurrent ? "text-amber-700 font-bold" : "text-slate-400"}`}>
                            {index + 1}.
                          </span>
                          <span className={isCurrent ? "font-medium text-amber-900" : "text-slate-700"}>
                            {description}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Statistiche</CardTitle></CardHeader>
              <CardContent>
                <Badge>Confronti: {comparisonsCount}</Badge>
                <br />
                <Badge>Scambi: {swapsCount}</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
