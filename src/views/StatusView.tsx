import { useState } from "react"
import { DragElement } from "../components/DragElement"
import { DragApi } from "../services/DragApi"
import { DragItem } from "../types/drag"


/**
 * La vue Status permettant de faire appel à une api (qui n'existe pas encore)
 */
export const StatusView = () => {
  const [items, setItems] = useState<DragItem[]>([])
 
  const handleCreateDragItem = () => {
    setItems([...items, DragApi.getById(items.length)])
  }

  return (
    <>
      <pre onClick={handleCreateDragItem}>
        Open
      </pre>
      <ul>
        {
          items.map((item) => (<DragElement item={item} />))
        }
      </ul>
    </>
  )
}
