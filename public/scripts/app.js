/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {

//------------------------------------//

  function renderTweets(tweets){
    for(let tweet in tweets){
      $(".all-tweets").prepend(createTweetElement(tweets[tweet]));
    }
  }

  function createTweetElement(tweet){
    let tweetBody         = tweet.content.text,
        tweetUserName     = tweet.user.name,
        tweetAvatar       = tweet.user.avatars.small,
        tweetHandler      = tweet.user.handle,
        tweetCreateDate   = moment(tweet.created_at).fromNow(),
        tweetId                = tweet._id,
        tweetLikes             = tweet.likes;

    const $tweet =
      `
        <article class="tweet tweet-template flex">
          <header>
            <span>
              <img src="${tweetAvatar}" alt="tweet-avatar" class="user-avatar> tweetCard-avatar">
            </span>
            <h2 id="userId">${tweetHandler}</h2>
          </header>
          <span class="tweet-content">
            <p>${tweetBody}</p>
          </span>
          <footer>
            ${tweetCreateDate}
            <span id="tweet-icons">
              <p class="like-count">${tweetLikes}</p>
              <i class="fa fa-heart" id="fav-heart" style="cursor:pointer;" aria-hidden="true" data-id="${tweetId}"></i>
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
            </span>
          </footer>
        </article>
      `;
    return $tweet;
  }

  function loadTweets(){
    $.get("/tweets/", (data) => {
      return renderTweets(data);
    });
  }

  loadTweets();

  //TOGGLE TWEET COMPOSE
  $('#toggle-compose').on("click", function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle();
    $(".compose-text").focus();
  });


  //Post from tweet compose
  $('#tweet-compose').on("submit", function(event) {
    event.preventDefault();
    let tweetCompose = $('#tweet-textarea').val().length;
    if(tweetCompose !== 0 && tweetCompose < 140){
      $.post("/tweets/", $(this).serialize(), (data) => {

        $('#tweet-textarea').val("");
        $('.all-tweets').html("");

        loadTweets();

        $(".new-tweet").slideUp();//toggles back up after submit
      });
    } else {

      //more validation goes here
        //--form should not clear textarea, despite error
    }
  });

  //post from
    //if no cookie from previous session like, increment
      //post to ? using $.ajax
    //else decrement
      //delete to ? db

  //Post from tweet favorite heart Icon
  $('#fav-heart').on('click', function(event) {
    // event.preventDefault();
    console.log("Hello???!");
    $.ajax({
      method: "POST",
      // url: "some.php",
      // data: { name: "John", location: "Boston" }
    })
    .done( (msg) => {
      // alert( "Data Saved: " + msg );
    });

  });

});


