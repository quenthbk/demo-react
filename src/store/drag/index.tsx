import { createStore } from "../../utils/createStore";
import { DragStoreState } from "./drag.types";

const initialState: DragStoreState = {
  bag: []
}

const {useStore, StoreProvider} = createStore(initialState)

export {useStore as useDragStore, StoreProvider as DragStoreProvider}
