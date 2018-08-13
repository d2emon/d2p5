import hint from "./images/hint.jpg"
import background from "./images/background.jpg"

export default (p) => {
    const width = 800 // window.innerWidth
    const height = 800 // window.innerHeight
    const hintImage = p.loadImage(hint)
    const skyImage = p.loadImage(background)

    let stars = []

    let gfx1 = null
    let gfx2 = null
    let gfx3 = null

    const findPixel = () => {
        let x, y
        for (let i = 0; i < 15; i++) {
            x = p.floor(p.random(hintImage.width))
            y = p.floor(p.random(hintImage.height))
            if (p.red(hintImage.get(x, y)) < 255) break
        }
        return p.createVector(x, y)
    }

    const Star = function (position, target) {
        this.position = position
        this.target = target
        this.diameter = p.random(1, 5)
    }

    Star.prototype.update = function () {
        /*
        this.position = p.Vector.lerp(
            this.position,
            this.target,
            0.04
        )
        */
    }

    Star.prototype.draw = function ()  {
        const alpha = p.noise(
            this.target.x,
            this.target.y,
            p.millis() / 1000
        )
        p.fill(255, alpha * 255)
        p.ellipse(
            this.position.x,
            this.position.y,
            this.diameter,
            this.diameter
        )
    }

    p.setup = () => {
        gfx1 = p.createGraphics(width, height)

        p.createCanvas(width, height)

        p.noCursor()

        p.imageMode(p.CENTER)
        p.angleMode(p.DEGREES)

        p.translate(width / 2, height / 2)

        p.background(40)

        gfx1.stroke(200)
        gfx1.strokeWeight(3)

        for (let i = 0; i < 1000; i++) {
            gfx1.point(
                Math.random() * width,
                Math.random() * height
            )
        }

        gfx2 = {...gfx1}
        gfx3 = {...gfx1}

        p.image(gfx1, 0, 0)

        p.rotate(1)
        p.image(gfx2, 0, 0)

        p.rotate(2)
        p.image(gfx3, 0, 0)
    }

    p.draw = () => {
        p.image(skyImage, 0, 0)

        let position = p.createVector(p.mouseX, p.mouseY)

        p.fill(255, 192, 0)
        p.ellipse(position.x, position.y, 8, 8)

        if (p.mouseIsPressed) {
            let target = findPixel()
            let star = new Star(position, target)
            stars.push(star)
            if (stars.length > 1000) stars.shift()
        }

        stars.forEach(star => {
            star.update()
            star.draw()
        })

        /*
        p.image(gfx1, 0, 0)

        p.rotate(1)
        p.image(gfx2, 0, 0)

        p.rotate(2)
        p.image(gfx3, 0, 0)
        */
    }
}
