let color = document.getElementById('color').value
let lineSize = document.getElementById('lineSize').value
const buttons = document.getElementsByClassName('button')
const ChangeColor = (e) => {
    color = e.value
    console.log(color)
}
const paint = () => {
    color = document.getElementById('color').value
    buttons[0].classList.add('selected')
    buttons[1].classList.remove('selected')
}
const ChangeLineSize = (e) =>{
    lineSize= e.value
    console.log(lineSize)
}

const Eraser = () => {
    
    color = '#fff'
    buttons[0].classList.remove('selected')
    buttons[1].classList.add('selected')
}

 

window.addEventListener('load' , () => {
    const body = document.getElementsByTagName('body')[0]
    const main = document.getElementById('main')
    const header = document.getElementById('header')
    const canvas = document.createElement('canvas')

    const ClearFull = document.getElementById('ClearFull')
    canvas.classList.add('canvas')
    
    
    main.appendChild(canvas)

    const EraserAll = () =>{
        currentContext.clearRect(0, 0 ,canvas.width,canvas.height)
    }

    
    const getMousePosition = () => {
        const rect = canvas.getBoundingClientRect()

        return {
            mouseX: event.clientX - rect.left,
            mouseY: event.clientY - rect.top,
        
        }
    }
    
    const defineHeigthAndWitdhCanvas = () => {
        canvas.width = main.clientWidth 
        canvas.height = main.clientHeight
    }
    defineHeigthAndWitdhCanvas()

    let paiting = false
    const contexts = {

    }
    let countContext = 0
    let currentContext


    const ConfigContext = (context) => {
        const position = getMousePosition()

        currentContext = context
        currentContext.beginPath()
        currentContext.lineWidth = lineSize
        currentContext.strokeStyle = color
        currentContext.moveTo(position.mouseX, position.mouseY)

        countContext++
    }

    const createContext = () => {
        Object.defineProperty(contexts, `ctx${countContext}`, {
            value: canvas.getContext('2d')
        })
         

        return contexts[`ctx${countContext}`]
    }


    const draw = () => {
        const position = getMousePosition()
        currentContext.lineTo(position.mouseX, position.mouseY, 4, 4);
        
        currentContext.stroke();
       
    }

    const StartPaiting = () => {
        paiting = true
     
        currentContext = createContext()
        ConfigContext(currentContext)

    }

    const StopPaiting = () => {
        console.log('stop')
        paiting = false

        
    }

    const drawing = () => {
        if(paiting){
            draw()
        }
         
    }
    canvas.addEventListener('mousedown', StartPaiting)
    canvas.addEventListener('mousemove',drawing)
    canvas.addEventListener('mouseup',StopPaiting )
    body.addEventListener('mouseout', StopPaiting)

    ClearFull.addEventListener('click', EraserAll)

    window.addEventListener('resize', defineHeigthAndWitdhCanvas)

})



