import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

// checkbox와 label을 렌더링하는 투두 하나!
export default function Todo({ item, deleteItem, updateItem }) {
  // console.log(item);
  const [todoItem, setTodoItem] = useState(item);
  const { id, title, done } = todoItem;
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  // title 클릭하면 readOnly를 false 변경 (수정 가능하도록!!)
  const offReadOnlyMode = () => {
    setReadOnly(false);
  };

  // title 수정
  const editEventHandler = (e) => {
    const { title, ...rest } = todoItem;

    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  // Enter 키 누르면 readOnly true 변경
  const editKeyEventHandler = (e) => {
    if (e.key === 'Enter') {
      setReadOnly(true);
      updateItem(todoItem); // Enter 키 누르면 저장
    }
  };

  // checkbox 상태 업데이트
  const checkboxEventHandler = (e) => {
    // console.log(e);
    const { done, ...rest } = todoItem;
    const updatedItem = {
      done: e.target.checked,
      ...rest,
    };
    setTodoItem(updatedItem);
    updateItem(updatedItem); // checkbox 변경 시 저장
  };

  return (
    <div>
      <input
        type="checkbox"
        name={`todo${id}`}
        id={`todo${id}`}
        defaultChecked={done}
        onChange={checkboxEventHandler}
      />
      {/* <label htmlFor={`todo${id}`}>{title}</label> */}
      <input
        type="test"
        value={todoItem.title}
        readOnly={readOnly}
        onClick={offReadOnlyMode}
        onChange={editEventHandler}
        onKeyDown={editKeyEventHandler}
      />
      <Button variant="outline-dark" size="sm" onClick={onDeleteButtonClick}>
        DELETE
      </Button>
    </div>
  );
}
