import { DragItem } from "../types/drag";

class DragApi {

  getById = (id: number): DragItem => {
    return {
      id: id
    }
  }
}

const api = new DragApi()

 export { api as DragApi }
