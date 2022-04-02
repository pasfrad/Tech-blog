const router = require('express').Router();
const { User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

//show the user's dashboard with their posts
router.get('/dashboard', withAuth, async (req, res) => {
  const postData = await Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render('dashboard', { posts, logged_in: req.session.loggedIn })
});

//create a new post
router.post('/dashboard', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      title: req.body.title,
      postContent: req.body.postContent,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update a post
router.put('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      title: req.body.title,
      postContent: req.body.postContent,
    },
    {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

//delete a post
router.delete('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
