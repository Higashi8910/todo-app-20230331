import { useState } from "react";
import DatePicker from "react-datepicker";
import godImage from "/project/todo-fire/src/components/godImage.png";

import "react-datepicker/dist/react-datepicker.css";

const style = {
  backgroundColor: "#c1ffff",
  width: "800px",
  height: "30px",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px"
};

const inputStyle = {
  width: "87%" // ここで入力ボックスの幅を設定
};

const Dialog = (props) => {
  const [dialogText, setDialogText] = useState(props.initialText);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [priority, setPriority] = useState("小");

  const onChangeDialogText = (event) => setDialogText(event.target.value);

  const [count, setCount] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const onClickDialogAdd = () => {
    if (dialogText === "") {
      setCount(count + 1);
      if (count + 1 >= 10) {
        setShowImage(true);
      }
      return;
    }
    props.onClick(dialogText, startDate, endDate, priority);
    setDialogText("");
    props.onClose();
  };

  return (
    <div className="dialog">
      <input
        placeholder="TODOを入力"
        value={dialogText}
        onChange={onChangeDialogText}
      />
      <div>
        <label>開始日：</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>終了日：</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div>
        <label>優先度：</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="小">小</option>
          <option value="中">中</option>
          <option value="大">大</option>
        </select>
      </div>
      <button onClick={onClickDialogAdd}>追加</button>
      <button onClick={props.onClose}>キャンセル</button>
      {showImage && <img src={godImage} alt="God Image" />}
    </div>
  );
};

export const InputTodo = (props) => {
  const { todoText, setTodoText, onClick, disabled } = props;
  const [dialogOpen, setDialogOpen] = useState(false);

  const onClickAdd = (text, startDate, endDate, priority) => {
    props.onClick(text, startDate, endDate, priority);
    props.setTodoText("");
    setDialogOpen(false);
  };

  return (
    <div style={style}>
      {dialogOpen && (
        <Dialog
          onClick={onClickAdd}
          onClose={() => setDialogOpen(false)}
          initialText={todoText}
        />
      )}
      <input
        disabled={disabled}
        placeholder="TODOを入力"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        style={inputStyle}
      />
      {!dialogOpen && (
        <button
          disabled={disabled || !todoText}
          onClick={() => setDialogOpen(true)}
        >
          追加
        </button>
      )}
    </div>
  );
};
