import { Button } from '@material-tailwind/react'
import React from 'react'

const Buttonz = (props) => {
  const { label, children, ...prop } = props
  return (
    <Button size="md" color="light-blue" {...prop}>{children || label}</Button>
  )
}

export default Buttonz