import { DragStoreAction } from "./drag.actions";
import { DragStoreState, DragStoreTypes as T } from "./drag.types";

export const reducer = (state: DragStoreState, action: DragStoreAction): DragStoreState => {
  switch (action.type) {
    case T.DRAG_ADD_IN_BAG: {
      return {
        ...state,
        bag: [...state.bag, action.payload]
      }
    }
  }

  return state
}
