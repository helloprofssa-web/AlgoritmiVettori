import { useState } from "react";
import HomePage from "./pages/HomePage";
import NaiveSortPage from "./pages/NaiveSortPage";
import BubbleSortPage from "./pages/BubbleSortPage";
import BubbleSortWhilePage from "./pages/BubbleSortWhilePage";
import BinarySearchPage from "./pages/BinarySearchPage";
import BinarySearchRecursivePage from "./pages/BinarySearchRecursivePage";
import LinearSearchWhilePage from "./pages/LinearSearchWhilePage";
import LinearSearchForPage from "./pages/LinearSearchForPage";
import OrderedLinearSearchPage from "./pages/OrderedLinearSearchPage";
import SelectionSortPage from "./pages/SelectionSortPage";
import InsertionSortPage from "./pages/InsertionSortPage";
import CompareSortPage from "./pages/CompareSortPage";

export default function App() {
  const [page, setPage] = useState("home");

  if (page === "ricerca-lineare-while") {
    return <LinearSearchWhilePage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-lineare-for") {
    return <LinearSearchForPage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-ordinata-semplice") {
    return <OrderedLinearSearchPage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-binaria") {
    return <BinarySearchPage onBack={() => setPage("home")} />;
  }

  if (page === "ricerca-binaria-ricorsiva") {
    return <BinarySearchRecursivePage onBack={() => setPage("home")} />;
  }

  if (page === "ordinamento-ingenuo") {
    return <NaiveSortPage onBack={() => setPage("home")} />;
  }

  if (page === "bubble-sort") {
    return <BubbleSortPage onBack={() => setPage("home")} />;
  }

  if (page === "bubble-sort-while") {
    return <BubbleSortWhilePage onBack={() => setPage("home")} />;
  }

  if (page === "selection-sort") {
    return <SelectionSortPage onBack={() => setPage("home")} />;
  }

  if (page === "insertion-sort") {
    return <InsertionSortPage onBack={() => setPage("home")} />;
  }

  if (page === "confronto-ordinamenti") {
    return <CompareSortPage onBack={() => setPage("home")} />;
  }

  return <HomePage onNavigate={setPage} />;
}