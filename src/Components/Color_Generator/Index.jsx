import React, { useEffect, useState } from 'react'

function Index() {
    const [colorType, setColorType] = useState("hex")
    const [ran, setRan] = useState('')
    const [color, setColor] = useState('#fff')

   const handleColorType = (type) => {
    if (colorType !== type) {
        setColorType(type);
        handleColorCreation(type);
   }
}

   const randomIndexFunction = (len) => {
    return Math.floor(Math.random()*len)
   }

   const handleColorCreation = () => {
    // for hex color
    if(colorType === 'hex'){
        const characters = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
        const len = characters.length
        let hex = '#'
        for(let i = 0; i < 6; i++){
            const randomIndex = randomIndexFunction(len)
            hex += characters[randomIndex]
        }
        setRan(hex)
        setColor(hex)
    } else {
        const r = randomIndexFunction(256)
        const g = randomIndexFunction(256)
        const b = randomIndexFunction(256)
        const color = `rgb(${r},${g},${b})`
        setColor(color)
        setRan(color)
    }
   }

//    useEffect(() => {
//     handleColorCreation()
//    }, [colorType])

   const textColor = color === '#fff' || color === 'rgb(255,255,255)' ? "black" : "white"
  return (
    <div style={{  
        height:"100vh",
        width: "100vw",
        backgroundColor:color,
         }}>
           <div style={{
            display:'flex',
            justifyContent:'center',
            gap:'10px',
            padding:'10px'
           }}>
            <button onClick={() => handleColorCreation()}>Create Color</button>
            <button onClick={() => handleColorType("hex")} >hex color</button>
            <button onClick={() => handleColorType("rgb")} >rgb color</button>
           </div>
           <h2 style={{color: textColor}}>{colorType} : {ran}</h2>
        </div>
  )
}

export default Index