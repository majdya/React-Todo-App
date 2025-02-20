import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4 bg-gray-100 rounded-xl shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Todo app developed by <span className="text-blue-600">Majd Yaqub</span>
      </h3>
      <p className="text-gray-600">Using:</p>
      <ul className="list-disc list-inside text-gray-700 mt-1">
        <li>
          <span className="font-medium">Vite</span>
        </li>
        <li>
          <span className="font-medium">pnpm</span>
        </li>
        <li>
          <span className="font-medium">TypeScript</span>
        </li>
        <li>
          <span className="font-medium">React</span>
        </li>
        <li>
          <span className="font-medium">Tailwind</span>
        </li>
        <li>
          <span className="font-medium">Shad/cn</span>
        </li>

        <li>
          <span className="font-medium">TanStack</span>
        </li>
        <li>
          <span className="font-medium">Supabase</span>
        </li>
      </ul>
    </div>
  );
}
