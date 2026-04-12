import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, ArrowLeft, ArrowUpDown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from "../components/ui";
import Footer from "../components/Footer";
import { parseVector } from "../algorithms/naiveSort";
import { bubbleSortSteps } from "../algorithms/bubbleSort";
import { selectionSortSteps } from "../algorithms/selectionSort";

function SortPanel({
  title,
  currentStep,
  visibleDescriptions,
  descRef,
  stats,
  type,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {currentStep.array.map((v, i) => {
            let className = "bg-white";

            if (type === "bubble") {
              const isJ = i === currentStep.j;
              const isJ1 = i === currentStep.j + 1;

              className = isJ
                ? "bg-purple-200 border-purple-500"
                : isJ1
                ? "bg-pink-200 border-pink-500"
                : "bg-white";
            }

            if (type === "selection") {
              const isI = i === currentStep.i;
              const isJ = i === currentStep.j;
              const isMin = i === currentStep.min;

              className = isI
                ? "bg-purple-200 border-purple-500"
                : isMin
                ? "bg-amber-200 border-amber-500"
                : isJ
                ? "bg-pink-200 border-pink-500"
                : "bg-white";
            }

            return (
              <div
                key={i}
                className={`w-14 h-14 flex items-center justify-center border rounded font-bold ${className}`}
              >
                {v}
              </div>
            );
          })}
        </div>

        {type === "bubble" && (
          <div className="grid gap-3 md:grid-cols-3">
            <div className="p-3 border rounded bg-amber-50">
              <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                i
              </div>
              <div className="mt-1 text-2xl font-bold text-amber-900">
                {currentStep.i !== null ? currentStep.i : "-"}
              </div>
            </div>

            <div className="p-3 border rounded bg-emerald-50">
              <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                j
              </div>
              <div className="mt-1 text-2xl font-bold text-emerald-900">
                {currentStep.j !== null ? currentStep.j : "-"}
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
        )}

        {type === "selection" && (
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
        )}

        <div
          ref={descRef}
          className="rounded-md border bg-white p-3 max-h-56 overflow-y-auto"
        >
          <div className="space-y-1 text-sm">
            {visibleDescriptions.map((description, index) => {
              const isCurrent = index === visibleDescriptions.length - 1;

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

                  <span className={isCurrent ? "font-medium text-amber-900" : "text-slate-700"}>
                    {description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          {stats.map((item, index) => (
            <div key={index}>
              <Badge>{item}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function CompareSortPage({ onBack }) {
  const [inputText, setInputText] = useState("7, 3, 9, 2, 5");
  const [baseArray, setBaseArray] = useState([7, 3, 9, 2, 5]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const timerRef = useRef(null);
  const bubbleDescRef = useRef(null);
  const selectionDescRef = useRef(null);

  const bubbleSteps = useMemo(() => bubbleSortSteps(baseArray), [baseArray]);
  const selectionSteps = useMemo(() => selectionSortSteps(baseArray), [baseArray]);

  const bubbleCurrent = bubbleSteps[Math.min(stepIndex, bubbleSteps.length - 1)];
  const selectionCurrent = selectionSteps[Math.min(stepIndex, selectionSteps.length - 1)];

  const bubbleVisibleDescriptions = bubbleSteps
    .slice(0, Math.min(stepIndex + 1, bubbleSteps.length))
    .map((s) => s.description);

  const selectionVisibleDescriptions = selectionSteps
    .slice(0, Math.min(stepIndex + 1, selectionSteps.length))
    .map((s) => s.description);

  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const maxIndex = Math.max(bubbleSteps.length, selectionSteps.length) - 1;
        if (prev >= maxIndex) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, bubbleSteps.length, selectionSteps.length]);

  useEffect(() => {
    if (bubbleDescRef.current) {
      bubbleDescRef.current.scrollTop = bubbleDescRef.current.scrollHeight;
    }
    if (selectionDescRef.current) {
      selectionDescRef.current.scrollTop = selectionDescRef.current.scrollHeight;
    }
  }, [stepIndex]);

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
    const maxIndex = Math.max(bubbleSteps.length, selectionSteps.length) - 1;
    setStepIndex((prev) => Math.min(prev + 1, maxIndex));
    setIsPlaying(false);
  };

  const bubbleComparisons = bubbleSteps
    .slice(0, Math.min(stepIndex + 1, bubbleSteps.length))
    .filter((s) => s.activeLine === 3).length;

  const bubbleSwaps = bubbleSteps
    .slice(0, Math.min(stepIndex + 1, bubbleSteps.length))
    .filter((s) => s.activeLine === 6).length;

  const selectionComparisons = selectionSteps
    .slice(0, Math.min(stepIndex + 1, selectionSteps.length))
    .filter((s) => s.activeLine === 4).length;

  const selectionSwaps = selectionSteps
    .slice(0, Math.min(stepIndex + 1, selectionSteps.length))
    .filter((s) => s.activeLine === 9).length;

  return (
    <div className="h-screen overflow-y-auto bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Confronto tra algoritmi di ordinamento</h1>
            <p className="text-slate-600 mt-2">
              Stesso vettore, strategie diverse: Bubble Sort sposta gradualmente i valori,
              Selection Sort sceglie ogni volta il minimo e lo posiziona.
            </p>
          </div>

          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna alla home
          </Button>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
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
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
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
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <SortPanel
            title="Bubble Sort"
            currentStep={bubbleCurrent}
            visibleDescriptions={bubbleVisibleDescriptions}
            descRef={bubbleDescRef}
            type="bubble"
            stats={[
              `Confronti: ${bubbleComparisons}`,
              `Scambi: ${bubbleSwaps}`,
            ]}
          />

          <SortPanel
            title="Selection Sort"
            currentStep={selectionCurrent}
            visibleDescriptions={selectionVisibleDescriptions}
            descRef={selectionDescRef}
            type="selection"
            stats={[
              `Confronti: ${selectionComparisons}`,
              `Scambi: ${selectionSwaps}`,
            ]}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}