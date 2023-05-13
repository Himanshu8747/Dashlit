import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteUserTodoService,
  updateUserTodoService
} from "../../firebase/functions/TodoActions";
import { getTodoList } from "../../redux/Actions/User.actions";
import Svg from "../common/Svg";

interface todo {
  todoId: string;
  todoName: string;
  checked: boolean;
}

const TodoComponent: React.FC<todo> = ({ todoId, todoName, checked }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [editTodo, setEditTodo] = React.useState(false);
  const [todoNameInput, setTodoNameInput] = React.useState(todoName);

  useEffect(() => {
    if (checked) setIsChecked(checked);
  }, []);

  const inputRef: any = useRef();

  const dispatch = useDispatch();

  const editHandler = () => {
    updateUserTodoService(todoId, todoNameInput, isChecked);
    dispatch(getTodoList());
  };

  const deleteHandler = () => {
    deleteUserTodoService(todoId);
    dispatch(getTodoList());
  };

  useEffect(() => {
    if (editTodo) inputRef.current.focus();
  }, [editTodo]);

  return (
    <div className="flex justify-between m-1 todo w-full items-center">
      <div className="flex items-center">
        <input
          className="border-0 duration-200 focus:outline-none mx-2 outline-none transition"
          onClick={() => {
            setIsChecked(!isChecked);
            setEditTodo(false);
          }}
          checked={isChecked}
          type="checkbox"
        />
        <div
          className={`break-all  text-white  font-medium w-full ${
            isChecked ? "line-through" : ""
          }`}>
          {editTodo === true ? (
            <input
              id="editTodo"
              className="bg-transparent focus:outline-none w-full text-lg"
              value={todoNameInput}
              ref={inputRef}
              onChange={e => {
                setTodoNameInput(e.target.value);
              }}
              onKeyPress={e => e.key === "Enter" && editHandler()}
            />
          ) : (
            <h1
              onClick={() => {
                setIsChecked(!isChecked);
                setEditTodo(false);
              }}
              className="cursor-pointer mr-4 text-white text-lg">
              {todoName}
            </h1>
          )}
        </div>
      </div>
      <div className="hidden tododelete">
        <div
          className="cursor-pointer"
          onClick={() => {
            setEditTodo(!editTodo);
          }}>
          <Svg type="editTodo" />
        </div>
        <div className="cursor-pointer mr-2" onClick={deleteHandler}>
          <Svg type="deleteTodoComponent" />
        </div>
      </div>
    </div>
  );
};

export default TodoComponent;

TodoComponent.propTypes = {
  todoId: PropTypes.string.isRequired,
  todoName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
};
