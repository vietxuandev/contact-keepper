import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () => {
  const [room, setRoom] = useState('');

  return (
    <div>
      <input
        placeholder='Type a room name...'
        type='text'
        onChange={(evt) => setRoom(evt.target.value)}
      />
      <Link
        onClick={(evt) => (!room ? evt.preventDefault() : null)}
        to={`/chat?room=${room}`}
      >
        <button className='btn btn-primary btn-block' type='submit'>
          Join
        </button>
      </Link>
    </div>
  );
};

export default Join;
