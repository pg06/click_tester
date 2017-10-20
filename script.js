document.addEventListener("DOMContentLoaded", function(event) {
});

var keyPressed = {mouse: [], key: []};
document.addEventListener("mousedown", function(event) {
  event.preventDefault();
  printClickEvent(event);
});
document.addEventListener("mouseup", function(event) {
  event.preventDefault();
  printClickEvent(event);
});
document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  console.log("Context menu!");
  return false;
});
document.addEventListener("keydown", function(event) {
  event.preventDefault();
  printClickEvent(event);
});
document.addEventListener("keyup", function(event) {
  event.preventDefault();
  printClickEvent(event);
});

function clearClicksBox(boxId) {
  document.getElementById(boxId).innerHTML = "";
}

function printClickEvent(event) {
  if(event.target.tagName == 'BUTTON') return;
  var button, action, actionLabel, eventType, element, notPressed, keyContainerId;
  if (event.type.indexOf('mouse') > -1) {
    eventType = 'mouse';
    button = getMouseButtonName(event);
    buttonCode = event.button;
  } else {
    eventType = 'key';
    button = getKeyboardButtonName(event);
    buttonCode = event.keyCode;
  }
  action = event.type.split(eventType)[1];
  actionLabel = action;
  element = document.getElementById(eventType + "ClickBox");
  keyContainerId = eventType + "-" + buttonCode + "--" + action;
  notPressed = keyPressed[eventType].indexOf(buttonCode) == -1;

  if (action == 'down') {
    if (notPressed) {
      keyPressed[eventType].push(buttonCode);
      actionLabel = 'pressing...';
    }
  } else {
    keyPressed[eventType].splice(keyPressed[eventType].indexOf(buttonCode));
  }

  if (action == 'up' || notPressed) {
    var ClickDIV = document.createElement('DIV');
    var ClickLabelSPAN = document.createElement('SPAN');
    var ClickActionSPAN = document.createElement('SPAN');
    var ClickCountSPAN = document.createElement('SPAN');
    ClickDIV.id = keyContainerId;
    ClickLabelSPAN.innerHTML = button;
    ClickActionSPAN.innerHTML = actionLabel;
    ClickCountSPAN.id = 'count';
    ClickCountSPAN.innerHTML = 1;
    ClickCountSPAN.title = 1;
    var outerHTML = [ClickLabelSPAN.outerHTML, ClickActionSPAN.outerHTML];
    if(action == 'down') outerHTML.push(ClickCountSPAN.outerHTML);
    ClickDIV.innerHTML = outerHTML.join('');
    if(action == 'up') {
      var prevElements = document.querySelectorAll('#' + keyContainerId.replace('up', 'down'));
      if(prevElements.length > 0) prevElements[prevElements.length - 1].children[1].innerHTML = 'down';
    }

    element.append(ClickDIV);
    element.scrollTo(0, element.scrollHeight);
  } else {
    var prevElements = document.querySelectorAll('#' + keyContainerId);
    var updateElement = prevElements[prevElements.length - 1];
    var pressCount = Number(updateElement.children[2].innerHTML) + 1;
    updateElement.children[2].innerHTML = pressCount;
    updateElement.children[2].title = pressCount;
  }
}

function getMouseButtonName(event) {
  return mouseMap[event.button] + ' (' + event.button + ')' ;
}

function getKeyboardButtonName(event) {
  return keyboardMap[event.keyCode] + ' (' + event.keyCode + ')' ;
}
