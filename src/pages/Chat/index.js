import { SmileOutlined } from '@ant-design/icons'
import {
  List,
  Tooltip,
  Comment,
  Card,
  Input,
  Button,
  Row,
  Col,
  Menu
} from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { SOCKET } from '../../util/constants'
import styles from './chat.module.css'
import moment from 'moment'
import { useEffect } from 'react'
import { getPharmacists } from '../../redux/pharmacists'
import { useDispatch } from 'react-redux'

const Chat = () => {
  const dispatch = useDispatch()
  const [currentUser, setCurrentUser] = useState('')
  const { list } = useSelector(state => state.pharmacists)
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

  useEffect(() => {
    dispatch(getPharmacists())
  }, [])
  return (
    <React.Fragment>
      <Row>
        <Col xl={6} md={6} sm={24} xs={24}>
          <Menu theme='light' selectedKeys={[currentUser]} mode='inline'>
            {list.map((pharm, index) => (
              <Menu.Item
                key={pharm.email}
                onClick={() => setCurrentUser(pharm.email)}
                icon={
                  <img
                    src={`https://joeschmoe.io/api/v1/${
                      index % 3 === 0 ? 'joe' : 'jane'
                    }`}
                    width={26}
                  />
                }
              >
                {pharm.firstName + ' ' + pharm.lastName}
              </Menu.Item>
            ))}
          </Menu>
        </Col>
        <Col xl={18} md={18} sm={24} xs={24}>
          <Card className={styles.container}>
            <List
              className='comment-list'
              header={``}
              itemLayout='horizontal'
              dataSource={chats[currentUser]}
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
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default Chat
