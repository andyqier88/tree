<script setup>
function drawTree(startX, startY, length, angle, depth, branchWidth) {
  let newLength = null
  let newAngle = null
  let newDepth = null
  let endX = null
  let endY = null
  const maxAngle = (2 * Math.PI) / 5
  let subBranches = null
  // 开始绘制路径
  this.ctx.beginPath()
  this.ctx.moveTo(startX, startY)
  endX = startX + Math.cos(angle) * length
  endY = startY + Math.sin(angle) * length

  this.ctx.lineCap = 'round'
  this.ctx.lineWidth = branchWidth
  this.ctx.lineTo(endX, endY)

  this.ctx.strokeStyle = '#442525' // 树干棕色

  this.ctx.stroke()
  if (depth <= 4)
    this.leafArr.push([endX, endY])

  newDepth = depth - 1
  if (newDepth <= 0)
    return // 如果绘制到叶子节点后就结束递归

  subBranches = this.getRandomInt(2, 3)
  branchWidth *= 0.75
  for (let i = 0; i < subBranches; i++) {
    newLength = length * 0.75 + 0.25 * length * Math.random()
    newAngle = angle + Math.random() * maxAngle - maxAngle * 0.5
    this.drawTree(endX, endY, newLength, newAngle, newDepth, branchWidth)
  }
}
function drawAllLeaves() {
  this.leafArr.forEach((item) => {
    this.drawLeaf(item[0], item[1], this.getRandomInt(15, 25))
  })
}
function drawLeaf(x, y, num) {
  for (let i = 0; i < num; i++) {
    x += (Math.random() - 0.5) * this.getRandomInt(0, 25)
    y += (Math.random() - 0.5) * this.getRandomInt(0, 25)
    this.ctx.beginPath()
    const num1 = Math.random()
    this.ctx.fillStyle
          = `rgba(247,${
        Math.random() * 190
      },190,${
        num1 >= 0.5 ? num1 - 0.2 : num1
      })`
    this.ctx.arc(x, y, this.getRandomInt(2, 5), 0, 2 * Math.PI)
    this.ctx.fill()
  }
}
onMounted(() => {
//   init()
  drawTree()
})
</script>

<template>
  <canvas ref="el" width="2000" height="1000" scale-50 origin-top-left />
</template>>
