const mongoClient = require("mongodb").MongoClient;
const assert  = require("assert");
const { Console } = require("console");
const dboper = require("./operation");

const url = "mongodb://localhost:27017";
const dbname="ConFusion";
mongoClient.connect(url).then(client =>{
    const db = client.db(dbname);
    dboper.insertDocument(db,{name:"Vadonut",description:"Test"}, "dishes")
    .then(result =>{
        console.log("Inserted record : \n",result.ops);

        return dboper.findDocuments(db,"dishes");
    })
    .then(result =>{
        console.log("Found documents: \n",result);

        return dboper.updateDocument(db,{name:"Vadonut"},{description : "Updated Test"},"dishes");
    })
    .then(result =>{
        console.log("Updated Document: \n",result.result);

        return dboper.findDocuments(db,"dishes");
    })
    .then(result =>{
        console.log("Documents after updating: \n",result);

        return dboper.removeDocument(db,{name:"Vadonut"}, "dishes");
    })
    .then(result =>{
        console.log("After removing document: \n",result.result);

        return db.dropCollection("dishes");
    })
    .then(result=>{
        console.log("dropped collection: \n",result);

        client.close();
    })
    .catch(err=>{
        console.log(err);
    })
})
.catch(err=>{
    console.log("Couldnt Connect with error: \n",err);
})

/*
mongoClient.connect(url).then(client => {

    const db = client.db(dbname);
    dboper.insertDocument(db,{name:"Vadonut",description:"Test"}, "dishes", (result)=>{
        console.log("Inserted record is \n");
        console.log(result.ops);
        
        dboper.findDocuments(db,"dishes",(result)=>{
            console.log("found documents \n");
            console.log(result);

            dboper.updateDocument(db,{name:"Vadonut"},{description : "Updated Test"},"dishes",(result)=>{
                console.log("updated document: \n");
                console.log(result.result);

                dboper.findDocuments(db,"dishes",(docs)=>{
                    console.log("Found updated documents:");
                    console.log(docs);

                    dboper.removeDocument(db,{name:"Vadonut"}, "dishes", (result)=>{
                        console.log(result.result);

                        db.dropCollection("dishes",(error, result)=>{
                            assert.strictEqual(error,null);
                            console.log("Dropped Collection: "+result);

                            client.close();
                        })
                    })

                })
            })
        })
    })
    
});
*/