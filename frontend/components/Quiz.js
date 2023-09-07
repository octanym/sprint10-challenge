import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswer, fetchQuiz } from '../state/action-creators';

export default function Quiz() {
  const quiz = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  console.log(quiz);

  useEffect(() => {
    dispatch(fetchQuiz());
  }, []);

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>What is a closure?</h2>

            <div id="quizAnswers">
              <div className="answer selected">
                A function
                <button>SELECTED</button>
              </div>

              <div className="answer">
                An elephant
                <button>Select</button>
              </div>
            </div>

            <button id="submitAnswerBtn">Submit answer</button>
          </>
        ) : (
          'Loading next quiz...'
        )
      }
    </div>
  );
}
