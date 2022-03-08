import './App.css';
import EditTodo from './components/EditTodo';
import TodoForm from './components/TodoForm';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>Welcome Your ToDo Panel</h1>
      <Routes>
        <Route path="/" element={<TodoForm/>} />
        <Route path="/editToDo/:id" element={<EditTodo/>} />
      </Routes>
    </div>
  );
}

export default App;
