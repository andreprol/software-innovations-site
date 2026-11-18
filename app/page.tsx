import { appName } from "@/lib/env";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold">{appName}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Site em construção.
      </p>
    </div>
  );
}
