const { response } = require('express');
const handle=require('handlebars')
const adminhelper=require('../helper/admin-helper');
const { options } = require('../routes/users');
// const { htmlToText } = require('html-to-text');
// var i=0;
// handle.registerHelper('sample',function(blog){
//   console.log(blog);
//   return blog
// })
// handle.registerHelper('startsT',function(key,index){
//   console.log(index);
//   console.log(i);
//   if(key.startsWith('t')){
//     return this
//   }
  
// })
// handle.registerHelper('startsD',function(key,index){
//   console.log(index);
//   if(key.startsWith('d')){
//     return this
//   }
  
// })
handle.registerHelper("startswithT",function(blog,key,index){
    var currentkey=key[index]
    
    if(currentkey.startsWith('t')){
      return blog[currentkey]
    }else{
      return
    }
})
handle.registerHelper("startswithD",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('d')){
      return blog[currentkey]
    }else{
      return
    }
})
handle.registerHelper("startswithH",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('h')){
      return blog[currentkey]
    }else{
      return
    }
})
handle.registerHelper("startswithS",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('s')){
      return blog[currentkey]
    }else{
      return
    }
})
handle.registerHelper("startswithP",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('p')){
      var a=""+blog[currentkey]
      // var str =htmlToText()
      // console.log(myblog);
      return a
    }else{
      return
    }
})
handle.registerHelper("startswithC",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('c')){
      return blog[currentkey]
    }else{
      return
    }
})
handle.registerHelper("startswithI",function(blog,key,index){
    var currentkey=key[index]
    if(currentkey.startsWith('i')){
      return blog[currentkey]
    }else{
      return
    }
})
// handle.registerHelper("startswithD",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       var currentkey=key[index]
//       if(currentkey.startsWith("d")){
//         console.log("d");
//         i=i+1
//         return response[currentkey]
//       }
//       else{
//         return
//       }
//     })
//     }
// })
// handle.registerHelper("startswithH",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       var currentkey=key[index]
//       if(currentkey.startsWith("h")){
//         console.log("h");
//         i=i+1
//         return response[currentkey]
//       }
//       else{
//         return
//       }
//     })
//     }
// })
// handle.registerHelper("startswithS",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       var currentkey=key[index]
//       if(currentkey.startsWith("s")){
//         console.log("s");
//         i=i+1
//         return response[currentkey]
//       }
//       else{
//         return
//       }
//     })
//     }
// })
// handle.registerHelper("startswithP",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     var currentkey;
//     var blog;
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       blog=response
//       currentkey=key[index]
      
//     })
//     if(currentkey.startsWith("p")){
//       console.log("p");
//       i=i+1
//       return blog[currentkey]
//     }
//     else{
//       return
//     }
//     }
// })
// handle.registerHelper("startswithC",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       var currentkey=key[index]
//       if(currentkey.startsWith("c")){
//         console.log("t");
//         i=i+1
//         return response[currentkey]
//       }
//       else{
//         return
//       }
//     })
//     }
// })
// handle.registerHelper("startswithI",async function(index,id){
//     if(i==index){
//       console.log(index);
//     console.log(id);
//     await adminhelper.getSingleBlog(id).then((response)=>{
//       console.log(response);
//       var key=Object.keys(response)
//       console.log(key);
//       var currentkey=key[index]
//       if(currentkey.startsWith("i")){
//         console.log("i");
//         i=i+1
//         return response[currentkey]
//       }
//       else{
//         return
//       }
//     })
//     }
// })
// handle.registerHelper("startswithD",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("d")){
//       return blog[onekey]
      
//     }
//     else{
//       return 
//     }

//   })
// handle.registerHelper("startswithH",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("h")){
//       return blog[onekey]
      
//     }
//     else{
//       return 
//     }
//   })
// handle.registerHelper("startswithS",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("s")){
//       return blog[onekey]
      
//     }
//     else{
//       return 
//     }
//   })
// handle.registerHelper("startswithP",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("p")){
//       return blog[onekey]
      
//     }
//     else{
//       return 
//     }
//   })
// handle.registerHelper("startswithC",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("c")){
//       return blog[onekey]
      
//     }else{
//         return
//     }
    
//   })
// handle.registerHelper("startswithI",function(blog,key,index){
//     // console.log(blog);
//     var onekey=key[index] 
//     if(onekey.startsWith("i")){
//       return blog[onekey]
      
//     }
//     else{
//         return
//     }
//   })
// handle.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i) {
//         block.data.index = i;
//         block.data.first = i === 0;
//         block.data.last = i === (n - 1);
//         accum += block.fn(this);
//     }
//     return accum;
// });
// handle.registerHelper('times', function(n, block) {
//     var accum = '';
//     for(var i = 0; i < n; ++i)
//         block.data.index = i;
//         accum += block.fn(i);
//     return accum;
// });
handle.registerHelper("repeat", function (times, opts) {
    var out = "";
    var i;
    var data = {};

    if ( times ) {
        for ( i = 1; i < times; i += 1 ) {
            data.index = i;
            out += opts.fn(this, {
                data: data
            });
        }
    } else {

        out = opts.inverse(this);
    }

    return out;
});
// handle.registerHelper("if", function(conditional, options) {
//   if (conditional) {
//     return options.fn(this);
//   }
// });
handle.registerHelper("append",function(str, suffix) {
  return str+suffix
});
handle.registerHelper("asign",function(varName, varValue, options){
  varName=varValue
  return options.fn(varName);
})