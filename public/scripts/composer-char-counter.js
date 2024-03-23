//This script is for updating the Maximum character counter when composing a tweet message

$(document).ready(function() {  
  console.log("Hey is the tweet-counter script running?\nYa better go catch it :)");


  const inputField = document.querySelector("#tweet-text"); 
 
  inputField.addEventListener('input', function(event){
  // console.log(`input for event is:`, event.data);
  // console.log(`this is:`, this);

  const tweetMessage = event.target.value; //stores the current content of the textarea as a variable
  console.log(`Content: `, tweetMessage);
  console.log(`Counter is at: `, tweetMessage.length);

  });
  
  //Jquery experiment

  // $("#tweet-text").on('input', function(event){
  // console.log(`input for event is:`, event);
  // // console.log(`this is:`, this);
  // });
});