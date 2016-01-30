function trace(msg) {
    var begin = "<ul><li>";
    var middle = "</li><li>";
    var end = "</li></ul>";
    var MAX_LINES = 12;

    var outputWindow = document.getElementById("trace");
    var lines = outputWindow.innerHTML.toLowerCase();
    var lineList;

    if (lines.length > 0) {
        lineList = lines.substring(begin.length, lines.length - end.length).split(middle);
        while (lineList.length >= MAX_LINES)
            lineList.shift();
        lineList.push(msg);
    } else {
        lineList = [msg];
    }

    outputWindow.innerHTML = begin + lineList.join(middle) + end;
}

module.exports = trace;
