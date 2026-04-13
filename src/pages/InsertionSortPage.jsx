import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Pause, RotateCcw, SkipForward, ArrowUpDown, ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button, Input, Badge } from "../components/ui";
import CodeSidebar from "../components/CodeSidebar";
import Footer from "../components/Footer";
import { parseVector } from "../algorithms/parseVector";
import {
  cppLinesInsertionSort,
  insertionSortSteps,
} from "../algorithms/insertionSort";

export default function InsertionSortPage({ onBack }) {
  const [inputText, setInputText] = useState("7, 3, 9, 2, 5");
  const [baseArray, setBaseArray] = useState([7, 3, 9, 2, 5]);
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const timerRef = useRef(null);
  const descRef = useRef(null);

  const steps = useMemo(() => insertionSortSteps(baseArray), [baseArray]);
  const currentStep = steps[Math.min(stepIndex, steps.length - 1)];
  const visibleDescriptions = steps.slice(0, stepIndex + 1).map((s) => s.description);

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

  const startSimulation = () => {
    const parsed = parseVector(inputText);

    if (parsed.length > 0) {
      const sameArray =
        parsed.length === baseArray.length &&
        parsed.every((v, i) => v === baseArray[i]);

      setBaseArray(parsed);
      setStepIndex(0);

      if (sameArray) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
        setTimeout(() => setIsPlaying(true), 0);
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

  const shiftsCount = steps
    .slice(0, stepIndex + 1)
    .filter((s) => s.activeLine === 5).length;

  return (
    <div className="h-screen flex">
      {/* SIDEBAR CODICE */}
      <div className="w-[360px] border-r border-slate-200">
        <CodeSidebar lines={cppLinesInsertionSort} activeLine={currentStep.activeLine} />
      </div>

      {/* CONTENUTO */}
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* TITOLO */}
          <div className="flex items-center justify-between gap-4">
                       <div className="flex items-center gap-2">
  <ArrowUpDown className="h-7 w-7" />
  <h1 className="text-3xl font-bold">Insertion Sort</h1>
</div>

            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Torna alla home
            </Button>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {/* SIMULAZIONE */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Simulazione
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* INPUT */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Vettore
                  </label>
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>

                {/* CONTROLLI */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      if (isPlaying) setIsPlaying(false);
                      else startSimulation();
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

                {/* VELOCITÀ */}
                <input
                  type="range"
                  min="300"
                  max="1600"
                  step="100"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />

                {/* VETTORE */}
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

                {/* VARIABILI */}
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="p-3 border rounded bg-purple-50">
                    <div className="text-xs text-purple-700">i</div>
                    <div className="text-xl font-bold">
                      {currentStep.i ?? "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded bg-pink-50">
                    <div className="text-xs text-pink-700">j</div>
                    <div className="text-xl font-bold">
                      {currentStep.j ?? "-"}
                    </div>
                  </div>

                  <div className="p-3 border rounded bg-blue-50">
                    <div className="text-xs text-blue-700">key</div>
                    <div className="text-xl font-bold">
                      {currentStep.key ?? "-"}
                    </div>
                  </div>
                </div>

                {/* DESCRIZIONE */}
                <div
                  ref={descRef}
                  className="border rounded p-3 bg-white max-h-56 overflow-y-auto"
                >
                  {visibleDescriptions.map((d, i) => (
                    <div key={i} className={i === stepIndex ? "bg-amber-100" : ""}>
                      {i + 1}. {d}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* STATISTICHE */}
            <Card>
              <CardHeader>
                <CardTitle>Statistiche</CardTitle>
              </CardHeader>

              <CardContent>
                <Badge>Spostamenti: {shiftsCount}</Badge>
              </CardContent>
            </Card>
          </div>

          <Footer />
        </div>
      </div>
    </div>
  );
}