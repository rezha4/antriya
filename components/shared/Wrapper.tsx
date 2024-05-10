import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
      {children}
    </div>
  );
};
