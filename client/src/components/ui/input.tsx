import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `px-3 py-2 
           font-semibold placeholder-gray-500
           border-none rounded-2xl ring-2 ring-indigo-300
           focus:ring-3 focus:ring-indigo-400  outline-0`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
