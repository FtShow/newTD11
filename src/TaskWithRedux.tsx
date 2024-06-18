import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type TaskPropsType = {
    taskId: string
    todoListId: string
    // changeTaskStatus: (id: string, isDone: boolean) => void
    // changeTaskTitle: (taskId: string, newTitle: string) => void
    // removeTask: (taskId: string) => void
}

export const TaskWithRedux: React.FC<TaskPropsType> = memo(({taskId, todoListId}) => {
    //const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todoListId].find(t=> t.id === taskId) as TaskType)
    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(taskId, todoListId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(newIsDoneValue, todoListId, taskId ));
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(newValue, todoListId, taskId))
    }

    return (
        <div key={taskId} className={taskId.isDone ? "is-done" : ""}>
            <Checkbox
                checked={taskId.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={taskId.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>)

})
