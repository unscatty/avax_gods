import { acceptHMRUpdate, defineStore } from 'pinia'

export type BattlegroundChoice = {
  id: string
  image: string
  name: string
}

export const useBattlegroundStore = defineStore('battleground', () => {
  const baseURL = import.meta.env.BASE_URL
  
  const availableBattlegrounds = markRaw<BattlegroundChoice[]>([
    {
      id: 'bg-saiman',
      image: `${baseURL}resources/background/saiman.jpg`,
      name: 'Saiman',
    },
    {
      id: 'bg-astral',
      image: `${baseURL}resources/background/astral.jpg`,
      name: 'Astral',
    },
    {
      id: 'bg-eoaalien',
      image: `${baseURL}resources/background/eoaalien.jpg`,
      name: 'Eoaalien',
    },
    {
      id: 'bg-panight',
      image: `${baseURL}resources/background/panight.jpg`,
      name: 'Panight',
    },
  ])

  const selectedBattleground = useStorage<BattlegroundChoice>(
    'battleground',
    availableBattlegrounds[0]
  )

  return {
    availableBattlegrounds,
    battleground: selectedBattleground,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useBattlegroundStore, import.meta.hot))
