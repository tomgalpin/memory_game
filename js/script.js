$(document).ready(function(){

  var tiles = $('.tile');
  var num_clicks = 0;
  var selected = [];

  var is_current_selection_a_match = function() {
    var img1src = selected[0].find('img').attr('src');
    var img2src = selected[1].find('img').attr('src');

    return (img1src == img2src);

  };

  var handle_click = function(tile) {
    var tile = $(this);
    if (tile.hasClass('active') || tile.hasClass('matched')) {
      return false;
    }
    if (selected.length == 2) {
      $('.tile.active').removeClass('active');
      selected = [];
    }
    num_clicks++;
    tile.addClass('active');
    selected.push(tile);
    // match?
    if (selected.length == 2 && is_current_selection_a_match()) {
      $.each(selected, function(index, matched_tile) {
        matched_tile.addClass('matched');
      });
      if ($('.tile.matched').size() == tiles.length) {
        alert('Good Job! You found all the matches in ' +num_clicks+ ' clicks!');
        window.location.href = window.location.href
      }
    };
  }

  $.each(tiles, function(index, tile) {
    var tile = $(tile);
    tile.on('click', handle_click);
  });

});