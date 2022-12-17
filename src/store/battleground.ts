import { acceptHMRUpdate, defineStore } from 'pinia'

export type BattlegroundChoice = {
  id: string
  image: string
  name: string
}

export const useBattlegroundStore = defineStore('battleground', () => {
  const availableBattlegrounds = markRaw<BattlegroundChoice[]>([
    {
      id: 'bg-saiman',
      image: '/resources/background/saiman.jpg',
      name: 'Saiman',
    },
    {
      id: 'bg-astral',
      image: '/resources/background/astral.jpg',
      name: 'Astral',
    },
    {
      id: 'bg-eoaalien',
      image: '/resources/background/eoaalien.jpg',
      name: 'Eoaalien',
    },
    {
      id: 'bg-panight',
      image: '/resources/background/panight.jpg',
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
