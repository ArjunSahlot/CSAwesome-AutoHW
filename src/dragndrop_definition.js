// DRAGNDROP DEFINITION
var dragndrops = [];

for (var container of document.getElementsByClassName("draggable-container runestone-component-ready")) {
    // if (container?.classList?.length == 1) {
        dragndrops.push(container);
    // }
}

function permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;

    while (i < length) {
        if (c[i] < i) {
            k = i % 2 && c[i];
            p = permutation[i];
            permutation[i] = permutation[k];
            permutation[k] = p;
            ++c[i];
            i = 1;
            result.push(permutation.slice());
        } else {
            c[i] = 0;
            ++i;
        }
    }
    return result;
}

function combinations(valuesArray) {
    var combi = [];
    var temp = [];
    var slent = Math.pow(2, valuesArray.length);

    for (var i = 0; i < slent; i++) {
        temp = [];
        for (var j = 0; j < valuesArray.length; j++) {
            if ((i & Math.pow(2, j))) {
                temp.push(valuesArray[j]);
            }
        }
        if (temp.length > 0) {
            combi.push(temp);
        }
    }
    return combi;
}

for (var i = 0; i < dragndrops.length; i++) {
    var dragndrop = dragndrops[i];
    var zones = dragndrop.getElementsByClassName("rsdraggable");
    var source = zones[0];
    var answer = zones[1];

    if (source?.children?.length !== answer?.children?.length) {
        alert(`CSAwesome-AutoHW doesn't know how to solve Drag-n-Drop ${i + 1} because it doesn't follow a 1-to-1 mapping!`);
    }

    var submitButton = dragndrop.getElementsByClassName("btn btn-success drag-button")[0];

    const infoBox = dragndrop.getElementsByClassName("alert")[0];
    if (infoBox?.classList.contains("alert-info")) {
        continue;
    }

    const blocks = [];
    for (var block of source?.children) {
        blocks.push(block);
    }
    console.log(blocks);

    var solved = false;

    const permutations = permute(blocks);
    for (var j = 0; j < permutations?.length; j++) {
        console.log(j);
        for (var block of answer?.children) {
            block.replaceChildren();
        }

        for (var k = 0; k < blocks.length; k++) {
            answer.children[k].appendChild(permutations[j][k]);
        }

        submitButton.click();

        const infoBox = dragndrop.getElementsByClassName("alert")[0];
        if (infoBox.classList.contains("alert-info")) {
            solved = true;
            break;
        }
    }

    if (!solved) {
        alert(`Drag-N-Drop ${i + 1} could not be solved!`);
    }
}


