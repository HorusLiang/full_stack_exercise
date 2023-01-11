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

  
  module.exports = {
    dummy,totalLikes
  }