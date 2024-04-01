/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  /* Temporary Datastructure before AJAX Server fetching

  const tempTweetData = [{
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Queen Victoria",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@BritanniaRules"
    },
    "content": {
      "text": "We are not interested in the possibilities of defeat. They do not exist."
    },
    "created_at": 1711379442671
  }
  ]; */

  //------------------  Section for Functions ------------------

  const createTweetElement = function(tweetObj) {
    const markupStructure = $(`
  <article class="tweet">
    <header>
      <img src= ${tweetObj.user.avatars}>   
      <h3 class="person-title">${tweetObj.user.name}</h3>
      <h3 class="handle">${tweetObj.user.handle}</h3>
    </header>
    <div>
      <p>${tweetObj.content.text}</p>
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
      const element = createTweetElement(tweet); // calls createTweetElement for each tweet
      $('.tweet-container').append(element); // takes return value and appends it to the tweets container
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
    const $tweetInput = $(this).serialize();

    // console.log(`Our $(this) is:`, $(this));
    // console.log(`Our $tweetInput is:`, $tweetInput);
    
    
    $.ajax({
      url: `/tweets`,
      method: 'POST',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
      data: $tweetInput,
      success: function(){
        console.log(`$.ajax POST the following data to our '${this.url}' route:\n`, this.data);  
      },
      error: function(error){
        console.error(`$.ajax ${this.method} request error on route: ${this.url}!\nDetails:`, error);
      }
    });
  });
  // $.post('/tweets', $tweetInput, console.log('sent to /tweets'));  //jquery POST shorthand without error handling


}); // --------- end of $(document).ready ---------