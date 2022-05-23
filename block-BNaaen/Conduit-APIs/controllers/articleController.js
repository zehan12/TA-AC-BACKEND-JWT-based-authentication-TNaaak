const { find } = require("../models/Article");
const Article = require("../models/Article");

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
    createArticle: async ( req, res, next ) => {
        try {
            const article = req.body;
            if ( req.body.tagList ) {
                article.tagList = req.body.tagList.split(",").map(v=>v.toLowerCase());
            }
            article.author = req.users.userId;
            const articleCreated = await Article.create( article );
            res.status( 200 ).json( { article: {
                title: articleCreated.title,
                description: articleCreated.description,
                body: articleCreated.description,
                tagList: articleCreated.tagList
            } } );            
        } catch (error) {
            return next ( error );
        }
    },

    updateArticle: async ( req, res, next ) => {
        try {
            const articleUpdate = req.body;
            console.log( articleUpdate )
            if ( articleUpdate.title ) {
                const dbSlug = req.body.title.split(" ").map(v=>v.toLowerCase()).join("-");
                console.log(dbSlug,"dbSlug")
                    const databaseSlug  = await Article.findOne( { dbSlug } ).select("slug");
                    if ( !databaseSlug ) { 
                        articleUpdate.slug = dbSlug;
                    }
                    if ( dbSlug == databaseSlug.slug ) {
                        articleUpdate.slug = dbSlug+"-"+(Math.random()).toString(36).slice(2, 7)
                    }
                    console.log(articleUpdate,"ops")
            }
            const { userId } = await Article.findById( { slug: req.params.slug } )

            // const articleUpdated = await Article.findOneAndUpdate( { slug: req.params.slug }, articleUpdate, { new: true } )
            res.json({article:{ articleUpdate } });
        } catch (error) {
            return next( error );
        }
    },

    deleteAtricle: async ( req, res, next ) => {
        try {
            const { userId } = Article.findOne( { slug: req.params.slug } );
            if ( req.users.userId == userId ) {
                const articleDelete = await findByIdAndDelete( { slug: req.params.slug } );
                res.json( { articleDelete } )
            }
        } catch ( error ) {
            return next( error )
        }
    },

    singleArticle: async ( req, res, next ) => {
        try {
            const slug = req.params.slug
            console.log(slug)
            const article = await Article.findOne({slug:slug})
            console.log(article)
            res.status( 200 ).json( { article} )
        } catch (error) {
            return next( error );
        }
    },


}

