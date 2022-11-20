const mongoClint=require('mongodb').MongoClient
const dotenv=require('dotenv');
dotenv.config()
const state={
    db:null
}
module.exports.connect=function(done){
    // var url='mongodb://localhost:27017'
    var dbname='blogApp'

    mongoClint.connect(process.env.MONGO_URL,(err,data)=>{
        if(err) return done(err)
        
        state.db=data.db(dbname)
        done()
    })
}
// module.exports.connect=function(done){
//     var url='mongodb://localhost:27017'
//     var dbname='MyBlog'

//     mongoClint.connect(url,(err,data)=>{
//         if(err) return done(err)
//         state.db=data.db(dbname)
//         done()
//     })
// }

module.exports.get=function(){
    return state.db
}