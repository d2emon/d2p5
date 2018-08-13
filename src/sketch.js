import p5 from "p5";

const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight)
    }

    p.draw = () => {
        //
    }
}

const myp5 = new p5(sketch)

export default myp5
