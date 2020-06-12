import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';


const Comment = ({ comment, index }) => {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title><strong>{comment.commenter}</strong></Card.Title>
          <Card.Subtitle>{comment.body}</Card.Subtitle>
          <Card.Text>Posted on {moment(comment.created_at).format("MMMM Do, YYYY [at] h:mmA")}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Comment;
