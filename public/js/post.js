const postForm = document.querySelector('.postForm');
const commentForm = document.querySelector('.commentForm');
const delete_buttons = document.querySelectorAll('.deleteBtn');
const deletePost = document.querySelectorAll('#deletePostBtn');
const update_buttons = document.querySelectorAll('.updateForm');

const handlePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();

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

const handleUpdate = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();
  if (event.target.hasAttribute('post-id')) {
    const id = event.target.getAttribute('post-id');


    if (title && postContent) {
      console.log("post id: " + id)
      // console.log(title + " " + postContent)
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, postContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace(`/dashboard`);
      } else {
        alert('Something went wrong');
      }
    }
  }
};

const handleComment = async (event) => {
  event.preventDefault();

  const content = document.querySelector('#comment').value.trim();
  const post_id = event.target.getAttribute('data-post-id');

  if (content) {

    const response = await fetch(`/api/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({ post_id, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {

      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const handleDeletePost = async (event) => {
  // const id = event.target.getAttribute('data-id');
  // console.log("Post id: " + id)
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload('/dashboard');
    } else {
      alert('Something went wrong');
    }
  }
};

//TODO: add functionality for deleting a comment

if (postForm) {
  postForm.addEventListener('submit', handlePost);
}

if (commentForm) {
  commentForm.addEventListener('submit', handleComment);
}

delete_buttons.forEach((deletePost) => {

  deletePost.addEventListener('submit', handleDeletePost);

});

update_buttons.forEach((update) => {

  update.addEventListener('submit', handleUpdate);

});