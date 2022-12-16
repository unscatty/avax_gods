import { type AVAXGods } from '~/contract/types'

export type PlayerData = {
  instance: AVAXGods.PlayerStructOutput
  attack: number
  defense: number
  health: number
  mana: number
}
