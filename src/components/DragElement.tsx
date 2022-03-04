import { FC } from "react"
import { useDrag } from "react-dnd"
import { DragObject, DragTypes } from "../types/drag"


type DragElementProps = {
  /**
   * L'objet représentant le composant
   */
  item: DragObject
}

/**
 *  Le composant représantant l'item à déplacer.
 */
export const DragElement: FC<DragElementProps> = ({item}) => {

  const [{opacity}, drag] = useDrag(() => ({
    type: DragTypes.DRAG_OBJECT,
    item: item,
    collect: (monitor) => ({
      opacity: !!monitor.isDragging() ? 0.5 : 1
    })
  }))

  return (
    <div style={{opacity}} ref={drag}>
      WOW id : {item.id}
    </div>
  )
}
