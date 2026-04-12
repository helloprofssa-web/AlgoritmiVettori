import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, ArrowUpDown, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from "../components/ui";
import CodeSidebar from "../components/CodeSidebar";
import Footer from "../components/Footer";
import { parseVector } from "../algorithms/naiveSort";
import {
  cppLinesSelectionSort,
  selectionSortSteps,
} from "../algorithms/selectionSort";

export default function SelectionSortPage({ onBack }) {
  const [inputText, setInputText] = useState("7, 3, 9, 2, 5");
  const [baseArray, setBaseArray] = useState([7, 3, 9, 2, 5]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const timerRef = useRef(null);
  const descRef = useRef(null);

  const steps = useMemo(() => selectionSortSteps(baseArray), [baseArray]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const visibleDescriptions = steps
    .slice(0, stepIndex + 1)
    .map((step) => step.description);

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
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

  const comparisonsCount = steps
    .slice(0, stepIndex + 1)
    .filter((s) => s.activeLine === 4).length;

  const swapsCount = steps
    .slice(0, stepIndex + 1)
    .filter((s) => s.activeLine === 9).length;

  const startSimulation = () => {
    const parsed = parseVector(inputText);

    if (parsed.length > 0) {
      const sameArray =
        parsed.length === baseArray.length &&
        parsed.every((value, index) => value === baseArray[index]);

      setBaseArray(parsed);
      setStepIndex(0);

      if (sameArray) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setTimeout(() => {
          setIsPlaying(true);
        }, 0);
      }
    }
  };

  const reset = () => {
    setStepIndex(0);
    setIsPlaying(false);
  };

  const nextStep = () => {
    setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    setIsPlaying(false);
  };

  return (
    <div className="h-screen flex">
      <div className="w-[360px] border-r border-slate-200">
        <CodeSidebar
          lines={cppLinesSelectionSort}
          activeLine={currentStep.activeLine}
        />
      </div>

      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Selection Sort</h1>

            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla home
            </Button>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpDown className="h-5 w-5" />
                  Simulazione
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Vettore
                  </label>
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Es. 7, 3, 9, 2, 5"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      if (isPlaying) {
                        setIsPlaying(false);
                      } else {
                        startSimulation();
                      }
                    }}
                  >
                    {isPlaying ? (
                      <Pause className="mr-2 h-4 w-4" />
                    ) : (
                      <Play className="mr-2 h-4 w-4" />
                    )}
                    {isPlaying ? "Pausa" : "Avvia"}
                  </Button>

                  <Button onClick={nextStep}>
                    <SkipForward className="mr-2 h-4 w-4" />
                    Step
                  </Button>

                  <Button onClick={reset}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>

                <div>
                  <input
                    type="range"
                    min="300"
                    max="1600"
                    step="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                  />
                </div>

                <div className="flex gap-2 flex-wrap">
                  {currentStep.array.map((v, i) => {
                    const isI = i === currentStep.i;
                    const isJ = i === currentStep.j;
                    const isMin = i === currentStep.min;

                    return (
                      <div
                        key={i}
                        className={`w-14 h-14 flex items-center justify-center border rounded font-bold ${
                          isI
                            ? "bg-purple-200 border-purple-500"
                            : isMin
                            ? "bg-amber-200 border-amber-500"
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

                <div className="grid gap-3 md:grid-cols-4">
                  <div className="p-3 border rounded bg-purple-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-purple-700">
                      i
                    </div>
                    <div className="mt-1 text-2xl font-bold text-purple-900">
                      {currentStep.i !== null ? currentStep.i : "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded bg-pink-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-pink-700">
                      j
                    </div>
                    <div className="mt-1 text-2xl font-bold text-pink-900">
                      {currentStep.j !== null ? currentStep.j : "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded bg-amber-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                      min
                    </div>
                    <div className="mt-1 text-2xl font-bold text-amber-900">
                      {currentStep.min !== null ? currentStep.min : "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded bg-blue-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                      temp
                    </div>
                    <div className="mt-1 text-2xl font-bold text-blue-900">
                      {currentStep.temp !== null ? currentStep.temp : "-"}
                    </div>
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

                  <div className="p-3 border rounded bg-amber-50">
                    <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                      {currentStep.min !== null ? `v[${currentStep.min}]` : "v[min]"}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-amber-900">
                      {currentStep.min !== null ? currentStep.array[currentStep.min] : "-"}
                    </div>
                  </div>
                </div>

                <div
                  ref={descRef}
                  className="rounded-md border bg-white p-3 max-h-56 overflow-y-auto"
                >
                  <div className="space-y-1 text-sm">
                    {visibleDescriptions.map((description, index) => {
                      const isCurrent = index === stepIndex;

                      return (
                        <div
                          key={index}
                          className={`flex gap-2 items-start border-b last:border-b-0 pb-1 last:pb-0 ${
                            isCurrent ? "bg-amber-100" : ""
                          }`}
                        >
                          <span
                            className={`w-8 text-xs font-mono ${
                              isCurrent ? "text-amber-700 font-bold" : "text-slate-400"
                            }`}
                          >
                            {index + 1}.
                          </span>

                          <span
                            className={
                              isCurrent
                                ? "font-medium text-amber-900"
                                : "text-slate-700"
                            }
                          >
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
              <CardHeader>
                <CardTitle>Statistiche</CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <Badge>Confronti: {comparisonsCount}</Badge>
                <br />
                <Badge>Scambi: {swapsCount}</Badge>
              </CardContent>
            </Card>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}