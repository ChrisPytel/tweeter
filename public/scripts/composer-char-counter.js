//This script is for updating the Maximum character counter when composing a tweet message

$(document).ready(function() {  

  $("#tweet-text").on('input', function(event){
  //stores the current content of the textarea as a variable, updates everytime anything new is added
  const tweetMessage = event.target.value; 
  const tweetLengthCap = 140;
  const counterUpdate = tweetLengthCap - tweetMessage.length;
  const counterElement = document.querySelector('.counter');
  counterElement.value = counterUpdate; //appends the counter result to the html element's value

  if (counterUpdate < 0) { // when character count is exceeded
    counterElement.style.color = '#ff0000';
  } else { // when below the max length
    counterElement.style.color = `#4056A1`;
  }
  });

});// --------- end of $(document).ready ---------