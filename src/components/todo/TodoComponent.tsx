import { Checkbox, Popconfirm, Popover, Tooltip } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { mutateDataHandler } from 'utils/demoapp.utils'
import {
  deleteUserTodoService,
  updateUserTodoService
} from '../../firebase/functions/TodoActions'
import { getTodoList } from '../../redux/Actions/User.actions'
import Svg from '../common/Svg'

interface todo {
  todoId: string
  todoName: string
  checked: boolean
}

const TodoComponent: React.FC<todo> = ({ todoId, todoName, checked }) => {
  const [isChecked, setIsChecked] = React.useState(false)
  const [editTodo, setEditTodo] = React.useState(false)
  const [todoNameInput, setTodoNameInput] = React.useState(todoName)

  useEffect(() => {
    if (checked) setIsChecked(checked)
  }, [])

  const inputRef: any = useRef()

  const dispatch = useDispatch()

  const editHandler = () => {
    updateUserTodoService(todoId, todoNameInput, isChecked)
    dispatch(getTodoList())
  }

  const deleteHandler = () => {
    deleteUserTodoService(todoId)
    dispatch(getTodoList())
  }

  useEffect(() => {
    if (editTodo) inputRef.current.focus()
  }, [editTodo])

  return (
    <div className="flex justify-between todo w-full items-center hover:bg-grey2 rounded-[6px]">
      <div className="flex items-center mr-2">
        <Checkbox
          className="border-0 duration-200 ml-2 focus:outline-none mr-2 outline-none transition cursor-pointer my-checkbox"
          onClick={() => {
            setIsChecked(!isChecked)
            setEditTodo(false)
          }}
          checked={isChecked}
        />
        <div
          className={`break-all  text-white  font-medium w-full ${
            isChecked ? 'line-through' : ''
          }`}
        >
          {editTodo === true ? (
            <input
              id="editTodo"
              className="bg-transparent focus:outline-none w-full text-lg"
              value={todoNameInput}
              ref={inputRef}
              onChange={(e) => {
                setTodoNameInput(e.target.value)
              }}
              onKeyPress={(e) => e.key === 'Enter' && editHandler()}
            />
          ) : (
            <h1
              onClick={() => {
                setIsChecked(!isChecked)
                setEditTodo(false)
              }}
              className="cursor-pointer mr-4 text-white text-lg"
            >
              <Tooltip title={todoName}>
                {todoName.length > 25
                  ? todoName.substring(0, 25) + '...'
                  : todoName}
              </Tooltip>
            </h1>
          )}
        </div>
      </div>
      <div className="hidden tododelete">
        <Popover
          content={
            <div>
              <h6
                onClick={() => setEditTodo(!editTodo)}
                className="font-bold cursor-pointer hover:bg-grey2 py-1 px-2 rounded-lg text-white hover:bg-grey2"
              >
                Edit
              </h6>
              <Popconfirm
                title="Are you sure to delete this todo?"
                onConfirm={() => mutateDataHandler(deleteHandler)}
                okText="Yes"
                cancelText="No"
              >
                <h1 className="font-bold cursor-pointer hover:bg-grey2 py-1 px-2 rounded-lg text-white hover:bg-grey2">
                  Delete
                </h1>
              </Popconfirm>
            </div>
          }
          trigger="hover"
        >
          <button className="focus:outline-none mx-2 text-white">
            <Svg type="dot-dot" />
          </button>
        </Popover>
      </div>
    </div>
  )
}

export default TodoComponent

TodoComponent.propTypes = {
  todoId: PropTypes.string.isRequired,
  todoName: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
}
