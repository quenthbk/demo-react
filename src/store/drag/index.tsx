import { createContext, FC, useContext, useReducer } from "react";
import { DragStoreState } from "./drag.types";
import { reducer } from "./drag.reducers";
import { DragStoreAction } from "./drag.actions";

const initialState: DragStoreState = {
  bag: []
}

export const DragStoreContext = createContext({state: initialState, dispatch: (disp: DragStoreAction) => {}});

export const DragStoreConsumer = DragStoreContext.Consumer;
export const DragStoreConsumerHook = () => useContext(DragStoreContext);

export const DragStoreProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DragStoreContext.Provider value={{state, dispatch}}>
      {children}
    </DragStoreContext.Provider>
 )
}
