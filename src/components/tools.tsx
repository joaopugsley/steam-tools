import { Tool } from "./tool";

export function Tools() {
  return (
    <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 md:gap-3 min-h-96 z-10">
      <Tool name="Price Generator" description="Choose exactly how much you want to deposit on steam." href="price"/>
    </div>
  )
}