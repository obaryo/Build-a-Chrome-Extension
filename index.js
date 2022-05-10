let myLeads = []
let oldLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function(){

    // will only work on extension mode
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
        
    }) 
 
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {

        listItems +=    
            `<li>
                <a target='_blank' href = '${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>`
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value) //to get the value from input to array
    // Clear out the input field
    inputEl.value = ""   

    //  Save the myLeads array to localStorage 
     // PS: remember JSON.stringify()
     localStorage.setItem("myLeads", JSON.stringify(myLeads))

    render(myLeads) 
    
    // To verify that it works:
    console.log( localStorage.getItem("myLeads") )
    
})

