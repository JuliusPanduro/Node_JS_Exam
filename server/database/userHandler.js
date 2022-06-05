import db from "./createConnection.js";

export function getAllUsers(){
return db.upathletes.find().toArray();
};

export function addNewUser(newUser){
     return db.upathletes.insertOne(newUser);
};

export  function findUser(email){
    return db.upathletes.findOne({email: email});
};
