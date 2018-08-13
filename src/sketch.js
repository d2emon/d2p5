export default (p) => {
    p.setup = () => {
        const gfx1 = p.createGraphics(window.innerWidth, window.innerHeight)

        p.createCanvas(window.innerWidth, window.innerHeight)

        p.imageMode(p.CENTER)
        p.angleMode(p.DEGREES)

        p.translate(window.innerWidth / 2, window.innerHeight / 2)

        p.background(40)

        gfx1.stroke(200)
        gfx1.strokeWeight(3)

        for (let i = 0; i < 1000; i++) {
            gfx1.point(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            )
        }

        const gfx2 = {...gfx1}
        const gfx3 = {...gfx1}

        p.image(gfx1, 0, 0)

        p.rotate(1)
        p.image(gfx2, 0, 0)

        p.rotate(2)
        p.image(gfx3, 0, 0)
    }

    p.draw = () => {
        /*
        for (let i = 0; i < 1000; i++) {
            p.point(Math.random() * window.innerWidth, Math.random() * window.innerHeight)
        }
        */

        // arr.forEach(point => p.point(point.x + 5, point.y))
    }
}
