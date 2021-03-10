import React, {useState} from 'react';
import PropTypes from 'prop-types';

import { Icon, Button, Modal, Select, Input, Form } from 'antd';

import { 
    TeamOutlined,
    FormOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
  
const Sidebar = ({
    user,
    visible,
    inputValue,
    messageText,
    selectedUserId,
    isLoading,
    users,
    onShow,
    onClose,
    onSearch,
    onChangeInput,
    onSelectUser,
    onChangeTextArea,
    onModalOk,
  }) => {
    const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);
    // const options = [];


    return (
        <div className="side-bar__header">
            <div className="side-bar__header-title">
                <TeamOutlined />
                <p>Список диалогов</p>
            </div>
            <FormOutlined onClick={onShow}/>
            
            <Modal
                title="Создать диалог"
                visible={visible}
                onCancel={onClose}
                footer={[
                <Button key="back" onClick={onClose}>
                    Закрыть
                </Button>,
                <Button
                    disabled={!messageText}
                    key="submit"
                    type="primary"
                    loading={isLoading}
                    onClick={onModalOk}>
                    Создать
                </Button>,
                ]}>
                <Form className="add-dialog-form">
                <Form.Item label="Введите имя пользователя или E-Mail">
                    <Select
                    value={inputValue}
                    onSearch={onSearch}
                    onChange={onChangeInput}
                    onSelect={onSelectUser}
                    notFoundContent={null}
                    style={{ width: '100%' }}
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    placeholder="Введите имя пользователя или почту"
                    showSearch>
                    {options}
                    </Select>
                </Form.Item>
                {selectedUserId && (
                    <Form.Item label="Введите текст сообщения">
                    <TextArea
                        autosize={{ minRows: 3, maxRows: 10 }}
                        onChange={onChangeTextArea}
                        value={messageText}
                    />
                    </Form.Item>
                )}
                </Form>
            </Modal>
        </div>
    )
};

Sidebar.defaultProps = {
    items: {},
};
  
Sidebar.propTypes = {
    items: PropTypes.array,
};


export default Sidebar;