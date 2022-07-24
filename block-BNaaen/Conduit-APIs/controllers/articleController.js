const { find } = require("../models/Article");
const Article = require("../models/Article");
const User = require("../models/User");

// Example request body:

// {
//   "article": {
//     "title": "How to train your dragon",
//     "description": "Ever wonder how?",
//     "body": "You have to believe",
//     "tagList": ["reactjs", "angularjs", "dragons"]
//   }
// }

module.exports = {
    createArticle: async (req, res, next) => {
        try {
            const article = req.body;
            if (req.body.tagList) {
                console.log(req.body.tagList)
                article.tagList = req.body.tagList.map(v => v.toLowerCase());
                console.log(article)
            }
            article.author = req.users.userId;
            const articleCreated = await Article.create(article);
            const author = await User.findByIdAndUpdate(article.author, { $push: { articles: articleCreated.id } }, { new: true });
            console.log(author)
            res.status(200).json({
                article: {
                    title: articleCreated.title,
                    description: articleCreated.description,
                    body: articleCreated.description,
                    tagList: articleCreated.tagList,
                    author: {
                        username: author.username,
                        bio: author.bio,
                        image: author.image,
                        following: false
                    }

                }
            });
        } catch (error) {
            return next(error);
        }
    },

    updateArticle: async (req, res, next) => {
        try {
            const articleUpdate = req.body;
            console.log(articleUpdate)
            const { author } = await Article.findOne({ slug: req.params.slug });
            if (req.users.userId == author ) {
                const articleUpdated = await Article.findOneAndUpdate({ slug: req.params.slug }, articleUpdate, { new: true })
                res.json({ article: { articleUpdated } });
            } else {
                res.status(201).json( { error: "this article is not created by you" })
            }
            // if ( articleUpdate.title ) {
            //     const dbSlug = req.body.title.split(" ").map(v=>v.toLowerCase()).join("-");
            //     console.log(dbSlug,"dbSlug")
            //         const databaseSlug  = await Article.findOne( { dbSlug } ).select("slug");
            //         if ( !databaseSlug ) { 
            //             articleUpdate.slug = dbSlug;
            //         }
            //         if ( dbSlug == databaseSlug.slug ) {
            //             articleUpdate.slug = dbSlug+"-"+(Math.random()).toString(36).slice(2, 7)
            //         }
            //         console.log(articleUpdate,"ops")
            // }
            // const { userId } = await Article.findById( { slug: req.params.slug } )
        } catch (error) {
            return next(error);
        }
    },

    deleteAtricle: async (req, res, next) => {
        try {
            const { author } = await Article.findOne({ slug: req.params.slug });
            if (req.users.userId == author ) {
                const articleDelete = await Article.findOneAndDelete({ slug: req.params.slug });
                await User.findByIdAndUpdate( req.users.userId, { $pull : { articles: articleDelete.id } } );
                res.status(201).json({ articleDelete })
            } else {
                res.status(201).json( { error: "this article is not created by you" })
            }
        } catch (error) {
            return next(error)
        }
    },


    singleArticle: async (req, res, next) => {
        try {
            const slug = req.params.slug
            const article = await Article.findOne({ slug: slug })
                .populate({ path: 'author', model: User })
                const following = !req.users ? false : 
                                  article.author.following.includes(req.users.userId);
            res.status(200).json({
                article:
                {
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    body: article.body,
                    tagList:  article.tagList,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    favorited: article.favorited,
                    favoritedCount: article.favoritedCount,
                    author: {
                        username: article.author.username,
                        bio: article.author.bio,
                        image: article.author.image,
                        following: following
                    }
                }
            })
        } catch (error) {
            return next(error);
        }
    },
  

}

