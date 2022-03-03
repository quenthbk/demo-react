import { FC } from "react"
import { useDrag } from "react-dnd"
import { DragObject, DragTypes } from "../types/drag"

type DragElementProps = {
  model: DragObject
}

export const DragElement: FC<DragElementProps> = ({model}) => {

  const [{opacity}, drag, dragPreview] = useDrag(() => ({
    type: DragTypes.DRAG_OBJECT,
    item: model,
    previewOptions: {
      
    },
    collect: (monitor) => ({
      opacity: !!monitor.isDragging() ? 0.5 : 1
    })
  }))

  return (
    <div style={{opacity}} ref={drag}>
      WOW id : {model.id}
    </div>
  )
}
