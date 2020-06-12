import React from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Comments = ({ article }) => {
  const comments = article.comments
  if (!comments) return (<div><h3>Comments (0)</h3><Link to="#">New Comment</Link></div>);

  // Sort comments by date/title (newest ones listed first)
  const sortedComments = comments.sort((a, b) => (a.created_at < b.created_at) ? 1 : (a.created_at === b.created_at) ? ((a.commenter < b.commenter) ? 1 : -1) : -1 )

  const commentsList = sortedComments.map(
    (comment, index) => <li key={comment.id}><Comment comment={comment} index={index}/></li>);

  return (
    <div>
      <h3>Comments ({article.comments.length})</h3>
      <Link to="#">New Comment</Link>

      <ul>{commentsList}</ul>

    </div>
  );
} // end Comments

export default Comments;
