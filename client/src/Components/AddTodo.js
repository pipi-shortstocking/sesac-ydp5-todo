import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, Form } from 'react-bootstrap';

export default function AddTodo({ addItem }) {
  const [todoItem, setTodoItem] = useState({
    title: '',
  });

  const onButtonClick = () => {
    addItem(todoItem);
    setTodoItem({ title: '' }); // input 초기화
  };

  return (
    <div>
      <InputGroup size="sm" className="New">
        <Form.Control
          placeholder="Add your new Todo"
          value={todoItem.title}
          onChange={(e) => setTodoItem({ title: e.target.value })}
        />
        <Button
          className="addBtn"
          size="sm"
          variant="outline-success"
          onClick={onButtonClick}
        >
          ADD
        </Button>
      </InputGroup>
    </div>
  );
}
