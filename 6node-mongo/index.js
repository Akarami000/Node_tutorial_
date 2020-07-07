const mongodbClient =require('mongodb').MongoClient;
const dober = require('./operations')
const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

// mongodbClient.connect(url,(err,client)=>{
//     assert.equal(err,null)
    
//     console.log('connection check')
//     const db = client.db(dbname)
//    ///////old method
//     // const collection = db.collection('dishes')
//     // collection.insertOne({"name":"akarami","description":"test 2"},(err,result)=>{
//     //     assert.equal(err,null)
//     //     console.log('After indertion:\n')
//     //     console.log(result.ops)

//     //     collection.find({}).toArray((err,docs)=>{
//     //         assert.equal(err,null)
            
//     //         console.log('found:\n')
//     //         console.log(docs)
//     //         db.dropCollection('dishes',(err,result)=>{
//     //             assert.equal(err,null)
//     //             client.close()
//     //         })
//     //     })

//     //     })

//     dober.insertDocument(db,{"name":"max pain","description":"test3"},'dishes',(result)=>{
//         console.log("Insert document:",result.ops)
//         dober.findDocument(db,'dishes',(docs)=>{
//             console.log('found the document', docs)

//             dober.updateDocument(db,{"name":"max pain"},{"description":"test 3"},'dishes',(result)=>{
//                 console.log("update the document",result.result)
//                 dober.findDocument(db,'dishes',(docs)=>{
//                     console.log('found the document', docs)

//                    db.dropCollection('dishes',(result)=>{
//                        console.log("droped collection",result)
//                        client.close()
//                    })
//                 })
//             })

            
//         })
//     })

//     })

    


mongodbClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dober.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dober.findDocument(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dober.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dober.findDocument(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));


// mongod --dbpath=data --bind_ip 127.0.0.1