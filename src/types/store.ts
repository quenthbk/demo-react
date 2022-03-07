import { FC } from "react";

/**
 * The type of the action function. The function must be pure.
 */
export type Action<T> = (state: T) => T

/**
 * The Store Context
 */
export interface StoreContext<T> {
  /**
   * The state object of the Context.
   */
  state: T

  /**
   * The dispatch method to change the state of the context
   */
  dispatch: (action: Action<T>) => void;
}

export interface Store<T> {
  /**
   * The hook to use the Store. It must be used in React Components
   */
  useStore: () => StoreContext<T>

  /**
   * The provider that encompasses all components using useStore.
   */
   StoreProvider: FC<{}>
}
