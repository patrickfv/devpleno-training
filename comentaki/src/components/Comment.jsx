import React from 'react'
import { Segment } from 'semantic-ui-react'

function Comment({ comment }) {
    return (
      <Segment.Group piled>
        <Segment>Comment: { comment.content }</Segment>
      </Segment.Group>
    )
}

export default Comment
