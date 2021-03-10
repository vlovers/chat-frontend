import React from 'react';
import PropTypes from 'prop-types';

import readed from '../../assets/img/readed.svg';
import noReaded from '../../assets/img/no-readed.svg';

const IconReaded = ({isMe, isReaded}) => {

    
    return (
        <>
            {isMe && isReaded ?
                <img className="readed" src={readed} alt='readed'/> 
                : 
                isMe && !isReaded && <img className="noReaded" src={noReaded} alt='readed'/>}
        </>
    );
};
  
IconReaded.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
};


export default IconReaded;