const db=require('../mongo-connection/dbconnection')
const { response } = require('express')
var objId=require('mongodb').ObjectId
const collections=require('../mongo-connection/mongo-collections')


module.exports={
    addBlog:(blog,steps)=>{
        return new Promise((resolve,reject)=>{
            var formattedBlog={
                title:blog.title,
                description:blog.description,
                steps:steps
            }
            
            db.get().collection(collections.BLOG_COLLECTION).insertOne(formattedBlog).then(()=>{
                resolve()
            })
        })
    },
    showBlogs:()=>{
        return new Promise((resolve,reject)=>{
            var blogs=db.get().collection(collections.BLOG_COLLECTION).find().toArray()
            resolve(blogs)
        })
    },
    getSingleBlog:(blogId)=>{
        
        return new Promise((resolve,reject)=>{
            var blog=db.get().collection(collections.BLOG_COLLECTION).findOne({_id:objId(blogId)})
            resolve(blog)
        })
    },
    
    deleteBlog:(blogId)=>{
        console.log(blogId);
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.BLOG_COLLECTION).deleteOne({_id:objId(blogId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    editBlog:(blogId,blog,steps)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.BLOG_COLLECTION).updateOne({_id:objId(blogId)},
            {
                $set:{
                    title:blog.title,
                    description:blog.description,
                    steps:steps
                }
            }
            ).then(()=>{
                resolve()
            })
        })
    }
}