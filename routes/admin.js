var express = require('express');
var router = express.Router();
const adminhelper=require('../helper/admin-helper')
const jsdom = require("jsdom");
var user=require('./users')
const verifyLogin=(req,res,next)=>{
  console.log(user.ad);
  if(req.session.adminLogin){
    console.log('admin logged in');
    next()
    
  }
  else{
    res.redirect('/')
  }
}
/* GET home page. */
router.get('/',verifyLogin, function(req, res, next) {
  res.render('admin/adminhome',{admin:true});
});
router.get('/addblogpage',verifyLogin,function (req,res){
  res.render('admin/addblog',{admin:true})
})
// router.get('/addImg',(req,res)=>{
  
//   res.json({remove:'remove'})

// })


router.post('/addblog',verifyLogin,(req,res)=>{
  var blog=req.body;
  var files=req.files
  var fullblog=Object.assign(blog,files)
  
  console.log(fullblog);
  var steps=[]
  var keys=Object.keys(fullblog)
  for (let i = 2; i < keys.length; i++) {
    var key=keys[i]
    var value=fullblog[key]
    
    if(key.startsWith('h')){
      steps[i-2]=[{}]
      steps[i-2][0].header=value
    }
    if(key.startsWith('s')){
      steps[i-2]=[{}]
      steps[i-2][0].subheader=value
    }
    if(key.startsWith('p')){
      steps[i-2]=[{}]
      steps[i-2][0].paragraph=value
    }
    if(key.startsWith('c')){
      steps[i-2]=[{}]
      steps[i-2][0].code=value
    }
    if(key.startsWith('i')){
      steps[i-2]=[{}]
      steps[i-2][0].image=value
    }
    
  }
  
  // console.log(steps);
  adminhelper.addBlog(fullblog,steps).then(()=>{
    res.json({add:'success'})
  })
  
})

router.get('/showBlogs',verifyLogin,(req,res)=>{
  adminhelper.showBlogs().then((blogs)=>{
    // console.log(blogs);
    res.render('blogs',{admin:true,blogs:blogs})
  })
})

router.get('/blogfullview/:blogid',verifyLogin,(req,res)=>{
  // var blog=req.query.blog
  // var myblog;
  // module.exports=myblog
  var blogId=req.params.blogid
  adminhelper.getSingleBlog(blogId).then((response)=>{
    res.render('blog-fullview',{admin:true,blog:response})
  })
 
  
})
router.get('/deleteBlog/:blogid',verifyLogin,(req,res)=>{
  var blogId=req.params.blogid
  console.log(blogId);
  adminhelper.deleteBlog(blogId).then(()=>{
    res.json({state:'deleted'})
  })
})
router.get('/editBlogPage/:blogid',verifyLogin,(req,res)=>{
  var blogId=req.params.blogid
  var index=0;
  adminhelper.getSingleBlog(blogId).then((response)=>{
    res.render('admin/editBlog',{admin:true,blog:response,index:index})
  })
})
router.post('/editBlog/:id',verifyLogin,(req,res)=>{
  var blogId=req.params.id;
  var blog=req.body;
  var steps=[]
  var keys=Object.keys(blog)
  for (let i = 2; i < keys.length; i++) {
    var key=keys[i]
    var value=blog[key]
    
    if(key.startsWith('h')){
      steps[i-2]=[{}]
      steps[i-2][0].header=value
    }
    if(key.startsWith('s')){
      steps[i-2]=[{}]
      steps[i-2][0].subheader=value
    }
    if(key.startsWith('p')){
      steps[i-2]=[{}]
      steps[i-2][0].paragraph=value
    }
    if(key.startsWith('c')){
      steps[i-2]=[{}]
      steps[i-2][0].code=value
    }
    if(key.startsWith('i')){
      steps[i-2]=[{}]
      steps[i-2][0].image=value
    }
    
  }
  // console.log(steps);
  adminhelper.editBlog(blogId,blog,steps).then(()=>{
    res.redirect('/admin/blogfullview/'+blogId)
  })
})
module.exports = router;


