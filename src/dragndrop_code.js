// DRAGNDROP CODE
var MAX_DRAGNDROP_LENGTH = 5;
var dropdowns = [];

for (var parson of document.getElementsByClassName("parsons")) {
    if (parson?.classList?.length == 1) {
        dropdowns.push(parson);
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

for (var i = 0; i < dropdowns.length; i++) {
    var dropdown = dropdowns[i];
    var source = dropdown.getElementsByClassName("source")[0];
    var answer = dropdown.getElementsByClassName("answer")[0];
    var submitButton = dropdown.getElementsByClassName("btn btn-success")[0];

    const infoBox = dropdown.getElementsByClassName("alert")[0];
    if (infoBox?.classList.contains("alert-info")) {
        continue;
    }

    const blocks = [];
    for (var block of source?.children) {
        blocks.push(block);
    }

    if (blocks.length > MAX_DRAGNDROP_LENGTH) {
        alert(`Too many blocks left in dropdown ${i + 1}! Please solve ${blocks.length - MAX_DRAGNDROP_LENGTH} more blocks or else your browser will crash!`);
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
            for (var block of answer.children) {
                block.remove();
            }

            for (var block of presetBlocks) {
                answer.appendChild(block);
            }

            for (var block of permutations[j]) {
                answer.appendChild(block);
            }

            submitButton.click();

            const infoBox = dropdown.getElementsByClassName("alert")[0];
            if (infoBox.classList.contains("alert-info")) {
                solved = true;
                break;
            }
        }
    }

    if (!solved) {
        alert(`Dropdown ${i + 1} could not be solved!`);
    }
}

