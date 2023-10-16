import './App.css';
import { useEffect, useState } from 'react';
import AddTodo from './Components/AddTodo';
import Todo from './Components/Todo';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {
  // console.log(process.env.REACT_APP_DB_HOST);
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_DB_HOST}/todos`);
      setTodoItems(res.data);
    };

    getTodos();
  }, []);

  // todoItems 상태에 새로운 투두를 추가하는 일
  const addItem = async (newItem) => {
    // console.log(newItem); // { title: '저녁먹기' }
    // console.log(todoItems.length);
    // // newItem: { id: 5, title: '저녁먹기', done: false }
    // // newItem.id = todoItems[todoItems.length - 1].id + 1;
    // newItem.id = todoItems.length + 1;
    // newItem.done = false;
    // console.log(newItem);
    // // todoItems 배열에 newItem을 추가
    // setTodoItems([...todoItems, newItem]);

    const res = await axios.post(
      `${process.env.REACT_APP_DB_HOST}/todo`,
      newItem
    );
    // console.log(res);
    setTodoItems([...todoItems, res.data]);
  };

  // todoItems 상태에 특정 투두를 삭제하는 일
  const deleteItem = async (targetItem) => {
    // 백에서 없애기
    await axios.delete(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`
    );

    // 프론트에서 없애기
    const newTodoItems = todoItems.filter((item) => item.id !== targetItem.id);
    setTodoItems(newTodoItems);
  };

  const updateItem = async (targetItem) => {
    await axios.patch(
      `${process.env.REACT_APP_DB_HOST}/todo/${targetItem.id}`,
      targetItem
    ); // axios.patch('url',{})
  };

  // 현재 Todo 개수
  const doneCnt = todoItems.filter((item) => item.done === true);
  const total = todoItems.length;

  // console.log('비율 >> ', doneCnt.length / total);

  return (
    <div className="App">
      <div className="Cnt">
        <h1>TODO LIST</h1>
        <span>남은 Todo 개수: {total - doneCnt.length}</span>
      </div>
      <ProgressBar
        now={`${(doneCnt.length / total) * 100}`}
        label={`${Math.ceil((doneCnt.length / total) * 100)}%`}
      />
      <br></br>
      <AddTodo addItem={addItem} />
      <br></br>
      {/* todoItems 반복, props 데이터(투두 객체)를 각자 자식 컴포넌트에게 전달 */}
      {todoItems.map((item) => (
        <Todo
          key={item.id}
          item={item}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      ))}
    </div>
  );
}

export default App;
