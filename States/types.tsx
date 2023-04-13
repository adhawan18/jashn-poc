// types.ts
import { StateType as loginState } from './loginStates';
import { StateType as agoraStates } from './agoraStates';
import { StateType as mainGameStates } from './mainGameStates';


export interface RootState {
  loginReducer: loginState;
  agoraReducer: agoraStates;
  mainGameReducer: mainGameStates;
}
