import { createContext, Context, FC, useContext, useReducer } from "react"
import { Action, MutableAction, Store, StoreContext } from "./store";
import { produce as immerProduce } from 'immer'

/**
 * Création d'un Store complet pour l'application
 * 
 * @param initialState - état initial du Magasin en question
 * @returns Un Store entièrement configuré
 */
export const createStore = <T,>(initialState: T): Store<T> => {
  const Context: Context<StoreContext<T>> = createContext(
    {
      state: initialState, 
      dispatch: (_a: Action<T>) => {},
      produce: (_a: MutableAction<T>) => {}
    }
  );
  // Création d'un reducer avec la fonction produce d'immer, plus d'info : https://immerjs.github.io/immer/produce
  const reducer = (state: T, action: Action<T>): T => (action(state))

  const Provider: FC = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const produce = (action: MutableAction<T>) => dispatch((state) => immerProduce(state, (draft) => action(draft, state)))
  
    return (
    <Context.Provider value={{state, dispatch, produce}}>
      {children}
    </Context.Provider>
    )
  }
  
  return {
    useStore: () => useContext(Context),
    StoreProvider: Provider
  }
}

export default createStore
