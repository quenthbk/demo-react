import { DragElement } from "../components/DragElement"
import { DropBox } from "../components/DropBox"



const models = [0, 1, 2, 3, 4].map((value) => ({id: value}))

export const DragView = () => {
  return (
    <div>
      <DropBox />
      {
        models.map((model, key) => (<DragElement model={model} key={key} />))
      }
    </div>
  )
}
