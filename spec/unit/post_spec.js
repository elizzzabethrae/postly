const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;

describe("Post", () => {

  beforeEach((done) => {

    this.post;
    sequelize.sync({force: true}).then((res) => {

        Post.create({
          username: "lizzy"
          body: "heyo",
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    describe("#create()", () => {

    it("should create a post with a username and body", (done) => {

      Post.create({
        username: "lizzy"
        body: "ugh winter is long",
      })
      .then((post) => {


        expect(post.username).toBe("lizzy");
        expect(post.body).toBe("ugh winter is long");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a post with missing username and body", (done) => {
      Post.create({
        title: "Pros of Cryosleep during the long journey"
      })
      .then((post) => {
        done();
      })
      .catch((err) => {

        expect(err.message).toContain("Post.body cannot be null");
        expect(err.message).toContain("Post.username cannot be null");
        done();

      })
    });

  });

  });
