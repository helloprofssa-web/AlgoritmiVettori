import { Search, Home, ArrowUpDown, Binary } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "../components/ui";
import Footer from "../components/Footer";

export default function HomePage({ onNavigate }) {
  const sequentialSearchItems = [
    {
      key: "ricerca-lineare-while",
      title: "Ricerca su vettore non ordinato con while",
      description:
        "Ricerca sequenziale su vettore non ordinato: appena trovo la prima occorrenza esco dal ciclo.",
      icon: Search,
    },
    {
      key: "ricerca-lineare-for",
      title: "Ricerca su vettore non ordinato con for",
      description:
        "Ricerca sequenziale su vettore non ordinato realizzata con ciclo for.",
      icon: Search,
    },
    {
      key: "ricerca-ordinata-semplice",
      title: "Ricerca semplice su vettore ordinato",
      description:
        "Controllo preliminare sull'ultimo elemento del vettore ordinato, poi ricerca sequenziale.",
      icon: Search,
    },
  ];

  const binarySearchItems = [
    {
      key: "ricerca-binaria",
      title: "Ricerca binaria",
      description:
        "Esplora la ricerca binaria su un vettore ordinato, osservando metà sinistra, metà destra e posizione centrale.",
      icon: Search,
    },
    {
      key: "ricerca-binaria-ricorsiva",
      title: "Ricerca binaria ricorsiva",
      description:
        "Versione ricorsiva della ricerca binaria, utile per mostrare chiamate, casi base e riduzione del problema.",
      icon: Binary,
    },
  ];

  const naiveSortItem = {
    key: "ordinamento-ingenuo",
    title: "Ordinamento ingenuo",
    description:
      "Visualizza confronto, scambio, variabili i, j, temp e andamento dell'algoritmo passo passo.",
    icon: ArrowUpDown,
  };

  const bubbleSortItems = [
    {
      key: "bubble-sort",
      title: "Bubble sort classico",
      description:
        "Versione classica con due cicli for, utile per mostrare i confronti e gli scambi tra elementi adiacenti.",
      icon: ArrowUpDown,
    },
    {
      key: "bubble-sort-while",
      title: "Bubble sort con while",
      description:
        "Versione ottimizzata con while, variabile continua, limite k e valore sup per interrompere prima l'algoritmo.",
      icon: ArrowUpDown,
    },
  ];

  const advancedSortItems = [
    {
      key: "selection-sort",
      title: "Selection Sort",
      description:
        "Trova ogni volta il minimo nella parte non ordinata e lo porta nella posizione corretta.",
      icon: ArrowUpDown,
    },
    {
      key: "insertion-sort",
      title: "Insertion Sort",
      description:
        "Inserisce ogni elemento nella posizione corretta all'interno della parte già ordinata del vettore.",
      icon: ArrowUpDown,
    },
  ];

  const renderCard = (item) => {
    const Icon = item.icon;

    return (
      <Card
        key={item.key}
        className="rounded-3xl shadow-sm border hover:shadow-md transition-shadow"
      >
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
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-3xl bg-white p-8 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <Home className="h-8 w-8 text-slate-700" />
            <h1 className="text-4xl font-bold tracking-tight">Algoritmi su vettori</h1>
          </div>

          <p className="text-lg text-slate-600 max-w-4xl leading-7">
            Benvenuti in questa raccolta di simulazioni interattive. In queste pagine puoi osservare
            il funzionamento di alcuni algoritmi classici studiati in C++, seguendo passo passo il
            codice, le variabili e l'evoluzione del vettore.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">
              Ricerche sequenziali
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {sequentialSearchItems.map(renderCard)}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">
              Ricerca binaria
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {binarySearchItems.map(renderCard)}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">
              Ordinamento ingenuo
            </h2>
            <div className="grid gap-6 md:grid-cols-1">
              {renderCard(naiveSortItem)}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">
              Bubble sort
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {bubbleSortItems.map(renderCard)}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-semibold text-slate-800">
              Ordinamenti avanzati
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {advancedSortItems.map(renderCard)}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}