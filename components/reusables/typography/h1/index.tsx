import React from 'react'

interface H1Interface {
  className?: string | undefined
  children: any
}
const H1 = (props: H1Interface) => {
  return <h1 className={"text-3xl font-bold " + props.className}>{props.children}</h1>;
}

export default H1