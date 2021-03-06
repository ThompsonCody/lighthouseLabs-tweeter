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
              <!-- <p class="like-count">${tweetLikes}</p> -->
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


  function composerToggle(){
    $(".new-tweet").slideToggle();
    $(".compose-text").focus();
  }


  $('#toggle-compose').on("click", composerToggle);


  //Post from tweet compose

  function tweetHandler(event){
    event.preventDefault();
    let tweetCompose = $('#tweet-textarea').val().length;
    if(tweetCompose !== 0 && tweetCompose < 140){
      $.post("/tweets/", $(this).serialize(), (data) => {

        $('#tweet-textarea').val("");
        $('.all-tweets').html("");

        loadTweets();

        $(".new-tweet").slideUp();//toggles back up after submit
      }).done(function() {
        $('.new-tweet').find('.counter').text('140');
      });
    } else if(tweetCompose == 0){
      alert("Tweet must contain an actual tweet");
      return;
    }
  }

  $('#tweet-compose').on("submit", tweetHandler);

  //Post from tweet favorite heart Icon - not working yet
  $('#fav-heart').on('click', function(event) {
    $.ajax({
      method: "POST",
    })
    .done( (msg) => {});

  });

});


