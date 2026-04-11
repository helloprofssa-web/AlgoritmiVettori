import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, ArrowUpDown, Code2, Search, Home, ArrowLeft, Binary } from "lucide-react";
function Card({ className = "", children }) {
  return <div className={`rounded-3xl shadow-sm border bg-white ${className}`}>{children}</div>;
}

function CardHeader({ className = "", children }) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

function CardTitle({ className = "", children }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

function CardContent({ className = "", children }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

function Button({ className = "", variant = "default", children, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
      {...props}
    />
  );
}

function Badge({ className = "", children }) {
  return (
    <span className={`inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 ${className}`}>
      {children}
    </span>
  );
}
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
              <span className={isActive ? "text-amber-100" : "text-slate-200"} style={{ whiteSpace: "pre" }}>{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HomePage({ onNavigate }) {
  const items = [
    {
      key: "ricerca-binaria",
      title: "Ricerca binaria",
      description: "Esplora la ricerca binaria su un vettore ordinato, osservando metà sinistra, metà destra e posizione centrale.",
      icon: Search,
    },
    {
      key: "ricerca-binaria-ricorsiva",
      title: "Ricerca binaria ricorsiva",
      description: "Versione ricorsiva della ricerca binaria, utile per mostrare chiamate, casi base e riduzione del problema.",
      icon: Binary,
    },
    {
      key: "ordinamento-ingenuo",
      title: "Ordinamento ingenuo",
      description: "Visualizza confronto, scambio, variabili i, j, temp e andamento dell'algoritmo passo passo.",
      icon: ArrowUpDown,
    },
    {
      key: "bubble-sort",
      title: "Bubble sort",
      description: "Confronta elementi adiacenti e osserva come i valori più grandi si spostano verso destra.",
      icon: ArrowUpDown,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Home className="h-8 w-8 text-slate-700" />
            <h1 className="text-4xl font-bold tracking-tight">Algoritmi su vettori</h1>
          </div>
          <p className="text-lg text-slate-600 max-w-3xl leading-7">
            Benvenuti in questa piccola raccolta di simulazioni interattive. In queste pagine puoi osservare il funzionamento di alcuni algoritmi classici studiati in C++, seguendo passo passo il codice, le variabili e l'evoluzione del vettore.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.key} className="rounded-3xl shadow-sm border hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Icon className="h-6 w-6" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600 leading-6">{item.description}</p>
                  <Button onClick={() => onNavigate(item.key)}>Apri pagina</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PlaceholderPage({ title, description, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla home
        </Button>
        <Card className="rounded-3xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-600 leading-7">{description}</p>
            <p className="text-slate-500">Questa sezione è pronta per essere completata con la simulazione interattiva.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function NaiveSortPage({ onBack }) {
  const [inputText, setInputText] = useState("7, 3, 9, 2, 5");
  const [baseArray, setBaseArray] = useState([7, 3, 9, 2, 5]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);
  const timerRef = useRef(null);
  const descRef = useRef(null);

  const steps = useMemo(() => naiveSortSteps(baseArray), [baseArray]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const visibleDescriptions = steps.slice(0, stepIndex + 1).map(step => step.description);

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
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Ordinamento ingenuo</h1>
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Torna alla home
            </Button>
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

export default function SortingDemoApp() {
  const [page, setPage] = useState("home");

  if (page === "ordinamento-ingenuo") {
    return <NaiveSortPage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-binaria") {
    return (
      <PlaceholderPage
        title="Ricerca binaria"
        description="In questa pagina potrai simulare la ricerca binaria iterativa su un vettore ordinato, osservando la scelta dell'elemento centrale e la riduzione progressiva dell'intervallo di ricerca."
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "ricerca-binaria-ricorsiva") {
    return (
      <PlaceholderPage
        title="Ricerca binaria ricorsiva"
        description="In questa pagina potrai mostrare il funzionamento della ricerca binaria ricorsiva, con particolare attenzione alle chiamate della funzione, ai parametri e al caso base."
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "bubble-sort") {
    return (
      <PlaceholderPage
        title="Bubble sort"
        description="In questa pagina potrai costruire la simulazione del bubble sort, mostrando confronti tra elementi adiacenti e il progressivo ordinamento del vettore."
        onBack={() => setPage("home")}
      />
    );
  }

  return <HomePage onNavigate={setPage} />;
}
