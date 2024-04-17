import { Sticker } from "@/types/sticker.type"
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image"

export function StickerSlot({ stickers, currentSticker, updateSticker }: { stickers: Sticker[], currentSticker?: Sticker, updateSticker: (sticker?: Sticker) => void }) {
  const searchTimeout = useRef<NodeJS.Timeout>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if(searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      setCurrentSearch(e.target.value);
    }, 300);
  }

  return (
    <div className="w-full flex flex-row">
      <div className="relative w-[96px] h-[96px] rounded-lg bg-zinc-950 flex justify-center items-center">
        {
          currentSticker && (
            <>
              <Image 
                src={currentSticker.image}
                alt={currentSticker.name}
                title={currentSticker.name}
                width={80}
                height={80}
                className="w-20 h-20 object-contain anim-scale-in select-none"
              />
              <div className="absolute top-0 right-2 p-0.5" onClick={() => updateSticker()}>
                <span className="select-none text-gray-150">x</span>
              </div>
            </>
          )
        }
      </div>
      <div className="w-[272px] flex flex-col space-y-1 pl-2">
        <span className="text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 text-transparent">{currentSticker ? currentSticker.name : "Sticker Name"}</span>
        <input 
          type="text"
          value={searchValue}
          onChange={handleSearch}
          className="relative w-full text-sm bg-transparent px-2 py-1 rounded-lg border border-zinc-800 outline-none" placeholder={`Titan (Holo) | Katowice 2014`}
        />
        <div className="w-full flex flex-row overflow-y-hidden overflow-x-auto scrollbar-x">
          {
            currentSearch.length > 3 && stickers
              .filter(st => 
                st.name
                  .toLowerCase()
                  .replaceAll("| ", "")
                  .replaceAll("(", "")
                  .replaceAll(")", "")
                  .includes(
                    currentSearch
                      .toLowerCase()
                      .replaceAll("| ", "")
                      .replaceAll("(", "")
                      .replaceAll(")", "")
                  )
              )
              .map(sticker => (
                <Image
                  key={sticker.id}
                  src={sticker.image}
                  alt={sticker.name}
                  title={sticker.name}
                  onClick={() => updateSticker(sticker)}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain sm:hover:scale-110 select-none"
                />
              ))
          }
        </div>
      </div>
    </div>
  )
}