$(document).ready(function(){


  var $body = $('body');
  // $body.html('');

  // creates new user on pageload, adds the name to the global users arr
  var newUser = prompt('What is you desired username?');
  streams.users[newUser] = [];
  users.push(newUser);


  // create navbar, create pill for each user
  // if you add user, create new pill
  // make first pill active
  var $navbar = $('<ul class="nav nav-pills"></ul>');
  var $pill = $('<li class="active users-tweets"></li>');
  var $link = $('<a href="#">All Tweets</a>');
  $navbar.append($pill.append($link));
  users.forEach(function(user) {
    var $pill = $('<li class="users-tweets"></li>');
    var $link = $('<a href="#">@' + user + '</a>');
    $pill.append($link);
    $navbar.append($pill)
  });
  // $($navbar.find('li')[0]).addClass('active');
  $('.page-header').after($navbar);

  $('.nav').on('click', '.users-tweets', function(e) {
    e.preventDefault();

    $(this).addClass('active');
    $(this).siblings().removeClass('active');

    var tabName = $(this).find('a').text();
    displayTweets(tabName);
  });



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
      // console.log(name)
      tweetList = streams.users[name];
      index = tweetList.length - 1;
    }

    while (index >= 0) {
      var tweet = tweetList[index];
      var $tweet = $('<div class="well span6"></div>');
      var text = '@' + tweet.user + ': ' + tweet.message + tweet.created_at;
      // $tweet.text()
      $tweet.appendTo($tweetBox);
      index -= 1;

    }
  }



/*
autorefresh = displayTweets on a timer
 */




});