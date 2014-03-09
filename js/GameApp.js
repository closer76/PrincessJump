var FRAMEINTERVAL = 1000 / 60;

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
    
    setInterval(m_update, FRAMEINTERVAL);
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
      
      for ( var i in gameData.Actors)
      {
        var actor = gameData.Actors[i];
        actor.x_dir = 2;
        actor.y_dir = 2;
        actor.move = function() { this.x += this.x_dir; this.y += this.y_dir;};
      }
    }
  };
  
  var m_update = function () {
    if ( gameData)
    {
      m_updateActors();      
      m_updateFrame();
    }
  };
  
  var m_updateActors = function()
  {
    for ( var i in gameData.Actors)
    {
      var actor = gameData.Actors[i];
      actor.move();
      if ( actor.x <= 0 || actor.x >= window.innerWidth) actor.x_dir = -actor.x_dir;
      if ( actor.y <= 0 || actor.y >= window.innerHeight) actor.y_dir = -actor.y_dir;
    }
  };
  
  var m_updateFrame = function ()
  {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    
    for ( var i in gameData.Actors)
    {
      var actor = gameData.Actors[i];
      ctx.fillText(i, actor.x, actor.y);
    }
  };
  
  return that;
};

