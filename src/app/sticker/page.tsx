'use client';

import { Fragment, useEffect, useMemo, useState } from "react";
import { Grid } from "@/components/grid";
import { StickerSlot } from "@/components/sticker-slot";
import { Sticker } from "@/types/sticker.type"
import { Weapon } from "@/types/weapon.type";

export default function StickerSearch() {

  // data
  const [stickerData, setStickerData] = useState<Sticker[]>([]);
  const [weaponData, setWeaponData] = useState<Weapon[]>([]);

  useEffect(() => {
    const fetchStickerData = async () => {
      // https://cs-sticker.com/stickers.json
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

  // filters
  const [weaponFilter, setWeaponFilter] = useState<string>("any");
  const [wearFilter, setWearFilter] = useState<string>("any");
  const [categoryFilter, setCategoryFilter] = useState<string>("any");
  const [ignoreStickerOrder, setIgnoreStickerOrder] = useState<boolean>(false);

  // current stickers
  const [currentStickers, setCurrentStickers] = useState<Record<number, Sticker | undefined>>([]);

  const updateSticker = (slot: number, sticker?: Sticker) => {
    setCurrentStickers(prev => ({
      ...prev,
      [slot]: sticker
    }))
  }

  const buildSearchLink = () => {
    const encodedStickers = Object.entries(currentStickers)
      .filter(([_, sticker]) => sticker !== undefined)
      .map(([_, sticker]) => sticker && encodeURI(sticker.name))
      .join(ignoreStickerOrder ? `"+"` : `,`);
    
    let searchLink = `https://steamcommunity.com/market/search?`;

    // stickers
    if (encodedStickers !== "") {
      searchLink += `q="${encodedStickers}"&`;
    }

    // necessary query parameters
    searchLink += "descriptions=1&category_730_ItemSet%5B%5D=any";

    // weapon filter
    searchLink += `&category_730_Weapon%5B%5D=${weaponFilter}`;

    // wear filter
    if (wearFilter !== "any") {
      searchLink += `&category_730_Exterior%5B%5D=${wearFilter}`;
    }

    // category filter
    if (categoryFilter !== "any") {
      searchLink += `&category_730_Quality%5B%5D=${categoryFilter}`;
    }

    return searchLink;
  };

  const handleButtonClick = () => {
    const searchLink = buildSearchLink();
    window.open(searchLink, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-8">
      <div className="w-96 h-fit bg-zinc-900 border border-zinc-800 rounded-lg z-10 drop-shadow-sm p-4 flex flex-col space-y-2">
        <h1>Sticker Search</h1>
        <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Weapon</h2>
        <select 
          name="weapon" 
          className="w-full bg-transparent px-2 py-2 rounded-md border border-zinc-800 outline-none"
          value={weaponFilter}
          onChange={(e) => setWeaponFilter(e.target.value)}
        >
          <option value="any" className="bg-zinc-900 text-white text-sm">Any Weapon</option>
          <option className="bg-zinc-900 text-white" disabled>--- Rifles</option>
          {
            weaponData.map((weapon, i) => (
              <Fragment key={weapon.name}>
                {
                  i > 0 && weaponData[i - 1].class !== weapon.class && (
                    <option className="bg-zinc-900 text-white" disabled>
                      --- {weapon.class}
                    </option>
                  )
                }
                <option
                  value={weapon.id}
                  className="bg-zinc-900 text-white text-sm"
                >
                  {weapon.name}
                </option>
              </Fragment>
            ))
          }
        </select>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1.5">
          <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Wear</h2>
          <h2 className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">Category</h2>
          <select 
            name="Wear"
            className="w-full bg-transparent px-2 py-2 rounded-md border border-zinc-800 outline-none"
            value={wearFilter}
            onChange={(e) => setWearFilter(e.target.value)}
          >
            <option value="any" className="bg-zinc-900 text-white text-sm">Any Wear</option>
            <option value="tag_WearCategory0" className="bg-zinc-900 text-white text-sm">Factory New</option>
            <option value="tag_WearCategory1" className="bg-zinc-900 text-white text-sm">Minimal Wear</option>
            <option value="tag_WearCategory2" className="bg-zinc-900 text-white text-sm">Field Tested</option>
            <option value="tag_WearCategory3" className="bg-zinc-900 text-white text-sm">Well Worn</option>
            <option value="tag_WearCategory4" className="bg-zinc-900 text-white text-sm">Battle Scarred</option>
          </select>
          <select 
            name="Category"
            className="w-full bg-transparent px-2 py-2 rounded-md border border-zinc-800 outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="any" className="bg-zinc-900 text-white text-sm">Any Category</option>
            <option value="tag_normal" className="bg-zinc-900 text-white text-sm">Normal</option>
            <option value="tag_strange" className="bg-zinc-900 text-white text-sm">StatTrak™</option>
            <option value="tag_tournament" className="bg-zinc-900 text-white text-sm">Souvenir</option>
          </select>
        </div>
        <div className="w-full flex flex-col space-y-4">
          {
            [0, 1, 2, 3, 4].map(slot => (
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
        <button onClick={() => handleButtonClick()} className="w-full bg-zinc-800 hover:bg-zinc-700 transition-all px-4 py-2 rounded-md border border-zinc-800 select-none">SEARCH</button>
      </div>
      <Grid/>
    </section>
  );
}