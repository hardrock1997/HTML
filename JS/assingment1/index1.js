const p=prompt("Enter the number of users");
let pInt=Number(p);
const names=[];
while(pInt>0) {
    const name=prompt("Enter the name of the user")
    pInt=pInt-1;
    names.push(name);
}
const div=document.getElementById("names");
const ol=document.createElement("ol");

function insertUserNamesInDiv(names) {
    const n=names.length;
    for(let i=0;i<n;++i) {
        createListElement(names[i]);
        // document.write(`${i+1}.${names[i]}<br>`);
    }
}

function createListElement(name) {
    const li=document.createElement("li");
    li.textContent=name;
    ol.appendChild(li);
}
insertUserNamesInDiv(names);
div.appendChild(ol);
