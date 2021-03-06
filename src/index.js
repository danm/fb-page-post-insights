const settings = require('./settings');
const getSystemAssignedPages = require('./apis/getSystemAssignedPages');
const getPagePosts = require('./apis/getPagePosts');
const resolveLinkShares = require('./apis/resolveLinkShares');
const getAllPostInsights = require('./apis/getAllPostInsights');

module.exports = async (accessToken, appsecret) => {
  try {
    // set cli arguments 
    settings.set(accessToken, appsecret);

    // get all pages that belong to system account
    const pages = await getSystemAssignedPages();

    // get feed of all pages
    const posts = await getPagePosts(pages);
    
    // translate all links in a page post to see if it has linked to the News site articles
    // if a short url is shared (bbc.in) we need to resolve it and return a path
    const postsWhichShareBBCNews = await resolveLinkShares(posts);
    
    // return insights of the pages that we care about
    return await getAllPostInsights(postsWhichShareBBCNews);
    
    // we are done, but getAllPostInsights returns insights for the posts it checked.
  } catch (e) {
    console.log(e.message);
    // console.log(e.stack);
  }
};


