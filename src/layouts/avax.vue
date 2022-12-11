<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()
const meta = computed(() => router.currentRoute.value.meta)

const defaultTitle = ['Welcome to Avax Gods', 'a Web3 NFT Card Game']
const defaultDescription =
  'Connect your wallet to start playing the ultimate Web3 Battle Card Game'

const layoutTitle = computed(
  () => (meta.value.layoutTitle as string[]) || defaultTitle
)
const layoutDescription = computed(
  () => (meta.value.layoutDescription as string) || defaultDescription
)

// Alert
const { alertInfo } = storeToRefs(useAlertInfoStore())
</script>

<template>
  <div class="hoc-container">
    <!-- Alert compoment -->
    <AlertInfo
      v-show="alertInfo.status"
      :type="alertInfo.type"
      :message="alertInfo.message"
    />

    <div class="hoc-content-box">
      <img
        src="/resources/logo.svg"
        alt="logo"
        class="hoc-logo"
        @click="router.push('/')"
      />

      <div class="hoc-body-wrapper">
        <div class="flex flex-row w-full">
          <h1 class="flex head-text">
            <template v-for="(text, index) in layoutTitle">
              {{ text }}
              <br v-if="index < layoutTitle.length" :key="index" />
            </template>
          </h1>
        </div>

        <p class="normal-text my-10">
          {{ layoutDescription }}
        </p>
        <RouterView />
      </div>

      <p class="footer-text">Made with 💜</p>
    </div>

    <div class="flex flex-1">
      <img
        src="/resources/background/hero-img.jpg"
        alt="hero-img"
        class="w-full xl:h-full object-cover"
      />
    </div>
  </div>
</template>
