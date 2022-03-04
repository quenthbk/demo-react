import { createStoreContext } from "../../utils/createStoreContext";
import { DragStoreState } from "./drag.types";

const initialState: DragStoreState = {
  bag: []
}

const {useStore, StoreProvider} = createStoreContext(initialState)

export {useStore as useDragStore, StoreProvider as DragStoreProvider}
