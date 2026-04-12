import { useState } from "react";
import HomePage from "./pages/HomePage";
import NaiveSortPage from "./pages/NaiveSortPage";
import BubbleSortPage from "./pages/BubbleSortPage";
import BubbleSortWhilePage from "./pages/BubbleSortWhilePage";
import BinarySearchPage from "./pages/BinarySearchPage";
import BinarySearchRecursivePage from "./pages/BinarySearchRecursivePage";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "ordinamento-ingenuo") {
    return <NaiveSortPage onBack={() => setPage("home")} />;
  }

  if (page === "bubble-sort") {
    return <BubbleSortPage onBack={() => setPage("home")} />;
  }

  if (page === "bubble-sort-while") {
    return <BubbleSortWhilePage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-binaria") {
    return <BinarySearchPage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-binaria-ricorsiva") {
    return <BinarySearchRecursivePage onBack={() => setPage("home")} />;
  }

  return <HomePage onNavigate={setPage} />;
}