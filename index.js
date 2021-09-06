let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ulel")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const leadLocalS = JSON.parse( localStorage.getItem("myLeads") )
if (leadLocalS) {
    myLeads = leadLocalS
    renderLeads()
}
saveBtn.addEventListener("click",function() {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
        if (!myLeads.includes(tabs[0].url)){
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            renderLeads()
        }
    })
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    renderLeads()
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads()
})

function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; ++i) {
        listItems += `
        <li>
            <a target="_blank" href="${myLeads[i]}">${myLeads[i]}</a>
        </li>
        `
}
    ulEl.innerHTML = listItems 
}
//DOM manipulation has a cost for every operation. SO be carefull.