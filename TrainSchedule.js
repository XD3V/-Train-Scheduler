// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyCy7Dd1r8ouAWoIvmdTlN6rFNxTi6YnEu4",
  authDomain: "trainstation-15aac.firebaseapp.com",
  databaseURL: "https://trainstation-15aac.firebaseio.com",
  storageBucket: "trainstation-15aac.appspot.com",
  projectId: "trainstation-15aac",

  messagingSenderId: "760420597744",
  appId: "1:760420597744:web:cb83ea0ee64e3d1e096735"
};

firebase.initializeApp(config);

var database = firebase.database();

// adding train button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  //Takes users input
  var trainName = $("#Train-name-input")
    .val()
    .trim();
  var trainDest = $("#Destination-input")
    .val()
    .trim();
  var trainStart = moment(
    $("#start-time-input")
      .val()
      .trim(),
    "X"
  ).format("HH:mm");
  var trainFreq = $("#frequency-input")
    .val()
    .trim();

  //Creates local "temporary" object for holding train data

  var newTrainSchedule = {
    name: trainName,
    destination: trainDest,
    start: trainStart,
    frequency: trainFreq
  };

  //Uploads train data to fireBase

  database.ref().push(newTrainSchedule);

  // Logs all of this to the console

  console.log(newTrainSchedule.name);
  console.log(newTrainSchedule.destination);
  console.log(newTrainSchedule.start);
  console.log(newTrainSchedule.frequency);

  alert("Train station successfully added");

  // Clears all of the text-boxes
  $("#Train-name-input").val("");
  $("#Destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");
});
//Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
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


  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

  // Time apart (remainder)
  console.log(trainFreq + " " + trainStart);
  var tRemainder = trainStart % trainFreq;
  console.log("REMAINDER: " + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  //Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

  // create new table

  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainStart),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});
