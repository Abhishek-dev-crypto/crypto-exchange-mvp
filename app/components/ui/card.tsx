import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("rounded-lg border bg-white shadow-sm", className)} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4 border-b", className)} {...props} />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <h3 className={cn("text-lg font-semibold", className)} {...props} />
);
CardTitle.displayName = "CardTitle";

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-4", className)} {...props} />
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };
