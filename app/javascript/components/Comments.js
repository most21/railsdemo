import React from 'react';

const Comments = ({ article }) => {
  const comments = article.comments
  if (!comments) return (<div><h3>Comments (0)</h3></div>);

  const commentsList = comments.map(
    (comment) => <li key={comment.id}><strong>{comment.commenter}:</strong> {comment.body}</li>);

  return (
    <div>
      <h3>Comments ({article.comments.length})</h3>
      <ul>{commentsList}</ul>
    </div>
  );
} // end Comments

export default Comments;
