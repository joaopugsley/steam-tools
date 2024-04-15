'use client';

import { Fragment, useEffect, useMemo, useState } from "react";
import { Grid } from "@/components/grid";
import { StickerSlot } from "@/components/sticker-slot";
import { Sticker } from "@/types/sticker.type"
import { Weapon } from "@/types/weapon.type";

export default function StickerSearch() {

  const [stickerData, setStickerData] = useState<Sticker[]>([]);
  const [weaponData, setWeaponData] = useState<Weapon[]>([]);

  useEffect(() => {
    const fetchStickerData = async () => {
      const response = await fetch('/data/stickers.json');
      const data = await response.json();
      setStickerData(data);
    };
    const fetchWeaponData = async () => {
      const response = await fetch('/data/weapons.json');
      const data = await response.json();
      setWeaponData(data);
    }
    Promise.all([fetchStickerData(), fetchWeaponData()]);
  }, []);

  const filteredStickers = useMemo(() => {
    return stickerData.map(sticker => ({ ...sticker, name: sticker.name.replace("Sticker | ", "")}));
  }, [stickerData]);

  const [currentWeapon, setCurrentWeapon] = useState<string>("Any Weapon");
  const [ignoreStickerOrder, setIgnoreStickerOrder] = useState<boolean>(false);

  const [currentStickers, setCurrentStickers] = useState<Record<number, Sticker | undefined>>([]);

  const updateSticker = (slot: number, sticker?: Sticker) => {
    setCurrentStickers(prev => ({
      ...prev,
      [slot]: sticker
    }))
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-96 h-fit bg-zinc-900 border border-zinc-800 rounded-lg z-10 drop-shadow-sm p-4 flex flex-col space-y-2">
        <h1>Sticker Search</h1>
        <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Weapon</h2>
        <select 
          name="weapon" 
          className="w-full bg-transparent px-2 py-2 rounded-md border border-zinc-800 outline-none"
          value={currentWeapon}
          onChange={(e) => setCurrentWeapon(e.target.value)}
        >
          <option value="Any Weapon" className="bg-zinc-900 text-white text-sm">Any Weapon</option>
          <option className="bg-zinc-900 text-white" disabled>---</option>
          {
            weaponData.map((weapon, i) => (
              <Fragment key={weapon.name}>
                {
                  i > 0 && weaponData[i - 1].class !== weapon.class && (
                    <option className="bg-zinc-900 text-white" disabled>
                      ---
                    </option>
                  )
                }
                <option
                  value={weapon.name}
                  className="bg-zinc-900 text-white text-sm"
                >
                  {weapon.name}
                </option>
              </Fragment>
            ))
          }
        </select>
        <div className="w-full flex flex-col space-y-4">
          {
            [0, 1, 2, 3].map(slot => (
              <StickerSlot
                key={slot} 
                stickers={filteredStickers} 
                currentSticker={currentStickers[slot]} 
                updateSticker={(sticker) => updateSticker(slot, sticker)}
              />
            ))
          }
        </div>
        <label className="flex flex-row items-center space-x-2">
          <input type="checkbox" className="size-3" checked={ignoreStickerOrder} onChange={() => setIgnoreStickerOrder((prev) => !prev)}/>
          <span className="select-none">Ignore sticker order</span>
        </label>
        <button className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all px-4 py-2 rounded-md border border-zinc-800 select-none">SEARCH</button>
      </div>
      <Grid/>
    </section>
  );
}