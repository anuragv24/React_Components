import React, { useState } from 'react'
import { data } from './data'
import './style.css'

const Index = () => {

    const [selected, setSelected] = useState(null)
    const [enableMulSel, setEnableMulSel] = useState(false)
    const [multiple, setMultiple] = useState([])

    const handleSingleSelection = (currentId) => {
        setSelected(currentId === selected ? null : currentId)
    }

    const handleMulSelection = (currentId) => {
        console.log("currentID : ", currentId)
        const cpyMultiple = [...multiple]
        console.log("multiple: ", multiple)
        console.log("cpyMultiple : ", cpyMultiple);
        
        const isPresent = cpyMultiple.indexOf(currentId)
        console.log("ispresent: ", isPresent);
        
        
        if(isPresent === -1) cpyMultiple.push(currentId)
        else cpyMultiple.splice(isPresent, 1)

        setMultiple(cpyMultiple)
    }
  return (
    <div className='wrapper'>
        <button onClick={() => {
            setEnableMulSel(!enableMulSel)
            setSelected(null)
            setMultiple([])
            }}>
                Enable multiSelect : {enableMulSel ? <span>On</span> : <span>Off</span> }
        </button>
        <div className='accordian'>
            {
                data && data.length > 0 ? 
               ( data.map( (dataItem) => (
                    <div className='item' key={dataItem.id}>
                        <div className='title'
                            onClick={ !enableMulSel ? () => handleSingleSelection(dataItem.id) 
                                                    : () => handleMulSelection(dataItem.id)
                            } 
                            style={{backgroundColor:'black'}} >
                            <h3>{dataItem.ques}</h3>
                            <span>+</span>
                        </div>
                        {
                            selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ?
                            (
                                <div className='content' style={{backgroundColor: 'blue'}} >{dataItem.ans}</div>
                            ) : null
                        }
                    </div>
                ) ) 
            )
                :( <div>No Data Found !</div>)
            }
        </div>
    </div>
  )
}

export default Index