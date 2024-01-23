// DRAGNDROP CODE
var MAX_DRAGNDROP_LENGTH = 5;
var dragndrops = [];

for (var parson of document.getElementsByClassName("parsons")) {
    if (parson?.classList?.length == 1) {
        dragndrops.push(parson);
    }
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
    var source = dragndrop.getElementsByClassName("source")[0];
    var answer = dragndrop.getElementsByClassName("answer")[0];
    var a = 1;
    while (!answer) {
        answer = dragndrop.getElementsByClassName("answer" + a)[0];
        a++;
    }
    var submitButton = dragndrop.getElementsByClassName("btn btn-success")[0];

    const infoBox = dragndrop.getElementsByClassName("alert")[0];
    if (infoBox?.classList.contains("alert-info")) {
        continue;
    }

    const blocks = [];
    for (var block of source?.children) {
        blocks.push(block);
    }

    if (blocks.length > MAX_DRAGNDROP_LENGTH) {
        alert(`Too many blocks left in Drag-N-Drop ${i + 1}! Please solve ${blocks.length - MAX_DRAGNDROP_LENGTH} more blocks or else your browser will crash!`);
        break;
    }

    const presetBlocks = [];
    for (var block of answer?.children) {
        presetBlocks.push(block);
    }

    var solved = false;

    const combs = combinations(blocks);
    for (var c = 0; c < combs?.length; c++) {
        const miniSet = combs[c];

        const permutations = permute(miniSet);
        permutations.push([]);
        for (var j = 0; j < permutations?.length; j++) {
            answer.replaceChildren();

            for (var block of presetBlocks) {
                answer.appendChild(block);
            }

            for (var block of permutations[j]) {
                answer.appendChild(block);
            }

            submitButton.click();

            const infoBox = dragndrop.getElementsByClassName("alert")[0];
            if (infoBox.classList.contains("alert-info") || infoBox.innerHTML.includes("These blocks are not indented correctly.")) {
                solved = true;
                break;
            }
        }
    }

    if (!solved) {
        alert(`Drag-N-Drop ${i + 1} could not be solved!`);
    }
}

