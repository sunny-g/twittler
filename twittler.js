$(document).ready(function(){

  // creates new user on pageload, adds the name to the global users arr
  var newUser = prompt('What is you desired username?');
  window.visitor = newUser;
  streams.users[newUser] = [];
  users.push(newUser);


  // create navbar, create pill for each user
  // if you add user, create new pill
  // make first pill active
  var $navbar = $('#navbar');
  var $pill = $('<li class="active users-tweets"></li>');
  var $link = $('<a href="#">All Tweets</a>');
  $navbar.append($pill.append($link));
  users.forEach(function(user) {
    var $pill = $('<li class="users-tweets"></li>');
    var $link = $('<a href="#">@' + user + '</a>');
    $pill.append($link);
    $navbar.append($pill)
  });

  var $autoRefreshButton = $('<li id="auto-refresh">' +
    '<button class="btn btn-default" type="button">Auto Refresh</button>' +
    '</li>');
  var $getTweetsButton = $('<li id="get-new-tweets">' +
    '<button class="btn btn-primary" type="button">Get New Tweets</button>' +
    '</li>');
  $navbar.append($getTweetsButton);
  $navbar.append($autoRefreshButton);

  $('#userNav').append($navbar);
  displayTweets('All Tweets');



  // EVENTS
  /////////

  $('#submitTweet').on('click', function(e) {
    e.preventDefault();
    var msg = $('#innerWriteBox').val();
    writeTweet(msg);
  });

  $('.nav').on('click', '.users-tweets', function(e) {
    e.preventDefault();

    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    var tabName = $(this).find('a').text();
    displayTweets(tabName);
  });

  $('#auto-refresh').on('click', 'button', function(e) {
    e.preventDefault();

    $(this).toggleClass('btn-success');

    if ($(this).hasClass('btn-success')) {
      autoRefresh = setInterval(getNewTweets, 2000);
    } else {
      clearInterval(autoRefresh);
    }
  });

  $('#get-new-tweets').on('click', 'button', function(e) {
    e.preventDefault();
    getNewTweets();
  });

  // FUNCTIONS
  ////////////

  function getNewTweets() {
    var name = $('li.users-tweets.active').find('a').text();
    displayTweets(name);
  }

  function displayTweets(name) {
    // console.log('displaying tweets...');

    name = name || $('li.users-tweets.active').find('a').text();

    var $tweetBox = $('#tweetBox');
    $tweetBox.html('');

    var index;
    var tweetList;
    if (name === 'All Tweets') {
      tweetList = streams.home;
      index = tweetList.length - 1;
    } else {
      name = name.slice(1, name.length);
      tweetList = streams.users[name];
      index = tweetList.length - 1;
    }

    while (index >= 0) {
      var tweet = tweetList[index];
      var $tweet = $('<div class="tweet darkwell"></div>');

      var $blockquote = $('<blockquote></blockquote>');
      $blockquote.append($('<p>' + tweet.message + '</p>'));
      $blockquote.append($('<small>@' + tweet.user +', ' + moment(tweet.created_at).fromNow() + '</small>'));

      $tweet.append($blockquote);
      // $tweet.text()
      $tweet.appendTo($tweetBox);
      index -= 1;

    }
  }


});