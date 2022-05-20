import { Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Link to='/' type='primary'>
          Back Home
        </Link>
      }
    />
  )
}

export default PageNotFound
