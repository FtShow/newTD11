import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {ButtonMemo} from "./ButtonMemo";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType) => {
    console.log('Add todo')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.title])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let tasks = props.tasks;

    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.id, props.removeTask])
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => {
                props.changeTaskStatus(taskId, newIsDoneValue, props.id);
    }, [props.id, props.changeTaskStatus])
    const changeTaskTitle = useCallback((taskId: string, newValue: string) => {
        props.changeTaskTitle(taskId, newValue, props.id);
    }, [props.id, props.changeTaskTitle])
    // @ts-ignore
    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {



                    return <Task key={t.id}
                                 task={t}
                                 removeTask={removeTask}
                                 changeTaskStatus={changeTaskStatus}
                                 changeTaskTitle={changeTaskTitle}/>
                })
            }
        </div>
        <div style={{paddingTop: "10px"}}>
            <ButtonMemo
                callback={onAllClickHandler}
                color={'inherit'}
                title={"All"}
                variant={props.filter === 'all' ? 'outlined' : 'text'}
            />
            <ButtonMemo
                callback={onActiveClickHandler}
                color={'primary'}
                title={"Primary"}
                variant={props.filter === 'active' ? 'outlined' : 'text'}
            />
            <ButtonMemo
                callback={onCompletedClickHandler}
                color={'secondary'}
                title={"completed"}
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
            />

        </div>
    </div>
})


