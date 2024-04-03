/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetLengthCap = require('./composer-char-counter'); //couldnt import correctly???

$(document).ready(function() {



  //------------------  Section for Functions ------------------

  //Cross side scripting (XSS) escape function demo'd by LHL
  // const escape = function (str) {
  //   let div = document.createElement("div");
  //   div.appendChild(document.createTextNode(str));
  //   console.log("After Re-encoding, processed text is:\n", div.innerHTML);
  //   return div.innerHTML;
  // };

  /* After Re-encoding, processed text is:
  
  &lt;script&gt;
   $("body").empty();
   &lt;/script&gt;
  */

  //My version of the XSS escape 
  const myEsapeFn = function(string) {
    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  

  //for creating the HTML markup to be appended later to the webpage
  const createTweetElement = function(tweetObj) {
    const markupStructure = $(`
  <article class="tweet">
    <header>
      <div class="profile-container">
        <img src= ${tweetObj.user.avatars}>   
        <h3 class="person-title">${tweetObj.user.name}</h3>        
      </div>
      <h3 class="handle">${tweetObj.user.handle}</h3>
    </header>
    <div>
      <p>${myEsapeFn(tweetObj.content.text)}</p>
    </div>
    <div class="divider">
    </div>
    <footer>
      <h6>${timeago.format(tweetObj.created_at)}</h6>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i> 
      </div>
    </footer> 
  </article>
  `);
    // console.log(`Our markupStructure is: `, markupStructure);
    return markupStructure;
  };


  const renderTweets = function(allTweets) {
  // console.log(`tweetLibrary is: `, allTweets);
    allTweets.forEach((tweet,index) => {
      // console.log(`Tweet #${index + 1} is:`, tweet);
      const element = createTweetElement(tweet); 
      $('.tweet-container').prepend(element); // takes return value and appends it to the top of the tweets container
    });
  };


  const loadTweets = function() {
  $.ajax({
      url: `/tweets`,
      method: 'GET',
      success: function(tweetLibraryData) {
        console.log(`tweetLibraryData is: `, tweetLibraryData);
        renderTweets(tweetLibraryData);   // passes in library data to render instead of temporary code
        // renderTweets(tempTweetData);     // begins process of loading all tweets (BEFORE AJAX)
      },
      error: function(error) {
        console.error(`$.ajax ${this.method} request error on route: ${this.url}!\nDetails:`, error);
      }
    });
  };

  loadTweets(); // begins process of loading all tweets using AJAX logic


  //Got creative and made a message writer instead of using jQuery .slideUp .slideDown methods
  const displayNotification = function(message) {
    $(`.input-notification`) //display the element and overrides styling
    .css({
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'margin': '30px 0',
      'height': '60px',
      'background-color': '#e61339',
      'color': 'white',
      'font-size': '1em',
      'letter-spacing' : '2px',
      'border-radius': '12px'
    });

    let initialDelay = 0; //delay before writing begins
    let writeSpeed = 50;
    
    //performs a check to check if message was written already
    if (!displayNotification.msgWriteCount || displayNotification.msgWriteCount === 0) {
      displayNotification.msgWriteCount = 0;
      for (const char of message) {
        setTimeout(() => {
          if(char === " "){
            $(`.input-notification`).append(`<h6>_</h6>`);
          }else{
            $(`.input-notification`).append(`<p>${char}</p>`);
          }
        }, initialDelay)  
        initialDelay = initialDelay + writeSpeed;
      }  
      displayNotification.msgWriteCount++; 
    } 
    else if(displayNotification.msgWriteCount > 0){
      displayNotification.msgWriteCount = 0;
      $(`.input-notification`).empty() //clears the last message      
      displayNotification(message);    //recursively sends back the message to re-render
    }
  };


  //------------------  Section for Listeners ------------------

  //listens for when submit is called on the button corresponding to the form
  $('#tweet-form').on('submit', function(event) {
    console.log("Handler for `submit` called.");
    event.preventDefault();

    // console.log(`Our this is: `, this); // the target of our event handler
    const $tweetInput = $(this).serialize();    
    console.log(`Our $tweetInput is:`, $tweetInput);
    // console.log(`Our $(this) is: `, $(this));
    const tweetText = $(this).find('textarea').val().trim(); //handles empty inputs and tweets composed of only spaces
    console.log(`Our tweetText is: `, tweetText);
    
    if (tweetText.length === 0) {      
      // alert("Cannot submit an empty tweet!");  //old alert message
      displayNotification("Cannot submit an empty tweet!");

    } else if (tweetText.length > 140) {
      // alert("Tweet is over the character limit!");   //old alert message
      displayNotification("Tweet is over the character limit!");
    } else {
      $.ajax({
        url: `/tweets`,
        method: 'POST',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
        data: $tweetInput,
        success: function(){
          console.log(`$.ajax POST the following data to our '${this.url}' route:\n`, this.data);
          $(`.input-notification`).css({'display': 'none' }); //removes notification on successful input
          $('.tweet-container').empty(); // Purges the old tweets from
          loadTweets(); //Re-loads the tweets again from the updated library
        },
        error: function(error){
          console.error(`$.ajax ${this.method} request error on route: ${this.url}!\nDetails:`, error);
        }
      });
      // $.post('/tweets', $tweetInput, console.log('sent to /tweets'));  //jquery POST shorthand without error handling
    }
    

  }); // --------- end of #tweet-form listener ---------  

}); // --------- end of $(document).ready ---------