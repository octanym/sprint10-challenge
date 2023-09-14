import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveClockwise, moveCounterClockwise } from '../state/action-creators';

export default function Wheel() {
  const wheel = useSelector((state) => state.wheel);
  const dispatch = useDispatch();

  return (
    <div id="wrapper">
      <div id="wheel">
        <div
          className={wheel === 0 ? 'cog active' : 'cog'}
          style={{ '--i': 0 }}
        >
          {wheel === 0 ? 'B' : null}
        </div>
        <div
          className={wheel === 1 ? 'cog active' : 'cog'}
          style={{ '--i': 1 }}
        >
          {wheel === 1 ? 'B' : null}
        </div>
        <div
          className={wheel === 2 ? 'cog active' : 'cog'}
          style={{ '--i': 2 }}
        >
          {wheel === 2 ? 'B' : null}
        </div>
        <div
          className={wheel === 3 ? 'cog active' : 'cog'}
          style={{ '--i': 3 }}
        >
          {wheel === 3 ? 'B' : null}
        </div>
        <div
          className={wheel === 4 ? 'cog active' : 'cog'}
          style={{ '--i': 4 }}
        >
          {wheel === 4 ? 'B' : null}
        </div>
        <div
          className={wheel === 5 ? 'cog active' : 'cog'}
          style={{ '--i': 5 }}
        >
          {wheel === 5 ? 'B' : null}
        </div>
        {/* --i is a custom CSS property, no need to touch that nor the style object */}
      </div>
      <div id="keypad">
        <button
          onClick={() => dispatch(moveCounterClockwise())}
          id="counterClockwiseBtn"
        >
          Counter clockwise
        </button>
        <button onClick={() => dispatch(moveClockwise())} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}
