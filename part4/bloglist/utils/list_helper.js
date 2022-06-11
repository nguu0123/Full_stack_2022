const _ = require('lodash-contrib')
const dummy = (blogs) => {
    return 1
}
function totalLikes(blogs) {
    return blogs.map(blog => blog.likes).reduce((parSum, a) => parSum + a, 0)
}
function favotireBlog(blogs) {
    return blogs.reduce((favotire, blog) => {
        if (favotire.likes >= blog.likes)
            return favotire
        else
            return blog
    })
}
function mostBlogs(blogs) {
    const frequence = _.frequencies(blogs.map(blog => blog.author))
    let maxKey, maxValue = 0;

    for (const [key, value] of Object.entries(frequence)) {
        if (value > maxValue) {
            maxValue = value;
            maxKey = key;
        }
    }
    return {
        "author": maxKey,
        "blogs": maxValue
    }
}
function mostLikes(blogs) {
    const authors = new Set(blogs.map(blog => blog.author))
    var dict = new Object()
    authors.forEach(author => dict[author] = blogs.filter(blog => blog.author === author).reduce((sum, a) => sum + a.likes, 0))
    var favotireAuthor = ''
    var maxLikes = 0
    for (const [key, value] of Object.entries(dict)) {
        if (value > maxLikes) {
            maxLikes = value
            favotireAuthor = key
        }
    }
    return {
        "author": favotireAuthor,
        "likes": maxLikes
    }

}
module.exports = {
    dummy, totalLikes, favotireBlog, mostBlogs, mostLikes
}