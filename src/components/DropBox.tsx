import { useState } from "react"
import { useDrop } from "react-dnd"
import { DragObject, DragTypes } from "../types/drag"
import { DragElement } from "./DragElement"

export const DropBox = () => {
  const [items, setItems] = useState<DragObject[]>([])

  const [{isOver}, drop] = useDrop(() => ({
    accept: DragTypes.DRAG_OBJECT,
    drop: (item: DragObject) => handleDrop(item),
    collect: (monitor) => ({isOver: monitor.isOver()})
  }))

  const handleDrop = (item: DragObject) => {
    setItems([...items, item])
  }


  const border = isOver ? 'dotted 1px red' : 'solid 1px black'

  return (
    <div ref={drop} style={{width: '100px', height: '100px', border}}>
      DRAG HERE
      {
        items.map((value, key) => (<DragElement key={key} model={value} />))
      }
    </div>
  )
}
