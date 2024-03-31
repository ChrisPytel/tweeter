/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {  

// OOPS got ahead of myself - not using file system stuff just yet

// const fs = require('fs');
// const tweetLibrary = require('../../server/data-files/initial-tweets.json');



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
];

//------------------  Section for Functions ------------------

const createTweetElement = function(tweetObj) {  
  console.log(`Running createTweetElement`);

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
      <h6>${tweetObj.created_at}</h6>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer> 
  </article>
  `);
  console.log(`Our markupStructure is: `, markupStructure);
  return markupStructure;
};


const renderTweets = function(allTweets) {
  // console.log(`tweetLibrary is: `, allTweets);
  allTweets.forEach((tweet,index) => {
    console.log(`Tweet #${index+1} is:`, tweet);
    // calls createTweetElement for each tweet
    const element = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweet-container').append(element);        
  }); 
};





renderTweets(tempTweetData); // begins process of loading all tweets

//------------------  Section for Listeners ------------------

//listens to the form for when submit called on the button corresponding to form
$('#tweet-form').on('submit', function(event){
  console.log( "Handler for `submit` called." );
  event.preventDefault();

  $.ajax('/tweets', {method: 'POST'});
  console.log(`$(this) is: `, $(this));
  const $tweetInput = $(this).serialize();  
  console.log(`$data is: `, $tweetInput);

  $.post('/tweets', $tweetInput, console.log('sent to /tweets'));
});

}); // --------- end of $(document).ready ---------