<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { type WalletError } from '~/utils/error-message';
const router = useRouter()

const { avaxContract, walletAddress } = storeToRefs(useWeb3Store())
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const [playerName, setPlayerName] = useState('')

const playerExists = computedAsync<boolean>(async () => {
  return avaxContract.value?.isPlayer(walletAddress.value) || false
}, false)

const playerTokenExists = computedAsync<boolean>(async () => {
  return (await avaxContract.value?.isPlayerToken(walletAddress.value)) || false
}, false)

// watch(avaxContract, () => {
//   createEventListeners({
//     contract: avaxContract.value as AVAXGods,
//     provider: provider.value!,
//     setShowAlertInfo: setAlertInfo,
//     walletAddress: walletAddress.value,
//   })
// })

const handleClick = async () => {
  try {
    // const playerExists = await avaxContract.value?.isPlayer(walletAddress.value)

    if (!playerExists.value) {
      console.info('Creating new player...')
      // Create a new player
      await avaxContract.value?.registerPlayer(
        playerName.value,
        playerName.value
      )

      setAlertInfo({
        status: true,
        type: 'info',
        message: `${playerName.value} is being summoned!`,
      })
    } else {
      console.info('Player exists ')
    }
  } catch (error) {
    setErrorMessage(<WalletError>error)
  }
}

const checkForPlayerToken = () => {
  if (playerExists.value && playerTokenExists.value) {
    setAlertInfo({
      status: true,
      type: 'info',
      message: 'You are ready to Battle!',
    })

    // unwatchPlayerCreated()

    router.push('/create-battle')
  } else {
    setAlertInfo({
      status: true,
      type: 'failure',
      message: 'You must first create a player',
    })
  }
}

watch([playerExists, playerTokenExists], checkForPlayerToken)
</script>

<template>
  <div>
    <div class="flex flex-col">
      <!-- CustomInput component  -->
      <CustomInput
        label="Name"
        placeholder="Enter your player name"
        :value="playerName"
        @handle-change="setPlayerName"
      />
    </div>
    <CustomButton
      title="Register"
      rest-styles="mt-6"
      @handle-click="handleClick"
    />
  </div>
</template>

<route lang="yaml">
meta:
  layout: avax
</route>
