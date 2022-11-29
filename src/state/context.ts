import React from 'react';
import {IAppState, initialAppState} from './state';
import {AppActions} from "./actions";

export const AppContext = React.createContext<{
  state: IAppState;
  dispatch: React.Dispatch<AppActions>;
}>({
  state: initialAppState,
  dispatch: () => undefined,
});
