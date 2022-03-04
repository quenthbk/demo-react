import { DragItem } from "../../types/drag";
import { DragStoreState } from "./drag.types";

/**
 * Ajoute un item dans l'état state de la fonction renvoyé
 * 
 * @param item l'item à ajouter 
 * @returns La fonction callback qui renverra un nouvel état avec l'item ajouté
 */
export const addItemInBag = (item: DragItem) => {
  return (state: DragStoreState): DragStoreState => {
    return {
      ...state,
      bag: [...state.bag, item]
    }
  }
}
