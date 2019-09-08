// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCy7Dd1r8ouAWoIvmdTlN6rFNxTi6YnEu4",
  authDomain: "trainstation-15aac.firebaseapp.com",
  databaseURL: "https://trainstation-15aac.firebaseio.com",
  projectId: "trainstation-15aac",
  storageBucket: "",
  messagingSenderId: "760420597744",
  appId: "1:760420597744:web:cb83ea0ee64e3d1e096735"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.initializeApp();

// adding train button
$("#add-train-btn").on("click", function(event){
    event.preventDefault();

    //Takes users input
    var trainName = $("#Train-name-input").trim().val();
    var trainDest = $("#Destination-input").trim().val();
    var trainStart = moment($("#start-time-input").trim().val(), "HH:mm" ).format("X");
    var trainFreq = $("#frequency-input").trim().val();

});

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

