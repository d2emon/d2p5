import hint from "./images/hint.jpg"
import background from "./images/background.jpg"
import {Vector} from "p5"

export default (p) => {
    const width = 1024 // window.innerWidth
    const height = 600 // window.innerHeight

    let hintImage
    let skyImage

    let stars = []

    const findPixel = () => {
        let x, y
        for (let i = 0; i < 15; i++) {
            x = p.floor(p.random(hintImage.width))
            y = p.floor(p.random(hintImage.height))
            if (p.red(hintImage.get(x, y)) < 255) break
        }
        return p.createVector(x, y)
    }

    const Star = function (position) {
        this.position = position
        this.target = findPixel()
        this.diameter = p.random(1, 5)

        stars.push(this)
        if (stars.length > 1024) stars.shift()
    }

    Star.prototype.update = function () {
        console.log(this.position, this.target)
        this.position = Vector.lerp(
            this.position,
            this.target,
            0.04
        )
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

    p.preload = () => {
        hintImage = p.loadImage(hint)
        skyImage = p.loadImage(background)
    }

    p.setup = () => {
        p.createCanvas(width, height)
        p.noCursor()
        p.noStroke()
    }

    p.draw = () => {
        p.image(skyImage, 0, 0, width, height)
        // p.background(skyImage)

        let position = p.createVector(p.mouseX, p.mouseY)

        p.fill(255, 192, 0)
        p.ellipse(position.x, position.y, 8, 8)

        if (p.mouseIsPressed) {
            new Star(position)
        }

        stars.forEach(star => {
            star.update()
            star.draw()
        })
    }
}
