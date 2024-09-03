import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm/TaskForm';
import TaskList from './components/TaskList/TaskList';
import RegisterForm from './components/RegisterForm/RegisterForm';
import LoginForm from './components/LoginForm/LoginForm';
import LogoutButton from './components/LogoutButton/LogoutButton';
import API_BASE_URL from './config';
import "./App.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }

    const fetchTasks = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await axios.get(`${API_BASE_URL}/api/tasks`, config);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error.response.data.error);
        if (error.response.status === 401) {
          logout();
        }
      }
    };

    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const addTask = async (task) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(`${API_BASE_URL}/api/tasks`, task, config);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error.response.data.error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.put(`${API_BASE_URL}/api/tasks/${id}`, updatedTask, config);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task:', error.response.data.error);
    }
  };

  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, config);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.response.data.error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>Task Management Application</h1>
      {isAuthenticated ? (
        <>
          <TaskForm addTask={addTask} />
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
          <LogoutButton setIsAuthenticated={setIsAuthenticated} />
        </>
      ) : (
        <div className='login'>
          <RegisterForm setIsAuthenticated={setIsAuthenticated} />
          <LoginForm setIsAuthenticated={setIsAuthenticated} />
        </div>
      )}
    </div>
  );
}

export default App;