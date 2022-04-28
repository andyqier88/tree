<script setup lang="ts">
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el!.getContext('2d')!)
const img = new Image()
img.src = './public/peach-flower.svg'

interface Point {
  x: number
  y: number
}

interface Branch {
  start: Point
  length: number
  theta: number
  branchWidth: number
}

function init() {
  ctx.strokeStyle = '#493219'

  step({
    start: { x: 1000, y: 999 },
    length: 150,
    theta: -Math.PI / 2,
    branchWidth: 20,
  })
}

let pendingTasks: Function[] = []

function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b, b.branchWidth)

  if (depth < 5 || Math.random() < 0.4) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length * (0.7 + Math.random() * 0.3),
      // theta: b.theta - 0.2 * Math.random(),
      theta: b.theta + Math.random() * (2 * Math.PI) / 4 - (2 * Math.PI) / 4 * 0.5,

      branchWidth: b.branchWidth,
    }, depth + 1))
  }
  if (depth < 5 || Math.random() < 0.4) {
    pendingTasks.push(() => step({
      start: end,
      length: b.length * (0.7 + Math.random() * 0.3),
      theta: b.theta + Math.random() * (2 * Math.PI) / 4 - (2 * Math.PI) / 4 * 0.5,
      branchWidth: b.branchWidth,
    }, depth + 1))
  }
  ctx.strokeStyle = `rgb(${(Math.random() * 64 + 64) >> 0},50,25)`
  if (depth > 2)
    ctx.lineWidth = b.branchWidth *= 0.8
}

function frame() {
  const tasks: Function[] = []
  pendingTasks = pendingTasks.filter((i) => {
    if (Math.random() > 0.4) {
      tasks.push(i)
      return false
    }
    return true
  })
  tasks.forEach(fn => fn())
}

let framesCount = 0
function startFrame() {
  requestAnimationFrame(() => {
    framesCount += 1
    if (framesCount % 10 === 0)
      frame()

    startFrame()
  })
}

startFrame()

function lineTo(p1: Point, p2: Point, lineWidth = 12) {
  ctx.lineWidth = lineWidth *= 0.75
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)
  ctx.lineTo(p2.x, p2.y, lineWidth *= 0.75)
  ctx.lineCap = 'round'
  ctx.stroke()
}
// 获取
function getEndPoint(b: Branch): Point {
  return {
    x: b.start.x + b.length * Math.cos(b.theta),
    y: b.start.y + b.length * Math.sin(b.theta),
  }
}

function drawBranch(b: Branch) {
  lineTo(b.start, getEndPoint(b), b.branchWidth * 0.75)
  drawImg(b.start, getEndPoint(b))
}
function drawImg(p1: Point, p2: Point) {
  ctx.drawImage(img, p2.x - 5, p2.y - 5)
}
onMounted(() => {
  init()
})
</script>

<template>
  <canvas ref="el" width="2000" height="1000" scale-50 origin-top-left />
</template>>
