// types.ts
import { StateType as loginState } from './loginStates';
import { StateType as agoraStates } from './agoraStates';
import { StateType as mainGameStates } from './mainGameStates';
import { StateType as navigationStates } from './navigationStates';


export interface RootState {
  loginReducer: loginState;
  agoraReducer: agoraStates;
  mainGameReducer: mainGameStates;
  navigationReducer: navigationStates;
}
