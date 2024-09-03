import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.css"

const TaskList = ({ tasks, updateTask, deleteTask }) => {

  return (
    <div className="taskList">
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <li>No tasks available</li>
        )}
      </ul>
    </div>
  );
};

export default TaskList;
