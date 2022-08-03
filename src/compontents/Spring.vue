<template>
    <div>
        <canvas ref="el" width="1600" height="1000" scale-50 origin-top-left />
    </div>
</template>

<script setup lang="ts">
import { init } from './common'
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const img = new Image()
img.src = './public/peach-flower.svg'
let depth =0 

onMounted(() => {
  init(depth,ctx, img)
})
</script>