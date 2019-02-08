const Post = require("./models").Post;

module.exports = {

  getAllPosts(callback){
    return Post.all()
    .then((topics) => {
      callback(null, posts);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
