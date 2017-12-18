

//Shorthand for document.ready
$(() => {
  $("#tweet-textarea").on('keyup', charCount);
});

function charCount(){
  let counter = $(this)
    .parents(".new-tweet")
    .find(".counter");

  let length = $(this).val().length,
      maxValue = 140;

  if (length >= 140) {
    counter.text((maxValue - length)).css({
      color: '#FF1654'
    });
  } else {
    counter.text((maxValue - length)).css({
      color:'#fff'
    });
  }
}