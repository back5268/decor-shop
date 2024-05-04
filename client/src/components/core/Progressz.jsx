import { Progress } from '@material-tailwind/react'
import React from 'react'

const Progressz = (props) => {
  const { ...prop } = props
  return (
    <Progress value={50} color="blue" {...prop} />
  )
}

export default Progressz