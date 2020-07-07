const assert = require('assert')

exports.insertDocument=(db,document,collection,callback)=>{
    const coll = db.collection(collection)
    // /////old
    // coll.insert(document,(err,result)=>{
    //     assert.equal(err,null)
    //     console.log("Insert in document " + result.result.n + "document into collection " + collection)
    //     callback(result)
    // })

return coll.insert(document)
}

exports.findDocument=(db,collection,callback)=>{
    const coll = db.collection(collection)
  ///////////old 
    // coll.find({}).toArray((err,docs)=>{
    //     assert.equal(err,null)
    //     callback(docs)
    // })
   return coll.find({}).toArray()
    
}

exports.removeDocument=(db,document,collection,callback)=>{
    const coll = db.collection(collection)
    ///////////old
    // coll.deleteOne(document,(err,result)=>{
    //     assert.equal(err,null)
    //     console.log("remove the document",document)
    //     callback(result)
    // })
   return  coll.deleteOne(document)
    
}

exports.updateDocument=(db,document,update,collection,callback)=>{
    const coll = db.collection(collection)
    //////////old
    // coll.updateOne(document,{$set:update},null,(err,result)=>{
    //     console.log("update the document",update)
    //     callback(result)
    // })
    return coll.updateOne(document,{$set:update},null)
    
    
}
