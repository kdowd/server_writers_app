// start for replies model
module.exports = function (app) {
  app.get("/login", function (req, res) {
    res.render("login", {
      title: "Express Login",
    });
  });

  //other routes..

  router.get("/view-replies", function (req, res) {
    Replies.find().then((response) => {
      res.json(response);
    });
  });
  router.get("/view-replies-by-comment-id/:comment_id", function (req, res) {
    Replies.find({ comment_id: req.params.comment_id }).then((response) => {
      res.json(response);
    });
  });
};
