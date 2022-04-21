const postForm = document.querySelector('.postForm');
const commentForm = document.querySelector('.commentForm');

const handlePost = async (event) => {
  event.preventDefault();
  
  const title = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();
  console.log(name + postContent)

  if (title && postContent) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, postContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Something went wrong');
    }
  }
};

const handleComment = async (event) => {
  event.preventDefault();

  const comments = document.querySelector('#comment').value.trim();
  const postId = document.querySelector('data-post-id');
  console.log("post id is " + postId)

  if (comments) {

      const response = await fetch(`/api/comments/`, {
          method: 'POST',
          body: JSON.stringify({ postId, comments }),
          headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {

          document.location.replace('/');
      } else {
          alert(response.statusText);
      }
  }
};

const handleDelete = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/dashboard/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Something went wrong');
    }
  }
};

if (postForm){
  postForm.addEventListener('submit', handlePost);
}

if (commentForm){
  commentForm.addEventListener('submit', handleComment);
}
