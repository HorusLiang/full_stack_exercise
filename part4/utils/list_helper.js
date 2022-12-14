const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes=(blogs)=>{
    blog_num=blogs.length
    let total = 0;
    for (let i = 0; i < blog_num; i++) {
        total += blogs[i].likes;
    }
    return total;
}

const favoriteBlog=(blogs)=>{
    blog_num=blogs.length
    let most_likes = 0;
    let index=0;
    for (let i = 0; i < blog_num; i++) {
        if(most_likes<blogs[i].likes){
            most_likes=blogs[i].likes
            index=i
        }
    }
    return {
        title: blogs[index].title,
        author:blogs[index].author,
        likes: blogs[index].likes
    }
}

const mostBlogs=(blogs)=>{
    const blogGroup = _.groupBy(blogs, 'author');
    const blogCount = _.map(blogGroup, (blogs, author) => ({ author: author, blogs: blogs.length }));
    const topAuthor = _.maxBy(blogCount, 'blogs');
    return topAuthor;
}

const mostLikes = (blogs) => {
    const blogGroup = _.groupBy(blogs, 'author');
    const totalLikes = _.map(blogGroup, (blogs, author) => ({
      author: author,
      likes: _.sumBy(blogs, 'likes'),
    }));
    const topAuthor = _.maxBy(totalLikes, 'likes');
    return topAuthor;
}

  
  module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
  }