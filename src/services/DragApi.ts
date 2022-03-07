import { DragItem } from "../types/drag";

class DragApi {

  /**
   * 
   * @param id the id to get
   * @returns An Item
   */
  getById = (id: number): DragItem => {
    return {
      id: id
    }
  }
}

const api = new DragApi()

export { api as DragApi }
