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

export function init(depth: number =0 ,ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    ctx.strokeStyle = '#493219'

    step({
        start: { x: 1000, y: 999 },
        length: 150,
        theta: -Math.PI / 2,
        branchWidth: 20,
    },
    depth,
    ctx,
    img
    )
}

let pendingTasks: Function[] = []

function step( b: Branch, depth = 0, ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
    const end = getEndPoint(b)
    drawBranch(b, b.branchWidth, ctx, img)

    if (depth < 5 || Math.random() < 0.4) {
        pendingTasks.push(() => step({
            start: end,
            length: b.length * (0.7 + Math.random() * 0.3),
            // theta: b.theta - 0.2 * Math.random(),
            theta: b.theta + Math.random() * (2 * Math.PI) / 4 - (2 * Math.PI) / 4 * 0.5,

            branchWidth: b.branchWidth,
        }, depth + 1, ctx, img))
    }
    if (depth < 5 || Math.random() < 0.4) {
        pendingTasks.push(() => step({
            
            start: end,
            length: b.length * (0.7 + Math.random() * 0.3),
            theta: b.theta + Math.random() * (2 * Math.PI) / 4 - (2 * Math.PI) / 4 * 0.5,
            branchWidth: b.branchWidth,
        }, depth + 1, ctx, img))
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

function lineTo(ctx: any, p1: Point, p2: Point, lineWidth: number = 12) {
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

function drawBranch(b: Branch, branchWidth: number = 0, ctx: any, img: any, ) {
    lineTo(ctx, b.start, getEndPoint(b), b.branchWidth * 0.75)
    drawImg(ctx, img, b.start, getEndPoint(b))
}
function drawImg(ctx: any, img: any, p1: Point, p2: Point) {
    ctx.drawImage(img, p2.x - 5, p2.y - 5)
}