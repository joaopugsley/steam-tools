export type Fade = WeaponFades[]

type WeaponFades = {
  weapon: string
  data: FadeData[]
}

export type FadeData = {
  pattern: number
  fade: number
  ranking: number
}