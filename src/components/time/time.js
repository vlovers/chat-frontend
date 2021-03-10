import React from 'react';
import PropTypes from 'prop-types';
import {formatDistanceToNow} from 'date-fns';
import ruLocal from 'date-fns/locale/ru';


const Time = ({date}) => {
    
    return (
        <>
            {formatDistanceToNow(new Date(date), { addSuffix: true, locale: ruLocal})}
        </>
    );
};
  
Time.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
};


export default Time;