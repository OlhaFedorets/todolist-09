import {RootState} from "../app/store.ts";
import {Todolist} from "../app/AppWithRedux.tsx";

export const selectTodolists = (state: RootState): Todolist[] => state.todolists