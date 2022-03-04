import { DragElement } from "../components/DragElement"
import { DropBox } from "../components/DropBox"
import { DragStoreProvider } from "../store/drag"



const models = [0, 1, 2, 3, 4].map((value) => ({id: value}))

export const DragView = () => {
  return (
    <div>
      <DragStoreProvider>
        <DropBox />
        {
          models.map((model, key) => (<DragElement model={model} key={key} />))
        }
      </DragStoreProvider>
    </div>
  )
}
