$(document).ready(function(){

  var tiles = $('.tile');
  var num_clicks = 0;
  var selected = [];

  var is_current_selection_a_match = function() {
    var img1src = selected[0].find('img').attr('src');
    var img2src = selected[1].find('img').attr('src');

    return (img1src == img2src);

  };

  var handle_win = function() {
    alert('Good Job! You found all the matches in ' +num_clicks+ ' clicks!');
    window.location.href = window.location.href
  };

  var is_game_over = function() {
    return $('.tile.matched').size() == tiles.length
  };

  var is_two_selected = function() {
    return (selected.length == 2)
  };

  var increment_click_counter = function() {
    num_clicks++;
  };

  var activate_tile = function(tile) {
    tile.addClass('active');
    selected.push(tile);
  };

  var deactivate_tiles = function() {
    $('.tile.active').removeClass('active');
    selected = [];
  }

  var handle_click = function(tile) {
    var tile = $(this);
    if (tile.hasClass('active') || tile.hasClass('matched')) {
      return false;
    }
    if (is_two_selected()) {
      deactivate_tiles();
    }

    increment_click_counter();
    activate_tile(tile);

    // match?
    if (selected.length == 2 && is_current_selection_a_match()) {
      $.each(selected, function(index, matched_tile) {
        matched_tile.addClass('matched');
      });
      if (is_game_over()) {
        handle_win();
      }
    };
  }

  $.each(tiles, function(index, tile) {
    var tile = $(tile);
    tile.on('click', handle_click);
  });

});