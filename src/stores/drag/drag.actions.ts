import { DragItem } from "../../types/drag";
import { Action, MutableAction } from "../../types/store";
import { DragStoreState } from "./drag.types";

/**
 * Ajoute un item dans l'état state de la fonction renvoyé
 * 
 * @param item l'item à ajouter 
 * @returns La fonction callback qui renverra un nouvel état avec l'item ajouté
 */
export const addItemInBag = (item: DragItem): Action<DragStoreState> => {
  return (state: DragStoreState): DragStoreState => {
    return {
      ...state,
      bag: [...state.bag, item]
    }
  }
}

/**
 * Ajoute un item dans l'état state mais cette fois-ci en utilisant un state mutable
 */
export const addItemInBagMutable = (item: DragItem): MutableAction<DragStoreState> => {
  return (state: DragStoreState) => {
    state.bag.push(item)
  }
}
