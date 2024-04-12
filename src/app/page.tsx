'use client';

import { Grid } from "@/components/grid";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8">
      <h1 className="text-6xl z-10 bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Steam Tools</h1>
      <span className="text-lg md:text-4xl z-10">Doing the job Valve&trade; <a className="bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">should</a> do</span>
      <Grid/>
    </section>
  );
}
