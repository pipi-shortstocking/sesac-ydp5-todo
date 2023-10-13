// import './App.css';
import { useState } from 'react';
import AddTodo from './components/AddTodo';
import Todo from './components/Todo';

function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: 'my todo1',
      done: false,
    },
    {
      id: 2,
      title: 'my todo2',
      done: false,
    },
    {
      id: 3,
      title: 'my todo3',
      done: true,
    },
    {
      id: 4,
      title: '백엔드 프로젝트 완성해오기',
      done: false,
    },
  ]);

  // todoItems 상태에 새로운 투두를 추가하는 일
  const addItem = (newItem) => {
    console.log(newItem); // { title: '저녁먹기' }
    console.log(todoItems.length);

    // newItem: { id: 5, title: '저녁먹기', done: false }
    newItem.id = todoItems[todoItems.length - 1].id + 1;
    // newItem.id = todoItems.length + 1;
    newItem.done = false;

    // todoItems 배열에 newItem을 추가
    setTodoItems([...todoItems, newItem]);
  };

  // todoItems 상태에 특정 투두를 삭제하는 일
  const deleteItem = (deleteId) => {
    const resetItem = todoItems.filter((item) => item.id !== deleteId);

    setTodoItems(resetItem);
  };

  return (
    <div className="App">
      <AddTodo addItem={addItem} />
      {/* todoItems 반복, props 데이터(투두 객체)를 각자 자식 컴포넌트에게 전달 */}
      {todoItems.map((item) => (
        <Todo key={item.id} item={item} deleteItem={deleteItem} />
      ))}
    </div>
  );
}

export default App;
