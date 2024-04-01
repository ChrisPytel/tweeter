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
    const openAngleEncoded = string.replace(/</g, "&lt;");
    const bothAnglesEncoded = openAngleEncoded.replace(/>/g, "&gt;");
    console.log("After Re-encoding, processed text is:\n", bothAnglesEncoded);
    return bothAnglesEncoded;
  };
  

  //for creating the HTML markup to be appended later to the webpage
  const createTweetElement = function(tweetObj) {
    const markupStructure = $(`
  <article class="tweet">
    <header>
      <img src= ${tweetObj.user.avatars}>   
      <h3 class="person-title">${tweetObj.user.name}</h3>
      <h3 class="handle">${tweetObj.user.handle}</h3>
    </header>
    <div>
      <p>${myEsapeFn(tweetObj.content.text)}</p>
    </div>
    <div class="divider">
    </div>
    <footer>
      <h6>${timeago.format(tweetObj.created_at)}</h6>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
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


  //------------------  Section for Listeners ------------------

  //listens for when submit is called on the button corresponding to the form
  $('#tweet-form').on('submit', function(event) {
    console.log("Handler for `submit` called.");
    event.preventDefault();

    // console.log(`Our this is: `, this); // the target of our event handler
    const $tweetInput = $(this).serialize();    
    console.log(`Our $tweetInput is:`, $tweetInput);

    console.log(`Our $(this) is: `, $(this));

    const tweetText = $(this).find('textarea').val().trim();

    if (tweetText.length === 0) {
      alert("Cannot submit an empty tweet!");      
    } else if ($tweetInput.length > 140) {
      alert("Tweet is over the character limit!");       
    } else {
      $.ajax({
        url: `/tweets`,
        method: 'POST',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
        data: $tweetInput,
        success: function(){
          console.log(`$.ajax POST the following data to our '${this.url}' route:\n`, this.data);
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