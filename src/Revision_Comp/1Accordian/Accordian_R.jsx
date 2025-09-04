import React, { useState } from 'react'
import { data } from './data'

const Accordian_R = () => {
    const [selected, setSelected] = useState("")

    const handleSelect = (id) => {
        setSelected(id)
    }
  return (
    <div>
        {data && data.length && (
            data.map((element) => (
                <div key={element.id}>
                        <div onClick={() => handleSelect(element.id)}>
                            {element.ques}
                        </div>
                        {selected == element.id ? (
                            <div>{element.ans}</div>
                        ) : null}
                </div>
            ))
        )}
    </div>
  )
}

export default Accordian_R