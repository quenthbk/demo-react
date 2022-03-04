import { FC, useContext, useState } from "react"
import { useDrop } from "react-dnd"
import { DragStoreConsumerHook, DragStoreContext } from "../store/drag"
import { DragStoreTypes } from "../store/drag/drag.types"
import { DragObject, DragTypes } from "../types/drag"
import { DragElement } from "./DragElement"

export const DropBox: FC = () => {
  const [basket, setBasket] = useState<DragObject[]>([])
  const [isOkey, setIsOkey] = useState(false)
  const {state, dispatch} = useContext(DragStoreContext)

  const [{isOver}, drop] = useDrop(() => ({
    accept: DragTypes.DRAG_OBJECT,
    drop: (item: DragObject) => handleDrop(item),
    collect: (monitor) => ({isOver: !!monitor.isOver()})
  }))

  const handleDrop = (item: DragObject) => {
    dispatch({
      type: DragStoreTypes.DRAG_ADD_IN_BAG,
      payload: item
    })
    setIsOkey((isOkey) => !isOkey)
  }

  const border = isOver ? 'dotted 1px red' : 'solid 1px black'

  return (
    <>
      {
        state.bag.map((value, key) => (<DragElement key={key} model={value} />))
      }
    <div onClick={() => {setIsOkey(! isOkey)}} ref={drop} style={{width: '100px', height: '100px', border}}>
      DRAG {isOkey ? 'e' : 'a'}
    </div>
    </>
  )
}
