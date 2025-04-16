import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "ghost";
  size?: "sm" | "md" | "lg"; // ✅ Added size prop
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, variant = "default", size = "md", ...props }, ref) => {
    const baseClasses = "rounded-md transition font-medium";

    const sizeClasses = {
      sm: "px-2 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const variantClasses = {
      default: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400",
      destructive: "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400",
      outline: "border border-gray-500 text-gray-300 hover:bg-gray-800",
      ghost: "bg-transparent text-gray-300 hover:bg-gray-800",
    };

    return (
      <button
        ref={ref}
        className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
