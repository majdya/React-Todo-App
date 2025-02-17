"use client";

import TodoList from "./components/views/TodoList";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="h-500 pt-5 bg-gradient-to-tr from-zinc-200 via-indigo-500 to-slate-500">
          <TodoList />
        </div>
      </QueryClientProvider>
    </>
  );
};

export default App;
