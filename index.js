let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("tab-btn")
tabBtn.addEventListener("click",function() {
    chrome.tabs.query({active:true, currentWindow:true},function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)

    })
    
})
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a href="${leads[i]}" target="_blank" rel="noopener noreferrer">
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    let url = inputEl.value.trim()

    if (url === "") {
        alert("Please enter a URL!")
        return
    }

    // Add https:// if missing
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url
    }

    myLeads.push(url)
    inputEl.value = "" // Clear input
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
})
