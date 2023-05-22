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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "500px",
      }}
    >
      {!isEditing ? (
        <>
          <p>{todo.data}</p>

          <div>
            <button onClick={handleRemoveTodo}>Remove</button>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </>
      ) : (
        <>
          <input ref={editInputRef} defaultValue={todo.data} />
          <button onClick={handleSaveTodo}>Save</button>
        </>
      )}
    </div>
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
    <div className="m-5" style={{ width: "500px" }}>
      <div className="d-flex">
        <input type="text" ref={inputRef} className="form-control" />
        <button onClick={handleAddTodo} className="mx-4 btn btn-primary">
          Add
        </button>
      </div>

      <div className="mt-4">
        {todoList.map((todo) => (
          <div key={todo.id}>
            <ToDo todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  return <TODOList />;
}
