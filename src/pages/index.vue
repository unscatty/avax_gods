<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { avaxContract, walletAddress } = storeToRefs(useWeb3Store())
const { setAlertInfo } = useAlertInfoStore()

const [playerName, setPlayerName] = useState('')

const handleClick = async () => {
  try {
    const playerExists = await avaxContract.value?.isPlayer(walletAddress.value)

    if (!playerExists) {
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
    }
  } catch (error: any) {
    console.info(error)

    setAlertInfo({
      status: true,
      type: 'failure',
      message: error.message as string,
    })
  }
}
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
