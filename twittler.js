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
  var $pill = $('<li class="users-tweets"></li>');
  var $link = $('<a href="#">All Tweets</a>');
  $navbar.append($pill.append($link));
  users.forEach(function(user) {
    var $pill = $('<li class="users-tweets"></li>');
    var $link = $('<a href="#">@' + user + '</a>');
    $pill.append($link);
    $navbar.append($pill)
  });
  $($navbar.find('li')[0]).addClass('active');
  $body.append($navbar);

  $('.nav').on('click', '.users-tweets', function(e) {
    e.preventDefault();
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
  });




  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="well span6"></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($body);
    index -= 1;
  }







});