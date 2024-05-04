import { Checkbox } from '@material-tailwind/react'
import React from 'react'

const CheckBoxz = (props) => {
  const { ...prop } = props
  return (
    <Checkbox color="light-blue" {...prop} />
  )
}

export default CheckBoxz