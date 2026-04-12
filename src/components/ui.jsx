export function Card({ className = "", children }) {
  return <div className={`rounded-3xl shadow-sm border bg-white ${className}`}>{children}</div>;
}

export function CardHeader({ className = "", children }) {
  return <div className={`p-6 pb-3 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ className = "", children }) {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
}

export function Button({ className = "", variant = "default", children, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
    secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",
  };

  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400 ${className}`}
      {...props}
    />
  );
}

export function Badge({ className = "", children }) {
  return (
    <span className={`inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-800 ${className}`}>
      {children}
    </span>
  );
}