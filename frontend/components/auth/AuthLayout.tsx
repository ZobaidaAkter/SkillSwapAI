type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
};

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-white">
            {title}
          </h1>

          <p className="mt-2 text-gray-400">
            {subtitle}
          </p>

        </div>

        {children}

      </div>
    </main>
  );
}