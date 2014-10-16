code_map = {
    "L" : 37,
    "U" : 38,
    "R" : 39,
    "D" : 40
}

function press(key) {
    var code = code_map[key]
    var eventObj = document.createEvent("Events");
    eventObj.initEvent("keydown", true, true);
    eventObj.which = code;
    document.body.dispatchEvent(eventObj);
}

function play_2048() {
    press("L");
    press("D");
    setTimeout(play_2048, 500);
}

play_2048();
