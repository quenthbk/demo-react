import { createContext, FC, useContext, useReducer } from "react"

/**
 * Création d'un Store complet pour l'application et retourne un objet contenant
 *  les attributs suivants :
 *  - context : Le context React
 *  - consumer : Le consumer React
 *  - useStore : Un Hook permettant d'utiliser le magasin
 *  - reducer : Le reducer utilisé pour l'éxécution des actions
 *  - StoreProvider : un objet JSX qui englobera les composants enfant utilisant le magasin
 * 
 * @param initialState - état initial du Magasin en question
 * @returns Un objet contenant les cara
 */
export const createStoreContext = <T,>(initialState: T) => {
  const Context = createContext({state: initialState, dispatch: (_action: (state: T) => T) => {}});
  const reducer = (state: T, action:(state: T) => T): T => {
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
    context: Context,
    consumer: Context.Consumer,
    useStore: () => useContext(Context),
    reducer: reducer,
    StoreProvider: Provider
  }
}
