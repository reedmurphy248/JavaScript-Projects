const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/personsDB", { useUnifiedTopology: true }, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: Number,
  review: String
});

const person = new Person({
  name: "Reed",
  age: 23,
  favoriteFruit: fruitSchema
});



const Fruit = mongoose.model("Fruit", fruitSchema);

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 10,
  review: "Good Fruit"
});

kiwi.save();

const john = new Person({
  name: "John",
  age: 22,
  favoriteFruit: kiwi
});

john.save();



// Native Driver

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      rating: 8,
    },
    {
      name: "Orange",
      rating: 9
    },
    {
      name: "Banana",
      rating: 6
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
};

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
};