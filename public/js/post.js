const handlePost = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#post-title').value.trim();
  const postContent = document.querySelector('#post-content').value.trim();

  if (name && postContent) {
    console.log(name, postContent + "----------------------------------------------------------------")
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ name, postContent }),
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
  const post_id = event.target.getAttribute('data-blog-id');

  if (comments) {

      const response = await fetch(`/comment/${post_id}`, {
          method: 'POST',
          body: JSON.stringify({ comments }),
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

document.querySelector('submitPost').addEventListener('submit', handlePost);


//TODO: add proper query selectors

// document.querySelector('.project-list').addEventListener('click', delButtonHandler);
