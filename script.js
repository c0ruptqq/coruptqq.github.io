//Script for light theme toggle

const html = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
  window
    .getComputedStyle(element)
    .getPropertyValue(style);

const initialColors = {
  bg: getStyle(html, "--bg"),
}

const darkMode = {
  bg: "#F5FFFA", // override styles here
}

const transformKey = key => 
  "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

const changeColors = (colors) => {
  Object.keys(colors).map(key => 
    html.style.setProperty(transformKey(key), colors[key]) 
  );
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(initialColors);
});

const isExistLocalStorage = (key) => localStorage.getItem(key) != null;

const createOrEditLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

const getValeuLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

checkbox.addEventListener("change", ({ target }) => {
  if (target.checked) {
    changeColors(darkMode);
    createOrEditLocalStorage("mode", "darkMode");
  } else {
    changeColors(initialColors);
    createOrEditLocalStorage("mode", "initialColors");
  }
});

if (!isExistLocalStorage("mode"))
  createOrEditLocalStorage("mode", "initialColors");

if (getValeuLocalStorage("mode") === "initialColors") {
  checkbox.removeAttribute("checked");
  changeColors(initialColors);
} else {
  checkbox.setAttribute("checked", "");
  changeColors(darkMode);
}

//Script for the tile mouse movement

(function() {

  var container = document.getElementById("container"),
    inner = document.getElementById("inner");


  var mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition: function(event) {
      var e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin: function(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show: function() {
      return "(" + this.x + ", " + this.y + ")";
    }
  };


  mouse.setOrigin(container);

  var counter = 0;
  var updateRate = 10;
  var isTimeToUpdate = function() {
    return counter++ % updateRate === 0;
  };

  var onMouseEnterHandler = function(event) {
    update(event);
  };

  var onMouseLeaveHandler = function() {
    inner.style = "";
  };

  var onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  var update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner.offsetHeight / 2).toFixed(2),
      (mouse.x / inner.offsetWidth / 2).toFixed(2)
    );
  };

  var updateTransformStyle = function(x, y) {
    var style = "rotateX(" + x + "deg) rotateY(" + y + "deg)";
    inner.style.transform = style;
    inner.style.webkitTransform = style;
    inner.style.mozTransform = style;
    inner.style.msTransform = style;
    inner.style.oTransform = style;
  };

  container.onmouseenter = onMouseEnterHandler;
  container.onmouseleave = onMouseLeaveHandler;
  container.onmousemove = onMouseMoveHandler;
})();


Resources

