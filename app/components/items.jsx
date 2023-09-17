import React from 'react'


const ColoredLine = ({color, height}) => {
  return (
    <hr
    style={{
        color: color,
        backgroundColor: color,
        height: height
    }}
/>
  )
}

export { ColoredLine};