import hint from "./images/hint.jpg"
import background from "./images/background.jpg"
import {Vector} from "p5"

export default (p) => {
    const width = 1024 // window.innerWidth
    const height = 600 // window.innerHeight

    let skyImage

    let stars = []

    const Star = function (position) {
        this.position = position
        this.diameter = p.random(1, 5)

        stars.push(this)
        if (stars.length > 1024) stars.shift()
    }

    Star.prototype.update = function () {
        //
    }

    Star.prototype.draw = function ()  {
        const alpha = p.noise(
            this.position.x,
            this.position.y,
            p.millis() / 1000
        ) * 255
        p.fill(255, alpha)
        p.ellipse(
            this.position.x,
            this.position.y,
            this.diameter,
            this.diameter
        )
    }

    p.preload = () => {
        skyImage = p.loadImage(background)
    }

    p.setup = () => {
        p.createCanvas(width, height)
        p.noCursor()
        p.noStroke()

        for (let i = 0; i < 1024; i++) {
            let x = p.random() * width
            let y = Math.pow(1 - p.random(), 2) * (height - 150)
            let position = p.createVector(x, y)
            new Star(position)
        }
    }

    p.draw = () => {
        p.image(skyImage, 0, 0, width, height)
        // p.background(skyImage)

        let position = p.createVector(p.mouseX, p.mouseY)

        p.fill(255, 192, 0)
        p.ellipse(position.x, position.y, 8, 8)

        /*
        if (p.mouseIsPressed) {
            new Star(position)
        }
        */

        stars.forEach(star => {
            star.update()
            star.draw()
        })
    }
}
