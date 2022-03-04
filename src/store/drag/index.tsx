import { createContext, FC, useContext, useReducer } from "react";
import { DragStoreState } from "./drag.types";

const initialState: DragStoreState = {
  bag: []
}

export const reducer = (state: DragStoreState, action: (state: DragStoreState) => DragStoreState): DragStoreState => {
  return action(state)
}

export const DragStoreContext = createContext({state: initialState, dispatch: (value: (state: DragStoreState) => DragStoreState) => {}});

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
