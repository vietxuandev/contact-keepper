import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator');
    if (ele) {
      // fade out
      ele.classList.add('available');
      setTimeout(() => {
        // remove from DOM
        const ele = document.getElementById('ipl-progress-indicator');
        if (ele) {
          ele.outerHTML = '';
        }
      }, 2000);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>About this App</h1>
      <p className='my-1'>This is full stack React app for keeping contacts</p>
      <p className='bg-dark p'>
        <strong>Version: </strong>1.0.0
      </p>
    </div>
  );
};

export default About;
