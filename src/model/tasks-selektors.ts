import {RootState} from "../app/store.ts";
import {TasksState} from "../app/AppWithRedux.tsx";

export const selectTasks = (state: RootState): TasksState => state.tasks