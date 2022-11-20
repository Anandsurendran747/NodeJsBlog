const { response } = require('express');
var express = require('express');
const { path } = require('../app');
var router = express.Router();
var userhelper=require('../helper/user-helper')

/* GET users listing. */

let url='/';

  
const verifyLogin=async(req,res,next)=>{
  if(req.session.loggedIn){
    next()
    
  }
  else{
    url=req.originalUrl
    console.log("url"+url);
    res.redirect('/')
    
    }
  
}
// router.get('/login',(req,res)=>{
//   res.render('users/please-login', { user:true});
// })
router.get('/',function(req, res, next) {
  url='/'
  
  var notLogin=req.query.notLogin
  console.log(notLogin);
  let loggedUser={loggedIn:req.session.loggedIn,
  name:req.session.name,
  email:req.session.email
  
  }
  
  
  
  res.render('users/user', { user:true,loggedUser:loggedUser,notLogin:notLogin});
});
// router.get('/login',(req,res)=>{
//   let loggedUser={loggedIn:req.session.loggedIn,
//     name:req.session.name,
//     email:req.session.email
//     }
//   res.render('login',{user:true,loggedUser:loggedUser})
// })


router.get('/services',(req,res)=>{
  url='/services'
  let loggedUser={loggedIn:req.session.loggedIn,
    name:req.session.name,
    email:req.session.email
    }
  res.render('users/services',{ user:true,loggedUser:loggedUser})
})
router.get('/contact',(req,res)=>{
  url='/contact'
  let loggedUser={loggedIn:req.session.loggedIn,
    name:req.session.name,
    email:req.session.email
    }
  res.render('users/contact',{ user:true,loggedUser:loggedUser})
})
router.get('/blogs',(req,res,next)=>{
  
  url='/blogs'
  userhelper.showBlogs().then((blogs)=>{
    // console.log(blogs)
    let loggedUser={loggedIn:req.session.loggedIn,
      name:req.session.name,
      email:req.session.email
      };
    res.render('blogs',{user:true,blogs:blogs,loggedUser:loggedUser})
  })
})
router.get('/blogfullview/:blogid',(req,res)=>{
  // var blog=req.query.blog
  // var myblog;
  // module.exports=myblog
  
  var blogId=req.params.blogid
  url='/blogfullview/'+blogId;
  let loggedUser={loggedIn:req.session.loggedIn,
    name:req.session.name,
    email:req.session.email
    };
  userhelper.getSingleBlog(blogId).then((response)=>{
    res.render('blog-fullview',{user:true,blog:response,loggedUser:loggedUser})
  })
 
  
})
router.post('/signup',(req,res)=>{
  console.log(req.body);
  userhelper.addUser(req.body).then((response)=>{
    
    res.json({signup:true})
  })
})
router.post('/login',(req,res,next)=>{
  
  if(req.body.url!='undefined'){
    url=req.body.url
  }
  // else{
  //   url='/'
  // }
  // console.log("url"+url);
  // console.log(req.body);
  userhelper.doLogin(req.body).then((response)=>{
    console.log(response);
    // res.json({val:true})
    if(response.admin){
      req.session.adminLogin=true
      res.json({admin:true})
    }
    else if(response.status){
      req.session.loggedIn=true
      req.session.name=response.user.name
      req.session.email=response.user.email
      console.log(req.session.name);
      
      res.json({url:url})
      
    }
    else{
      var alert='Invalid username or Password'
      res.json({authFail:true,alert:alert})
    }
  })
  
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect(url)
})
router.post('/contactMe',(req,res)=>{
  console.log(req.body);
  userhelper.addContact(req.body).then((response)=>{
    res.json({contact:true})
  })
})
router.get('/searchBlog',(req,res)=>{
  console.log(req.query);
  let loggedUser={loggedIn:req.session.loggedIn,
    name:req.session.name,
    email:req.session.email
    };
  if(req.query.search!=''){
    userhelper.findBlog(req.query.search).then((response)=>{
      var blogs=response.blogs
      var searchblogs=response.searchblogs
      if(searchblogs.length>0){
        res.render('searchBlog',{user:true,searchblogs:searchblogs,loggedUser:loggedUser,query:req.query.search})
      }else{
        res.render('searchBlog',{user:true,loggedUser:loggedUser,query:req.query.search})
      }
      
    })
  }else{
    res.redirect('/')
  }
  
  
})


module.exports = router;
