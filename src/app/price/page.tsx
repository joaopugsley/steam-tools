'use client';

import { Grid } from "@/components/grid";
import { useState } from "react";

export default function Price() {
  const [inputVal, setInputVal] = useState<string>('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9,.]/g, '');
    setInputVal(`R$${numericValue}`);
  };

  const createPriceLink = (value: Number) => {
    return `https://store.steampowered.com/steamaccount/addfunds?marketlisting=1&minneeded=${value}&returnurl=https://steamcommunity.com/market/`;
  };

  const handleButtonClick = () => {
    const currentValue = inputVal.replace(/[^0-9,.]/g, '').replaceAll(",", ".");
    const val = Math.round(Number(currentValue) * 100);
    const priceLink = createPriceLink(val);
    window.open(priceLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-96 h-fit bg-zinc-900 border border-zinc-800 rounded-lg z-10 drop-shadow-sm p-4 flex flex-col space-y-2">
        <h1>Price Generator</h1>
        <input 
          type="text"
          value={inputVal}
          onChange={handleInput}
          maxLength={8}
          className="w-full bg-transparent px-3 py-2 rounded-md border border-zinc-800 outline-none" placeholder={`R$50,00`}
        />
        <button onClick={() => handleButtonClick()} className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all px-4 py-2 rounded-md border border-zinc-800 select-none">GENERATE</button>
        <span className="text-sm">*Minimum Steam fund deposit is R$10.00</span>
      </div>
      <Grid/>
    </section>
  );
}