# Simple React Store

## dependencies

This library use React and Immer.

More info here : https://github.com/immerjs/immer

## Usage

`createStore()` : Creation of a store with react native.

This function return an object : 
- StoreProvider : An React.FC, producer that allows to encompass the components. The components inside the producer can use the returned useStore.
- The useStore() hook

`mystore.ts`
```ts
// Create your initial State
const initialState: MyState = {
  bag: [],
  counter: 0
}

// init the store
const {useStore, StoreProvider} = createStore(initialState)

// Export your custom Store
export {useStore as useMyStore, StoreProvider as MyStoreProvider}
```

Now you can use it with like this : 

`MyMainComponent.tsx`
```tsx

/**
 * THe main component
 */
export const MyMainComponent = () => {
  return (
    <>
      <MyStoreProvider>
        {/* Components here can use the useMyStore hook */}
      </MyStoreProvider>
    </>
  )
}
```

Write your actions functions
`actions.ts`
```ts
/**
 * The function don't change the state directly.
 */
export const myPureAction = (add: number): Action<MyState> => {
  return (state: MyState): MyState => {
    return {
      ...state,
      counter: state.counter + add
    }
  }
}

/**
 * This function can change the state directly with the draft.
 *  The base is the immutable original state. (More info here : https://github.com/immerjs/immer)
 */
export const myMutableAction = (add: number): MutableAction<DragStoreState> => {
  return (draft: MyState, base: MyState) => {
    state.counter += add
  }
}
```

In all sub component :

`SubComponent.tsx`
```tsx
export const SubComponent: FC = () => {
  // Get the immatable state and the 2 function 
  const {state, dispatch, produce} = useDragStore()

  const handleUpdateState = () => {
    // You can use dispatch if your action function is Pure
    dispatch(myPureAction(5))

    // You can use produce if your action function change directly the value of the state's attributes
    produce(myMutableAction(5))
  }

  return (
    <>
    <div onClick={handleUpdateState}>
      Click On Me
    </div>
    </>
  )
}
```
