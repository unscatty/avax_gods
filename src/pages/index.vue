<script setup lang="ts">
import { invoke } from '@vueuse/core'
import { storeToRefs } from 'pinia'
const router = useRouter()

const {
  avaxContract,
  currentAccountAddress,
  isConnectedToContract,
  currentPlayerInfo,
} = storeToRefs(useWeb3Store())
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const playerName = ref('')

const playerExists = computedAsync(async () => {
  return (
    (await avaxContract.value?.isPlayer(currentAccountAddress.value))
  )
}, false)

const handleClick = async () => {
  try {
    if (!playerExists.value) {
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
      setAlertInfo({
        status: true,
        type: 'info',
        message: `${playerName.value} already exists!`,
      })
    }
  } catch (error) {
    setErrorMessage(error)
  }
}

invoke(async () => {
  await until(currentPlayerInfo).toBeTruthy()

  setAlertInfo({
    status: true,
    type: 'info',
    message: 'You are ready to Battle!',
  })

  router.push('/create-battle')
})
</script>

<route lang="yaml">
meta:
  layout: avax
</route>

<template>
  <div>
    <div class="flex flex-col">
      <!-- CustomInput component  -->
      <CustomInput
        v-model="playerName"
        label="Name"
        placeholder="Enter your player name"
      />
    </div>
    <CustomButton
      title="Register"
      rest-styles="mt-6"
      :is-enabled="isConnectedToContract"
      @handle-click="handleClick"
    />
  </div>
</template>
