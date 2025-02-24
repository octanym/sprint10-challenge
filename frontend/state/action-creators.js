import axios from 'axios';
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(data) {
  return { type: SET_SELECTED_ANSWER, payload: data };
}

export function setMessage(data) {
  return { type: SET_INFO_MESSAGE, payload: data };
}

export function setQuiz(data) {
  return { type: SET_QUIZ_INTO_STATE, payload: data };
}

export function inputChange(data) {
  return { type: INPUT_CHANGE, payload: data };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    dispatch(setQuiz(null));
    // On successful GET: Dispatch an action to send the obtained quiz to its state
    axios.get('http://localhost:9000/api/quiz/next').then((res) => {
      dispatch(setQuiz(res));
    });
  };
}
export function postAnswer(data) {
  return function (dispatch) {
    const answer = {
      quiz_id: data.quiz_id,
      answer_id: data.selectedAnswer,
    };
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/answer', answer).then((res) => {
      dispatch(selectAnswer(null));
      dispatch(setMessage(res.data.message));
      dispatch(fetchQuiz());
    });
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(data) {
  return function (dispatch) {
    const quiz = {
      question_text: data.newQuestion,
      true_answer_text: data.newTrueAnswer,
      false_answer_text: data.newFalseAnswer,
    };
    // On successful POST:
    axios.post('http://localhost:9000/api/quiz/new', quiz).then((res) => {
      console.log(res);
      dispatch(
        setMessage(`Congrats: "${res.data.question}" is a great question!`)
      );
      dispatch(resetForm());
    });
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  };
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
