import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type SpanType = {
  title: string;
  changeTitleValue: (title: string) => void;
};
export const EditableSpan = React.memo((props: SpanType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const viewMode = () => {
    setEditMode(false);
    props.changeTitleValue(title);
  };
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  return editMode ? (
    <TextField variant="standard" color="secondary" title="Type text" type='text' value={title} onChange={onChangeTitle} autoFocus onBlur={viewMode} className='changedInput' inputProps={{maxLength: 100}}/>
  ) : (
    <span onDoubleClick={activateEditMode} className='spanText'>{props.title}</span>
  );
});
