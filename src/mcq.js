// MCQ QUESTION BOXES
var questionBoxes = document.getElementsByClassName("runestone-component-ready");


for (var box of questionBoxes) {
    try {
        var form = box.getElementsByTagName("form")[0];
        var answers = form.getElementsByTagName("input");
        var submitButton = form.getElementsByClassName("btn btn-success")[0];

        for (var answer of answers) {
            answer.checked = true;
            submitButton.click();

            const infoBox = box.getElementsByClassName("alert")[0];
            if (infoBox.classList.contains("alert-info")) {
                break;
            }
        }
    } catch (e) {
        break;
    }
}

