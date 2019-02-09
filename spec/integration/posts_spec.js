const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/posts/";
const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;

describe("routes : posts", () => {

  beforeEach((done) => {
  this.post;
  sequelize.sync({force: true}).then((res) => {

   Post.create({
     username: "lizzy",
     description: "I want a snow day tomorrow"
   })
    .then((post) => {
      this.post = post;
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

});

  describe("GET /posts", () => {

    it("should return a status code 200 and all posts", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(username).toContain("lizzy");
        expect(body).toContain("I want a snow day tomorrow");
        done();
      });
    });

  });


  describe("GET /posts/new", () => {

    it("should render a new post form", (done) => {
      request.get(`${base}/posts/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Post");
        done();
      });
    });
  });

  describe("POST /posts/create", () => {

    it("should create a new post and redirect", (done) => {
      const options = {
        url: `${base}/posts/create`,
        form: {
          username: "lizzy",
          body: "so, yah"
        }
      };
      request.post(options,
        (err, res, body) => {

          Post.findOne({where: {body: "so, yah"}})
          .then((post) => {
            expect(post).not.toBeNull();
            expect(post.body).toBe("so, yah");
            expect(post.username).toBe("lizzy");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });

  });



});
