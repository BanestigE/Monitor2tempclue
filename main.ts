function position (x: number, y: number) {
    led.unplot(xPosition - 5, yPosition)
    xPosition = x
    yPosition = y
}
function TempChange () {
    if (input.temperature() <= 19) {
        for (let index = 0; index < 6; index++) {
            Plot(500)
        }
        for (let index = 0; index < 3; index++) {
            Plot(800)
        }
        for (let index = 0; index < 1; index++) {
            Plot(1000)
        }
        FinalX = randint(0, 4)
        FinalY = randint(0, 4)
        led.plot(FinalX, FinalY)
    }
    radio.sendValue("xTarget", FinalX)
    radio.sendValue("yTarget", FinalY)
}
radio.onReceivedValue(function (name, value) {
    if (name == "xPos") {
        position(value, yPosition)
    } else if (name == "yPos") {
        position(value, xPosition)
    } else if (name == "interact" && value == 2) {
        basic.showNumber(1)
    } else {
    	
    }
})
function Movestart () {
    Plot(200)
}
function Plot (num: number) {
    RandomX = randint(0, 4)
    RandomY = randint(0, 4)
    led.plot(RandomX, RandomY)
    basic.pause(num)
    led.unplot(RandomX, RandomY)
}
let RandomY = 0
let RandomX = 0
let FinalY = 0
let FinalX = 0
let yPosition = 0
let xPosition = 0
radio.setGroup(10)
xPosition = 0
yPosition = 0
while (input.temperature() > 19) {
    Movestart()
}
TempChange()
basic.forever(function () {
    led.plot(xPosition - 5, yPosition)
})
