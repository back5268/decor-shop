import { Radio } from '@material-tailwind/react'
import React from 'react'

const Radioz = (props) => {
  const { ...prop } = props
  
  return (
    <Radio color="light-blue" {...prop} />
  )
}

export default Radioz