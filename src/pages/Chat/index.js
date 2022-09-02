import { SmileOutlined } from '@ant-design/icons'
import { List, Tooltip, Comment, Card, Input, Button } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SOCKET } from '../../util/constants'
import styles from './chat.module.css'
import moment from 'moment'

const Chat = () => {
  const { firstName, lastName, email } = useSelector(state => state.auth)
  const { socket, chats } = useSelector(state => state.chat)
  const [message, setMessage] = useState('')
  const sendMessage = () => {
    socket.emit(SOCKET.SEND_MESSAGE, {
      author: email,
      firstName,
      lastName,
      message,
      datetime: moment().calendar(),
      avatar: 'https://joeschmoe.io/api/v1/random'
    })
    setMessage('')
  }

  return (
    <React.Fragment>
      <Card className={styles.container}>
        <List
          className='comment-list'
          header={``}
          itemLayout='horizontal'
          dataSource={chats['dixit@gmail.com']}
          renderItem={item => (
            <li>
              <Comment
                author={item.firstName + ' ' + item.lastName}
                avatar={item.avatar}
                content={item.message}
                datetime={
                  <Tooltip title={moment().calendar()}>
                    <span>{item.datetime}</span>
                  </Tooltip>
                }
              />
            </li>
          )}
        />
      </Card>
      <Card>
        <Input.Group>
          <Tooltip title='copy git url'>
            <Button icon={<SmileOutlined />} />
          </Tooltip>
          <Input
            autoFocus
            value={message}
            onChange={e => setMessage(e.target.value)}
            onPressEnter={() => sendMessage()}
            style={{ width: 'calc(100% - 40px)' }}
            placeholder='Type message here...'
          />
        </Input.Group>
      </Card>
    </React.Fragment>
  )
}

export default Chat
