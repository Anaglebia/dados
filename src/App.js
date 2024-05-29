import Adicionar from './Components/Adicionar';
import Header from './Components/Header';
import Tasks from './Components/Tasks';

import '.././src/index.css';
import { useState, useEffect } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function App() {
    // All States
    const [loading, setloading] = useState(true); // Pré-carregador antes da renderização da página
    const [tasks, setTasks] = useState([]); // Task State
    const [showAddTask, setShowAddTask] = useState(false); // Para revelar o formulário de adição de tarefa
    // Pre-loader
    useEffect(() => {
        setTimeout(() => {
            setloading(false);
        }, 3500);
    }, [])
    // Buscando do armazenamento local
    const getTasks = JSON.parse(localStorage.getItem("taskAdded"));
    useEffect(() => {
        if (getTasks == null) {
            setTasks([])
        } else {
            setTasks(getTasks);
        }
    }, [])
    // Adicionar
    const addTask = (task) => {
        const id = uuidv4();
        const newTask = { id, ...task }
        setTasks([...tasks, newTask]);
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'Agendamento salvo com sucesso!'
        })
        localStorage.setItem("taskAdded", JSON.stringify([...tasks, newTask]));
    }
    // Excluir
    const deleteTask = (id) => {
        const deleteTask = tasks.filter((task) => task.id !== id);
        setTasks(deleteTask);
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'Agendamento cancelado com sucesso!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(deleteTask));
    }
    // Editar
    const editTask = (id) => {
        const text = prompt("Nome");
        const day = prompt("Data");
        const especialidade = prompt("Especialidade");
        const clinica = prompt("Clinica");
      
      
        let data = JSON.parse(localStorage.getItem('taskAdded'));
        const myData = data.map(x => {
            if (x.id === id) {
                return {
                    ...x,
                    text: text,
                    day: day,
                    especialidade: especialidade,
                    clinica: clinica,
                    id: uuidv4()
                }
            }
            return x;
        })
        Swal.fire({
            icon: 'success',
            title: 'Yay...',
            text: 'Agendamento editado com sucesso!'
        })
        localStorage.setItem("taskAdded", JSON.stringify(myData));
        window.location.reload();
    }
    return (
        <>
            {
                loading ?
                    <div className="spinnerContainer">
                        <div className="spinner-grow text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div> :
                    <div className="container">
                        {/* App Header that has open and App Name */}
                        <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask} />
                        {/* Revealing of Add Task Form */}
                        {showAddTask && <Adicionar onSave={addTask} />}
                        {/* Task Counter */}
                        <h3>Total de agendamentos: {tasks.length}</h3>
                        {/* Displaying of Tasks */}
                        {
                            tasks.length > 0 ?
                                (<Tasks tasks={tasks} onDelete={deleteTask} onEdit={editTask} />) :
                                ('Nenhuma consulta marcada!')
                        }
                    </div>
            }
        </>
    )
}
export default App;