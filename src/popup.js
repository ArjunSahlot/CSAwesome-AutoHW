document.getElementById("answermcq").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/mcq.js']})
    })
})

document.getElementById("answerdd").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/dragndrop_code.js']})
    })
})

