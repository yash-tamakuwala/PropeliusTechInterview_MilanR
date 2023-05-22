import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TodoType = {
  id: string;
  data: string;
};

export type TodoListStateType = Array<TodoType>;

export const todoSlice = createSlice({
  name: "todo",
  initialState: [] as TodoListStateType,
  reducers: {
    add: (state, action: PayloadAction<string>) => {
      const randomId = new Date().toISOString();
      return state.concat({ id: randomId, data: action.payload });
    },

    remove: (state, action: PayloadAction<string>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },

    edit: (state, action: PayloadAction<TodoType>) => {
      const todoIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      state[todoIndex] = action.payload;
      return state;
    },
  },
});

export const { add, remove, edit } = todoSlice.actions;

export default todoSlice.reducer;
