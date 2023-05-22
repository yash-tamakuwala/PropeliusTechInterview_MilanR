import {
  TodoListStateType,
  TodoType,
  add,
  edit,
  remove,
} from "@/redux/slices/todoSlice";
import { RootState } from "@/redux/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ToDo = ({ todo }: { todo: TodoType }) => {
  const editInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveTodo = () => {
    dispatch(remove(todo.id));
  };

  const handleSaveTodo = () => {
    if (!editInputRef.current) return;

    const todoToBeEdited = editInputRef.current.value;
    dispatch(edit({ id: todo.id, data: todoToBeEdited }));

    setIsEditing(false);
  };

  return (
    <p>
      {!isEditing ? (
        <>
          {todo.id} : {todo.data}
          <button onClick={handleRemoveTodo}>Remove</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      ) : (
        <>
          {todo.id} : <input ref={editInputRef} defaultValue={todo.data} />
          <button onClick={handleSaveTodo}>Save</button>
        </>
      )}
    </p>
  );
};

const TODOList = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const todoList = useSelector<RootState, TodoListStateType>(
    (state) => state.todo || []
  );

  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!inputRef.current) return;

    const todoToBeAdded = inputRef.current.value;
    dispatch(add(todoToBeAdded));
    inputRef.current.value = "";
  };

  return (
    <>
      <input type="text" ref={inputRef} />
      <button onClick={handleAddTodo}>Add</button>
      <br />
      list:
      {todoList.map((todo) => (
        <div key={todo.id}>
          <ToDo todo={todo} />
        </div>
      ))}
    </>
  );
};

export default function Home() {
  return <TODOList />;
}
