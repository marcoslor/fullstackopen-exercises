const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

if (MONGODB_URI === undefined) {
  console.error("MONGODB_URI is not defined in the environment");
  process.exit(1);
}

if (process.argv.length != 4 && process.argv.length != 2) {
  console.log(
    `Usage:\nnode mongo.js <name> <number> (add a contact)\nnode mongo.js (list all contacts)`
  );
  process.exit(1);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const fetchAll = () => { 
   return Person.find()
     .then((result) => {
       console.log("Phonebook:");
       console.table(result.map((person) => ({ name: person.name, number: person.number })));
     })
}

const addPerson = (name, number) => {
  const person = new Person({
    name,
    number,
  });
  return person.save().then(() => console.log(`added ${name} number ${number} to phonebook`));
}

console.log("connecting to MongoDB...");

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB\n");

    if (process.argv.length === 2) {
      return fetchAll();
    } else {
      return addPerson(process.argv[2], process.argv[3]);
    }
  })
  .catch((err) => console.log(err))
  .then(() => {
    mongoose.connection.close();
    process.exit(1);
  });