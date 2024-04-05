/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //------------------  Section for Functions ------------------

  //My version of the XSS escape function
  const myEsapeFn = function(string) {
    return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };
  
  //Creates the HTML markup to be appended later to the HTML
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
    return markupStructure;
  };

  const renderTweets = function(allTweets) {
    allTweets.forEach((tweet) => {
      const element = createTweetElement(tweet);
      $('.tweet-container').prepend(element); // takes return value and appends it to the top of the tweets container
    });
  };

  const loadTweets = function() {
    $.ajax({
      url: `/tweets`,
      method: 'GET',
      success: function(tweetLibraryData) {
        $('.tweet-container').empty(); // Purges any old tweets from html
        renderTweets(tweetLibraryData);   // passes in library data to render instead of temporary code
      },
      error: function(error) {
        console.error(`$.ajax ${this.method} request error on route: ${this.url}!\nDetails:`, error);
      }
    });
  };

  loadTweets(); // begins process of loading all tweets using AJAX logic


  //Got creative and made a notification renderer instead of using jQuery .slideUp .slideDown methods
  const displayNotification = function(message) {
    $(`.input-notification`) //display the element and overrides the hidden styling
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
          if (char === " ") {
            $(`.input-notification`).append(`<h6>_</h6>`);
          } else {
            $(`.input-notification`).append(`<p>${char}</p>`);
          }
        }, initialDelay);
        initialDelay = initialDelay + writeSpeed;
      }
      displayNotification.msgWriteCount++;
    } else if (displayNotification.msgWriteCount > 0) {
      displayNotification.msgWriteCount = 0;
      $(`.input-notification`).empty(); //clears the last message
      displayNotification(message);    //recursively sends back the message to re-render
    }
  };

  const navVisibilityToggle = function() {
    const scrollAmount = window.scrollY;
    const windowWidth = window.innerWidth;
    if (scrollAmount > 300 && windowWidth < 1024) {
      document.querySelector('.nav-container').classList.add('nav-hidden');
    }  else {
      document.querySelector('.nav-container').classList.remove('nav-hidden');
    }
  };

  //------------------  Section for Listeners ------------------

  //listens for scroll to dynamically change nav opacity
  $(document).on('scroll', ()=>{
    navVisibilityToggle(`scroll event`);
  });

  //catches any nav display errors if we resize our window horizontally
  $(document).on('resize', ()=>{
    navVisibilityToggle(`resize event`);
  });

  //listens for when submit is called on the button corresponding to the form
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();

    const tweetText = $(this).find('textarea').val().trim(); //handles empty inputs and tweets composed of only spaces
    const $tweetInput = $(this).serialize(); //the actual data to be posted
    
    if (tweetText.length === 0) {
      displayNotification("Cannot submit an empty tweet!");
    } else if (tweetText.length > 140) {
      displayNotification("Tweet is over the character limit!");
    } else {
      $.ajax({
        url: `/tweets`,
        method: 'POST',  // HTTP methods are: 'GET', 'POST', 'PUT', 'DELETE'
        data: $tweetInput,
        success: function() {
          $(`.input-notification`).css({'display': 'none' }); //removes notification on successful input
          loadTweets(); //Re-loads the tweets again from the updated library
        },
        error: function(error) {
          console.error(`$.ajax ${this.method} request error on route: ${this.url}!\nDetails:`, error);
        }
      });
    }    
  }); // --------- end of #tweet-form listener ---------
  
}); // --------- end of $(document).ready ---------