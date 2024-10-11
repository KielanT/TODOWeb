"use client"; 
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../modal.css"
import { Task }  from "../types/interfaces"




interface TaskProps
{
    closeModal: () => void;
    task: Task;
    OnTaskDescUpdate: (newDesc: string) => void;
    OnTaskDateUpdate: (newDate: Date) => void;
}

interface TaskState{
    taskDesc: string;
    dueDate: Date;

}

export default class Modal extends React.Component<TaskProps, TaskState>
{
    constructor(props: TaskProps)
    {
        super(props);
        this.state = {taskDesc: props.task.taskDesc, dueDate: props.task.dueDate};
    }

    componentDidUpdate(prevProps: TaskProps) {
        if (prevProps.task.taskDesc !== this.props.task.taskDesc) {
            this.setState({ taskDesc: this.props.task.taskDesc });
        }

        if (prevProps.task.dueDate  !== this.props.task.dueDate ) {
            this.setState({ dueDate : this.props.task.dueDate  });
        }
    }

    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDesc = e.target.value;
        this.setState({taskDesc: newDesc});
        this.props.OnTaskDescUpdate(newDesc);
    };

    handleDateChange = (date: Date | null) =>
    {
        if(date){
            this.setState({dueDate: date});
            this.props.OnTaskDateUpdate(date);
        }
    }

    render()
    {
        const { task } = this.props;

        return(
            <div className='task-modal'>
                <button className='close-button' onClick={this.props.closeModal}>X</button>
                <h1>{task.name}</h1>
                <h2>Description</h2>
                <textarea className="task-desc-input" value={this.state.taskDesc} onChange={this.handleInputChange}/>
                <DatePicker selected={this.state.dueDate} onChange={this.handleDateChange} dateFormat={"dd/MM/yyyy"}/>
            </div>
        );
    }
}