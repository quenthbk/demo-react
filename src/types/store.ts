import { Draft } from "immer";
import { FC } from "react";

/**
 * An immutable function. The function must be pure
 */
export type Action<T> = (state: T) => T

/**
 * A mutable function. The function can be impure
 * 
 * @param draft - the state that can be freely modified
 * @param base - the original state must be immutable
 */
export type MutableAction<T> = (draft: Draft<T>, base: T) => void

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

  /**
   * This function is similar to dispatch but accepts actions that change the state 
   *    without creating a new state.
   */
  produce: (action: MutableAction<T>) => void;
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
