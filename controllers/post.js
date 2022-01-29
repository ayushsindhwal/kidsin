const Comments = require('../models/Comments');
const Posts = require('../models/Posts');





class APIfeatures{
    constructor(query,queryString)
    {
        this.query=query;
        this.queryString=queryString;

    }

    paginating()
    {
        const page=this.queryString.page*1||1
        const limit=this.queryString.limit*1||9
        const skip=(page-1)*limit
        this.query=this.query.skip(skip).limit(limit)
        return this
    }
}
const postController={
createPost:async(req,res)=>{
    console.log(req.body)
    try {
        const {content,images}=req.body

        const newPost=await Posts.create({
                content,images,user:req.user._id
        })
        console.log(newPost)

        res.json({
            msg:'Create Post',
            newPost:{
                ...newPost._doc,
                user:req.user
            },
            results:newPost.length
        })
    } catch (err) {
        
        return res.status(500).json(
            {msg:err.message}
        )

    }
},
getPost:async(req,res)=>{
    try {
        //here is the logic for getting posts from people you are following
        const posts= await Posts.find({$or:[{
            user:[...req.user.following,req.user._id]
        },{ads:req.user._id}]}).sort('-createdAt').populate('user likes ','avatar fullname role followers').populate({
            path:"comments",
            populate:{
                path:"user likes",
                select:"-password"
            }
        })
        if(!posts) return res.status(400).json({msg:'This post does not exist'})

        res.json({
            msg:'success',
            result:posts.length,
            posts
        })
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(
            {msg:err.msg}
        )
    }
},

updatePost:async(req,res)=>{
    try {
        const {content,images,stopcomment}=req.body
        let post
          if(stopcomment===true||false)
          {
             post=await Posts.findOneAndUpdate({_id:req.params.id},{
                    stopcomment:stopcomment
            }).sort('-createdAt').populate('user likes','avatar fullname role followers').populate({
                path:"comments",
                populate:{
                    path:"user likes",
                    select:"-password"
                }
            })
          }
    else{ post=await Posts.findOneAndUpdate({_id:req.params.id},{
            content,images
        }).sort('-createdAt').populate('user likes','avatar fullname role followers').populate({
            path:"comments",
            populate:{
                path:"user likes",
                select:"-password"
            }
        })}

        res.json({
            msg:'Updated Post',
            newPost:{
                ...post._doc,
                content,images
            }
        })
    } catch (err) {
        return res.status(500).json(
            {msg:err.msg})

    }
},

likePost:async(req,res)=>{
    try {
        const post=await Posts.find({_id:req.params.id,likes:req.user._id})
        if(post.length>0) return res.json({msg:'already liked Post!'})

        const like=await Posts.findOneAndUpdate({_id:req.params.id},{$push:{likes:req.user._id}},{new:true})
        
        if(!like) return res.status(500).json({msg:'This post does not exist'})

        res.json({msg:'Liked Post!'})
        
    } catch (err) {
        return res.status(500).json({msg:err.msg})
    }
},
unLikePost:async(req,res)=>{
    try {
        const like=await Posts.findOneAndUpdate({_id:req.params.id},{$pull:{likes:req.user._id}},{new:true})
        if(!like) return res.status(500).json({msg:'This post does not exist'})

        res.json({msg:'unLiked Post!'})

        
    } catch (err) {
        return res.status(500).json({msg:err.msg})
    }
},
deletePost:async(req,res)=>{
    
    try {
        
        const post=await Posts.findOneAndDelete({_id:req.params.id,user:req.user._id})
        await Comments.deleteMany({_id:{$in:post.comments}})
    res.json({msg:'Deleted Post!',newPost:{...post,user:req.user}})
    } catch (err) {
        
       res.status(500).json({msg:'This post does not exist'})
 
    }
},
getpostsingle: async (req, res) => {
        try {
            const post = await Posts.findById(req.params.id)
            .populate("user likes", "avatar username fullname followers")
            .populate({
                path: "comments",
                populate: {
                    path: "user likes",
                    select: "-password"
                }
            })

            if(!post) return res.status(400).json({msg: 'This post does not exist.'})

            res.json({
                post
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

}








module.exports=postController