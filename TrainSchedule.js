// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyCy7Dd1r8ouAWoIvmdTlN6rFNxTi6YnEu4",
  authDomain: "trainstation-15aac.firebaseapp.com",
  databaseURL: "https://trainstation-15aac.firebaseio.com",
  storageBucket: "trainstation-15aac.appspot.com",
  // projectId: "trainstation-15aac",
  
  // messagingSenderId: "760420597744",
  // appId: "1:760420597744:web:cb83ea0ee64e3d1e096735"
};

firebase.initializeApp(config);

var database = firebase.database();

// adding train button
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    //Takes users input
    var trainName = $("#Train-name-input").trim().val();
    var trainDest = $("#Destination-input").trim().val();
    var trainStart = moment($("#start-time-input").trim().val(), "HH:mm" ).format("X");
    var trainFreq = $("#frequency-input").trim().val();



//Creates local "temporary" object for holding train data

var newTrainSchedule = {
    name:trainName,
    destination:trainDest,
    start:trainStart,
    frequency:trainFreq,
};

//Uploads train data to fireBase

database.ref().push(newTrainSchedule);

// Logs all of this to the console

console.log(newTrainSchedule.name);
console.log(newTrainSchedule.destination);
console.log(newTrainSchedule.start);
console.log(newTrainSchedule.frequency);

alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");
});
//Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot){
console.log(childSnapshot.val());
//Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    // train info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainStart);
    console.log(trainFreq);

    // train time 
    var tFreq = $("#frequency-input");
    var startTime =("#start-time-input");

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Time apart (remainder)
    var tRemainder = startTime % tFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    //Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
});