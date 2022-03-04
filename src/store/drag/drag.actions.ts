import { DragObject } from "../../types/drag";
import { DragStoreTypes as T } from "./drag.types";


export type DragStoreAction = 
  | { type: T.DRAG_ADD_IN_BAG, payload: DragObject}
  | { type: T.DRAG_NOTHING }
