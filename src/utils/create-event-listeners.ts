import { Provider } from '@ethersproject/providers'
import { ethers, EventFilter } from 'ethers'
import { LogDescription } from 'ethers/lib/utils'
import { Router } from 'vue-router'
// import { AVAXGodsInterface } from '~/contract/types/AVAXGods'
import { ABI } from '~/contract'
import { type AVAXGods } from '~/contract/types'
import { playAudio, sparcle } from './animation'

const defenseSound = '/resources/sounds/defense.mp3'

const addNewEvent = (
  eventFilter: EventFilter,
  provider: Provider,
  cb: (logs: LogDescription) => void
) => {
  provider.off(eventFilter)

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs)

    cb(parsedLog)
  })
}

const getCoordinates = (element?: HTMLElement) => {
  if (!element) {
    return {
      pageX: 0,
      pageY: 0,
    }
  }

  const { left, top, width, height } = element.getBoundingClientRect()

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  }
}

export const createEventListeners = ({
  router,
  contract,
  provider,
  currentAccountAddress,
  setAlertInfo,
  player1Ref,
  player2Ref,
  setUpdateGameData,
  updatePlayerInfo,
}: {
  router: Router
  contract: AVAXGods
  provider: Provider
  currentAccountAddress: string
  setAlertInfo: ReturnType<typeof useAlertInfoStore>['setAlertInfo']
  player1Ref?: HTMLElement
  player2Ref?: HTMLElement
  setUpdateGameData: ReturnType<typeof useBattleStore>['setUpdateGameData']
  updatePlayerInfo: ReturnType<typeof useWeb3Store>['updatePlayerInfo']
}) => {
  if (contract) {
    const newPlayerEventFilter = contract.filters.NewPlayer()
    addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
      console.log('New player created!', args)

      updatePlayerInfo()

      if (currentAccountAddress === args.owner) {
        setAlertInfo({
          type: 'success',
          message: 'Player has been successfully registered',
        })
      }
    })

    const newBattleEventFilter = contract.filters.NewBattle()
    addNewEvent(newBattleEventFilter, provider, ({ args }) => {
      console.log('New battle started!', args, currentAccountAddress)

      const player1 = args.player1 as string
      const player2 = args.player2 as string

      if (
        currentAccountAddress.toLowerCase() === player1.toLowerCase() ||
        currentAccountAddress.toLowerCase() === player2.toLowerCase()
      ) {
        setAlertInfo({
          type: 'info',
          message: `Battle "${args.battleName}" has started!`,
        })

        router.push(`/battle/${args.battleName}`)
      }

      setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1)
    })

    const newGameTokenEventFilter = contract.filters.NewGameToken()
    addNewEvent(newGameTokenEventFilter, provider, ({ args }) => {
      console.log('New game token created!', args.owner)

      if (currentAccountAddress.toLowerCase() === args.owner.toLowerCase()) {
        setAlertInfo({
          type: 'success',
          message: 'Player game token has been successfully generated',
        })
      }
    })

    const battleMoveEventFilter = contract.filters.BattleMove()
    addNewEvent(battleMoveEventFilter, provider, ({ args }) => {
      console.log('Battle move initiated!', args)
    })

    const roundEndedEventFilter = contract.filters.RoundEnded()
    addNewEvent(roundEndedEventFilter, provider, ({ args }) => {
      console.log('Round ended!', args, currentAccountAddress)

      for (let i = 0; i < args.damagedPlayers.length; i += 1) {
        if (
          args.damagedPlayers[i] !== import.meta.env.VITE_EMPTY_ACCOUNT_VALUE
        ) {
          if (args.damagedPlayers[i] === currentAccountAddress) {
            sparcle(getCoordinates(player1Ref))
          } else if (args.damagedPlayers[i] !== currentAccountAddress) {
            sparcle(getCoordinates(player2Ref))
          }
        } else {
          playAudio(defenseSound)
        }
      }

      setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1)

      setAlertInfo({
        type: 'info',
        message: ['Round is over', 'Waiting for next moves...'],
      })
    })

    // Battle Ended event listener
    const battleEndedEventFilter = contract.filters.BattleEnded()
    addNewEvent(battleEndedEventFilter, provider, ({ args }) => {
      const battleOverMessage = 'Battle is over!'

      if (currentAccountAddress.toLowerCase() === args.winner.toLowerCase()) {
        setAlertInfo({
          type: 'success',
          message: [battleOverMessage, 'You won!'],
        })
      } else if (
        currentAccountAddress.toLowerCase() === args.loser.toLowerCase()
      ) {
        setAlertInfo({
          type: 'failure',
          message: [battleOverMessage, 'You lost!'],
        })
      }

      router.push('/create-battle')
    })
  }
}
