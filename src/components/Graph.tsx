import React from 'react'
import greuler from 'greuler'

interface GraphProps {
  id: string
  data: object
  style?: object
}

export default function Graph(props: GraphProps) {
  React.useEffect(() => {
    greuler({
      target: '#' + props.id,
      data: props.data,
    }).update()
  }, [])

  return <div id={props.id} style={props.style}></div>
}
