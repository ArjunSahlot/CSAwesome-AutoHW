// MCQ QUESTION BOXES
var questionBoxes = document.getElementsByClassName("runestone-component-ready");

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

for (var box of questionBoxes) {
    try {
        var form = box.getElementsByTagName("form")[0];
        var answers = form.getElementsByTagName("input");
        var submitButton = form.getElementsByClassName("btn btn-success")[0];

        if (box.innerHTML.toLowerCase().includes("select all")) {
            var answerList = [];
            for (var answer of answers) {
                answerList.push(answer);
            }

            var combos = combinations(answerList);
            for (var combo of combos) {
                for (var answer of answers) {
                    answer.checked = false;
                }

                for (var answer of combo) {
                    answer.checked = true;
                }

                submitButton.click();

                const infoBox = box.getElementsByClassName("alert")[0];
                if (infoBox.classList.contains("alert-info")) {
                    break;
                }
            }
        } else {
            for (var answer of answers) {
                answer.checked = true;
                submitButton.click();

                const infoBox = box.getElementsByClassName("alert")[0];
                if (infoBox.classList.contains("alert-info")) {
                    break;
                }
            }
        }
    } catch (e) {
        continue;
    }
}

