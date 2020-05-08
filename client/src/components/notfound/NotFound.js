import React, { useEffect } from 'react';
import './style.scss';

const NotFound = () => {
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
    <div className='not-found-wrapper'>
      <h1 className='nf-page-title'>404</h1>
      <p>It looks like nothing was found at this location.</p>
    </div>
  );
};

export default NotFound;
