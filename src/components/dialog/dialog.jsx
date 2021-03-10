import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import {SearchOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import { Empty } from 'antd';

import {DialogItem} from '..';

const Dialog = ({items, userId, onSearch, onSelect, currentDialogId}) => {
    
    return (
        <div>
            <div className="search-dialog">
                <SearchOutlined />
                <Input onChange={(e) => onSearch(e.target.value)} placeholder="Введите текст сообщения…" type="text"/>
            </div>    
            <div  className="base-dialogs">
                {orderBy(items, ["created_ad"], ["desc"]).map(dialog => {
                    
                    return (
                    <DialogItem  
                        onSelect={onSelect}
                        id={dialog._id}
                        userId={userId}
                        currentDialogId={currentDialogId}
                        userName={userId !== dialog.author._id ? dialog.author.fullname : dialog.partner.fullname}
                        user={userId !== dialog.author._id ? dialog.author : dialog.partner}
                        lastMessage={dialog.lastMessage}
                        date={dialog?.lastMessage?.createdAt}
                        
                        isMe={userId === dialog?.lastMessage?.user._id}
                        />
                )})}

            {items.length === 0 &&
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
            }
            </div>
        </div>
    );
};

Dialog.defaultProps = {
    items: {},
};
  
Dialog.propTypes = {
    items: PropTypes.array,
};


export default Dialog;