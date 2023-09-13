import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postAnswer, selectAnswer, fetchQuiz } from '../state/action-creators';

export default function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz);
  const selectedAnswer = useSelector((state) => state.selectedAnswer);

  let quiz_id = quiz?.data?.quiz_id;

  useEffect(() => {
    if (!quiz) {
      dispatch(fetchQuiz(quiz));
    }
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.data.question}</h2>

            <div id="quizAnswers">
              <div
                className={
                  selectedAnswer === quiz.data.answers[0].answer_id
                    ? 'answer selected'
                    : 'answer'
                }
              >
                {quiz.data.answers[0].text}
                <button
                  onClick={() =>
                    dispatch(selectAnswer(quiz.data.answers[0].answer_id))
                  }
                >
                  {selectedAnswer === quiz.data.answers[0].answer_id
                    ? 'SELECTED'
                    : 'selected'}
                </button>
              </div>

              <div
                className={
                  selectedAnswer === quiz.data.answers[1].answer_id
                    ? 'answer selected'
                    : 'answer'
                }
              >
                {quiz.data.answers[1].text}
                <button
                  onClick={() =>
                    dispatch(selectAnswer(quiz.data.answers[1].answer_id))
                  }
                >
                  {selectedAnswer === quiz.data.answers[1].answer_id
                    ? 'SELECTED'
                    : 'selected'}
                </button>
              </div>
            </div>

            <button
              onClick={() => dispatch(postAnswer({ quiz_id, selectedAnswer }))}
              disabled={!selectedAnswer}
              id="submitAnswerBtn"
            >
              Submit answer
            </button>
          </>
        ) : (
          'Loading next quiz...'
        )
      }
    </div>
  );
}
