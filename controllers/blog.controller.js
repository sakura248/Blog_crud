const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const getById = (blogId) => {
  return Blog.findById(blogId, (err, data) => {
    if (err) console.log(err);
    return data;
  }).clone();
};

exports.getAllBlogs = async (req, res, next) => {
  // console.log(req)
  Blog.find((err, blogs) => {
    if (err) console.log(err);
    res.render("index", {
      pageTitle: "All Blogs",
      blogs: blogs,
    });
  });
};

exports.getAddBlogs = (req, res, next) => {
  res.render("add-edit-blogs", {
    pageTitle: "Post a blog",
    editing: false,
  });
};

exports.postAddBlogs = async (req, res, next) => {
  const {
    title,
    // imageUrl,
    content,
    // createdDate,
    like,
    dislike,
  } = req.body;

  const blog = new Blog({
    title,
    // imageUrl,
    content,
    // createdDate,
    blogId: req.blog,
    like: 0,
    dislike: 0,
  });
  await blog.save();
  res.redirect("/");
};

exports.getBlogById = async (req, res, next) => {
  const {
    params: { blogId },
  } = req;
  // const commentsData = {}

  const blog = await getById(blogId);
  const comments = await getById(blogId);

  Comment.find({ blogId: blogId }, (err, comment) => {
    res.render("blog-detail", {
      pageTitle: blog.title,
      blog: blog,
      comments: comment,
    });
  });
};

exports.getEditBlog = async (req, res, next) => {
  // const editMode = req.query.edit
  // console.log(req.query)
  // if (!editMode) res.redirect('/')

  const { blogId } = req.params;
  const blog = await getById(blogId);

  res.render("add-edit-blogs", {
    pageTitle: "Edit blog",
    editing: true,
    blog: blog,
  });
};

exports.postEditBlog = async (req, res, next) => {
  const {
    blogId,
    title,
    // imageUrl,
    content,
  } = req.body;

  const blog = await getById(blogId);

  blog.title = title;
  // blog.imageUrl = imageUrl
  blog.content = content;

  await blog.save();
  res.redirect("/");
};

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  console.log("delete : ", blogId);

  Blog.findByIdAndRemove(blogId, (err) => {
    if (err) console.log("error");
  });
  res.redirect("/");
};

exports.postCountLike = async (req, res, next) => {
  const { blogId } = req.body;
  const blog = await getById(blogId);
  blog.like++;

  await blog.save();
  res.redirect(`/blogs/${blogId}`);
};

exports.postCountDislike = async (req, res, next) => {
  const { blogId } = req.body;
  const blog = await getById(blogId);
  blog.dislike++;

  await blog.save();
  res.redirect(`/blogs/${blogId}`);
};
