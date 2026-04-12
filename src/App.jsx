import { useState } from "react";
import HomePage from "./pages/HomePage";
import NaiveSortPage from "./pages/NaiveSortPage";
import PlaceholderPage from "./pages/PlaceholderPage";

export default function App() {
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