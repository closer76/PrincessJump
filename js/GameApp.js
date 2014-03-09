var GameApp = function() {
  var that = {};
  var gameData = null;

  // 2D context
  var canvas = null;
  var ctx = null;
  
  // Actors
  var actors = [];
  
  var run = function() {
    // Check if we are using Retina Display
    var scale = window.devicePixelRatio;

    // Create canvas object
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
    canvas.style.width = window.innerWidth.toString() + 'px';
    canvas.style.height = window.innerHeight.toString() + 'px';

    // Insert canvas into HTML body
    var body = document.getElementsByTagName('body')[0];
    if ( body) {
      body.appendChild(canvas);
    } else {
      console.log("No HTML body found!");
    }
      
    // Create 2D context
    ctx = canvas.getContext("2d");
    ctx.scale(scale,scale);
    ctx.fillText( "Hello Canvas!", 100, 100);

    // Load data file
    m_getResource( 'data/GameData.json', m_parseGameData);
    
    // Initialize actors
    
  };
  that.run = run;  // export run()
  
  var m_getResource = function( url, callback, type) {
    if (url)
    {
      var xhr = new XMLHttpRequest();
      xhr.open( 'GET', url, true);
      if ( type)
      {
        xhr.responseType = type;
      }
      
      xhr.onload = function() {
        if (callback) {
          callback(xhr);
        }
      };
      
      xhr.send();
    }
  };
  
  var m_parseGameData = function(xhr)
  {
    var parsed = JSON.parse(xhr.responseText);
    if (parsed)
    {
      gameData = parsed;
      console.log("It\'s ok!");
      console.log(gameData.Name);

      m_update();

    }
  };
  
  var m_update = function () {
    m_updateActors();
    
    m_updateFrame();
  };
  
  var m_updateActors = function()
  {
  };
  
  var m_updateFrame = function ()
  {
    for ( var i in gameData.Actors)
    {
      var actor = gameData.Actors[i];
      console.log(actor);
      ctx.fillText(actor.name, actor.x, actor.y);
    }
  };
  
  return that;
};

