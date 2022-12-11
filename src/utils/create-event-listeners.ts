import { Provider } from '@ethersproject/providers'
import { ethers, EventFilter } from 'ethers'
import { LogDescription } from 'ethers/lib/utils'
// import { AVAXGodsInterface } from '~/contract/types/AVAXGods'
import { ABI } from '~/contract'
import { type AVAXGods } from '~/contract/types'

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

export const createEventListeners = ({
  contract,
  provider,
  walletAddress,
  setShowAlertInfo,
}: {
  contract: AVAXGods
  provider: Provider
  walletAddress: string
  setShowAlertInfo: ReturnType<typeof useAlertInfoStore>['setAlertInfo']
}) => {
  if (contract) {
    const newPlayerEventFilter = contract.filters.NewPlayer()

    addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
      console.log('New player created!', args)

      if (walletAddress === args.owner) {
        setShowAlertInfo({
          status: true,
          type: 'success',
          message: 'Player has been successfully registered',
        })
      }
    })
  }
}
