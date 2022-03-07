import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  return (
    <div className="App">
      <h1>Welcome Your ToDo Panel</h1>
      <TodoForm/>
      <TodoList/>
    </div>
  );
}

export default App;
