import Link from "next/link";

interface ToolProps {
  name: string;
  description: string;
  href: string;
}

export function Tool({ name, description, href }: ToolProps) {
  return (
    <Link href={href} className="relative w-96 h-48 bg-zinc-900 rounded-lg border border-zinc-800 group overflow-hidden z-10">
      <div className="absolute left-0 top-0 w-full h-full bg-[radial-gradient(at_0%_100%,rgb(39,39,42),rgb(24,24,27))] opacity-0 group-hover:opacity-100 transition-all duration-300 z-[9]"></div>
      <div className="absolute left-0 top-0 w-full h-full p-4 z-10 flex flex-col">
        <h3 className="text-base z-[11]">{name}</h3>
        <span className="text-gray-300 z-[11]">{description}</span>
        <button
          className="mt-auto ml-auto bg-zinc-800 hover:bg-zinc-700 transition-all px-4 py-1 rounded-md border border-zinc-800 select-none flex flex-row justify-center items-center space-x-4"
        >
          View
        </button>
      </div>
    </Link>
  )
}