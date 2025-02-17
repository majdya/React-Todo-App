"use client";

import TodoList from "./components/views/TodoList";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-lvh pt-5 bg-gradient-to-tr from-zinc-200 via-indigo-500 to-slate-500 sticky top-0 z-10">
          <TodoList />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
