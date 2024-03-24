//This script is for updating the Maximum character counter when composing a tweet message

$(document).ready(function() {  
  console.log("Hey is the tweet-counter script running?\nYa better go catch it :)");

  $("#tweet-text").on('input', function(event){
  // console.log(`input for event is:`, event);

  //stores the current content of the textarea as a variable
  //updates everytime anything new is added
  const tweetMessage = event.target.value; 
  console.log(`Content: `, tweetMessage);
  // console.log(`Counter is at: `, tweetMessage.length);

  const tweetLengthCap = 140;
  const counterUpdate = tweetLengthCap - tweetMessage.length;  
  console.log(counterUpdate);
  
  const counterElement = document.querySelector('.counter');
  console.log(`counterElementis `, counterElement.value);

  counterElement.value = counterUpdate; //appends the counter result to the html element's value


  if (counterUpdate < 0) { // when character count is exceeded
    counterElement.style.color = '#ff0000';
  } else { // when below the max length
    counterElement.style.color = `#4056A1`;
    console.log(`underlimit`);
  }

  });

});