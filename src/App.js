import { TodosProvider } from './Contexts/TodoContext';
import { CreateTodo } from './Todos/CreateTodo';
import Todos from './Todos/Todos';

function App() {
  
  return (
    <>
      <TodosProvider>
          <CreateTodo />
          <Todos />
      </TodosProvider>
    </>
  );
}

export default App;
