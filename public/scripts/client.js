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
   


// --------- hardcoded test demo ---------
// const $tweetA = $(`<article class="tweet">Hello world</article>`);
// $('.tweet-container').append($tweetA);
};


renderTweets(tempTweetData); // begins process of loading all tweets

}); // --------- end of $(document).ready ---------






//my current index.HTML Structure for articles

/* 
    <article class="tweet">
  <header>
    <img src="/images/profile-hex.png">   
    <h3 class="person-title">Queen Victoria</h3>
    <h3 class="handle">@BritanniaRules</h3>
  </header>
  <div>
    <p>We are not interested in the possibilities of defeat. They do not exist.</p>
  </div>
  <div class="divider">
  </div>
  <footer>
    <h6>X days ago</h6>
    <i class="fa-solid fa-flag"></i>
    <i class="fa-solid fa-retweet"></i>
    <i class="fa-solid fa-heart"></i>
  </footer> 
</article>

*/
