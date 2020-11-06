import React from "react";
import "./TodoListItem.scss";
import { Button } from "../Button";
import { cx } from "../../Utils";

const TodoListItem = ({ value, done, onDeleteTodo, onToggleDone }) => (
  <div className={cx('todo-list-item', done && 'todo-list-item--done')}>
    <span className="todo-list-item__text">{value}</span>
    <Button className="btn-outline-danger" onClick={onDeleteTodo}>
      <i className="fas fa-trash-alt"></i>
    </Button>
    <Button className="btn-outline-success" onClick={onToggleDone}>
      <i className="fas fa-check-double"></i>
    </Button>
  </div>
);

export { TodoListItem };
