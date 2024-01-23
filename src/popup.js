document.getElementById("answermcq").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/mcq.js']})
    })
})

document.getElementById("answerddc").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/dragndrop_code.js']})
    })
})

document.getElementById("answerddd").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/dragndrop_definition.js']})
    })
})

document.getElementById("answercode").addEventListener("click", () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['src/code_boxes.js']})
    })
})

