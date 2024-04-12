import Image from "next/legacy/image";

export function Grid() {
  return (
    <div id="grid" className="absolute top-0 left-0 w-screen h-screen z-0 select-none">
      <Image
        src="/img/graphic/grid.svg"
        alt="grid"
        layout="fill"
        className="relative opacity-5 object-cover"
      />
      <div className="absolute w-full h-full bg-[radial-gradient(circle,rgba(19,19,22,0.0)_35%,rgba(19,19,22,1)_80%)]"></div>
    </div>
  )
}