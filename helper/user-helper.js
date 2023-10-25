const db=require('../mongo-connection/dbconnection')
var objId=require('mongodb').ObjectId
const collections=require('../mongo-connection/mongo-collections')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv');
dotenv.config()

module.exports={
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
    addUser:(user)=>{
        return new Promise(async(resolve,reject)=>{
            user.password=await bcrypt.hash(user.password,10)
            db.get().collection(collections.USER_COLLECTION).insertOne(user).then((data)=>{
                resolve(data)
            })
        })
    },
    doLogin:(userdetails)=>{
        return new Promise(async(resolve,reject)=>{
            
            if(userdetails.username==process.env.admin_username && userdetails.password==process.env.admin_password){
                resolve({admin:true})
            }
            else{
                var user=await db.get().collection(collections.USER_COLLECTION).findOne({username:userdetails.username})
                if(user){
                    bcrypt.compare(userdetails.password,user.password).then((status)=>{
                        if(status){
                            console.log('login succces');
                            resolve({user:user,status:true})
                        }else{
                            console.log('login failed');
                            resolve({status:false})
                        }
                    })
                }else{
                    console.log('login failed');
                    resolve({status:false})
                }

            }
            
        })
    },
    addContact:(contact)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collections.CONTACT_COLLECTION).insertOne(contact).then((response)=>{
                resolve(response)
            })
        })
    },
    findBlog:(query)=>{
        // console.log(query);
        return new Promise(async(resolve,reject)=>{
            var querytext=query.toLowerCase() 
            console.log(querytext);
            const result = { title:{$regex:querytext,$options:'i'} };
            var blog=await db.get().collection(collections.BLOG_COLLECTION).find().toArray()
            var searchblogs=await db.get().collection(collections.BLOG_COLLECTION).find(result).toArray()
            var response={
                blogs:blog,
                searchblogs:searchblogs
            }
            resolve(response)
        })
    }
    
}