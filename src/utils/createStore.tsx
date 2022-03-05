import { createContext, Dispatch, FC, useContext, useReducer } from "react"
import { Action, Store } from "../types/store";


/**
 * Création d'un Store complet pour l'application
 * 
 * @param initialState - état initial du Magasin en question
 * @returns Un Store entièrement configuré
 */
export const createStore = <T,>(initialState: T): Store<T> => {
  const initalDispatch: Dispatch<Action<T>> =  (_a: Action<T>) => {}
  const Context = createContext({state: initialState, dispatch: initalDispatch});
  const reducer = (state: T, action: Action<T>): T => {
    return action(state)
  }

  const Provider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
  
    return (
    <Context.Provider value={{state, dispatch}}>
      {children}
    </Context.Provider>
    )
  }
  
  return {
    useStore: () => useContext(Context),
    StoreProvider: Provider
  }
}
