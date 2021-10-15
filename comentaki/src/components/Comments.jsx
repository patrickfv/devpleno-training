import React from 'react'
import Comment from './Comment'
import { useDatabase } from '../auth'

function Comments() {
    const data = useDatabase('comments')

    if(data === null) return null

    const ids = Object.keys(data)

    return ids.map(id => <Comment key={id} comment={data[id]}/>)
}

export default Comments