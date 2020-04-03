import React, { useContext } from 'react';
import AlertCotext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertCotext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className='fa fa-infor'></i>
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
