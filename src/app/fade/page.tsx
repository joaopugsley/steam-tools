'use client';

import { Grid } from "@/components/grid";
import { Fade, FadeData } from "@/types/fade.type";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FadeChecker() {

  const [fadeData, setFadeData] = useState<Fade>([]);

  useEffect(() => {
    const fetchFadeData = async () => {
      const response = await fetch('/data/fade.json');
      const data: Fade = await response.json();
      setFadeData(data);
    };
    fetchFadeData();
  }, []);

  const [currentFadeData, setCurrentFadeData] = useState<FadeData>();
  const [weaponInput, setWeaponInput] = useState<string>("Bayonet");
  const [fadeInput, setFadeInput] = useState<string>("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9,.]/g, '');
    setFadeInput(numericValue);
  };

  useEffect(() => {
    if(!fadeData || !fadeInput) return;

    const allWeaponFades = fadeData.find(fade => fade.weapon === weaponInput);
    if (!allWeaponFades) return;

    const weaponFade = allWeaponFades.data.find(fade => fade.pattern === Number(fadeInput));
    if (!weaponFade) return;

    setCurrentFadeData(weaponFade);
  }, [fadeData, fadeInput, weaponInput])

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-96 h-fit bg-zinc-900 border border-zinc-800 rounded-lg z-10 drop-shadow-sm p-4 flex flex-col space-y-2">
        <h1>Fade Checker</h1>
        <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Weapon</h2>
        <select 
          name="Weapon"
          className="w-full bg-transparent px-2 py-2 rounded-md border border-zinc-800 outline-none"
          value={weaponInput}
          onChange={(e) => setWeaponInput(e.target.value)}
        >
          {[
            "Bayonet", "Bowie Knife", "Butterfly Knife", "Classic Knife", "Falchion Knife", "Flip Knife", "Gut Knife", 
            "Huntsman Knife", "Karambit", "Kukri Knife", "M9 Bayonet", "Navaja Knife", "Nomad Knife", "Paracord Knife", 
            "Shadow Daggers", "Skeleton Knife", "Stiletto Knife", "Survival Knife", "Talon Knife", "Ursus Knife",
            "AWP", "Glock-18", "MAC-10", "MP7", "R8 Revolver", "UMP-45"
          ].map((weapon, index) => (
            <option key={index} value={weapon} className="bg-zinc-900 text-white text-sm">{weapon}</option>
          ))}
        </select>
        <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Weapon Pattern</h2>
        <input 
          type="text"
          maxLength={3}
          value={fadeInput}
          onChange={handleInput}
          className="w-full bg-transparent px-3 py-2 rounded-md border border-zinc-800 outline-none" placeholder={weaponInput ? `${weaponInput} pattern` : "125"}
        />
        {
          fadeInput && currentFadeData && (
            <div className="w-full bg-gradient-to-r px-3 py-2 rounded-md border border-zinc-800 from-blue-600 select-all">{Number(currentFadeData.fade).toFixed(2)}%</div>
          )
        }
      </div>
      <Grid/>
    </section>
  );
}