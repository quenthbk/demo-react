import { DragObject } from "../../types/drag";

export enum DragStoreTypes {
  DRAG_ADD_IN_BAG = 'DRAG_ADD_IN_BAG',
  DRAG_NOTHING = 'NOTHING'
}

export interface DragStoreState {
  bag: DragObject[]
}
