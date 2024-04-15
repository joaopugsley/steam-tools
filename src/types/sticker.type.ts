export type Sticker = {
  id: string,
  name: string,
  description: string,
  rarity: {
    id: string,
    name: string,
    color: string,
  },
  crates: [
    {
      id: string,
      name: string,
      image: string,
    }
  ],
  image: string,
};