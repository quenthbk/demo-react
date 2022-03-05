import { FC, useState } from "react"
import { useDrop } from "react-dnd"
import { useDragStore } from "../stores/drag"
import { addItemInBag } from "../stores/drag/drag.actions"
import { DragItem, DragTypes } from "../types/drag"
import { DragElement } from "./DragElement"

/**
 * Le composant représantant le sac à objet lâché.
 */
export const DropBox: FC = () => {
  const [isOkey, setIsOkey] = useState(false)
  const {state, dispatch} = useDragStore()

  const [{isOver}, drop] = useDrop(() => ({
    accept: DragTypes.DRAG_ITEM,
    drop: (item: DragItem) => handleDrop(item),
    collect: (monitor) => ({isOver: !!monitor.isOver()})
  }))

  const handleDrop = (item: DragItem) => {
    dispatch(addItemInBag(item))
    setIsOkey((isOkey) => !isOkey)
  }

  const border = isOver ? 'dotted 1px red' : 'solid 1px black'

  return (
    <>
      {
        state.bag.map((value, key) => (<DragElement key={key} item={value} />))
      }
    <div onClick={() => {setIsOkey(! isOkey)}} ref={drop} style={{width: '100px', height: '100px', border}}>
      DRAG {isOkey ? 'e' : 'a'}
    </div>
    </>
  )
}
