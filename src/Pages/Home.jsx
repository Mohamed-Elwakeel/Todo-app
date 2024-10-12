import React from "react";
import TaskCard from "../Components/TaskCard/TaskCard";
import AddTask from "../Components/AddTask/AddTask";


export default function HomePage() {

    return (
        <div className="app-container">
            <div className="todoCard">
                <AddTask />
                <div className="task-list">
                    <TaskCard />
                </div>
            </div>
            <div className="appInfo">
                <div>Created with: React JS, Material UI, and CSS</div>
                <div>Coded by: Mohamed Elwakeel</div>
            </div>
        </div>
    );
}
