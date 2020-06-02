import React from 'react';

const Comment = ({ comment }) => {
  <div>
    <ul>
      <li>{comment.commenter}</li>
    </ul>
  </div>
} // end Comment

const Comments = ({ article }) => {
  const comments = article.comments
  console.log(comments[0])
  const commentsList = comments.map((comment) => <li key={comment.id}><strong>{comment.commenter}:</strong> {comment.body}</li>);
  console.log(commentsList[0])

  return (
    <div>
      <h3>Comments ({article.comments.length})</h3>
      <ul>{commentsList}</ul>
    </div>
  );
} // end Comments

export default Comments;
