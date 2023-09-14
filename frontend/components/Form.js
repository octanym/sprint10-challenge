import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postQuiz, inputChange } from '../state/action-creators';

export default function Form() {
  const dispatch = useDispatch();

  const form = useSelector((state) => state.form);

  const onChange = (evt) => {
    dispatch(inputChange({ ...form, [evt.target.id]: evt.target.value }));
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postQuiz(form));
  };

  const valid =
    form.newQuestion.trim().length > 0 &&
    form.newTrueAnswer.trim().length > 0 &&
    form.newFalseAnswer.trim().length > 0;

  console.log(valid);

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newQuestion}
        id="newQuestion"
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newTrueAnswer}
        id="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        value={form.newFalseAnswer}
        id="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!valid}>
        Submit new quiz
      </button>
    </form>
  );
}
