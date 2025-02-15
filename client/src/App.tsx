"use client";

import TodoList from "./components/views/TodoList";

import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TodoList></TodoList>
      </QueryClientProvider>
    </>
  );
};

export default App;
