async function getData() {
    const res=await fetch("./data.json");
    const data=await res.json();
    return data;
}

async function main() {
    const data= await getData()
    const recipes=data.recipes;
    const requiredData=getRequiredData(recipes,[]);
    displayRequiredData(requiredData);
}
main();


function displayRequiredData(data) {
    const div=document.getElementById("name_cuisines");
    const ul=document.createElement("ul");
    for(let i=0;i<data.length;++i) {
        const li=document.createElement("li");
        li.textContent=`${i+1} : Name:${data[i][i+1]['name']},Cuisine:${data[i][i+1]['cuisine']}`;
        ul.appendChild(li);
    }
    div.appendChild(ul);

}

function getRequiredData(recipes,arr) {
    //--------for loop---------
    for(let i=0;i<recipes.length;++i) {
        const obj={};
        obj[`${recipes[i]['id']}`]={
            "name":recipes[i]["name"],
            "cuisine":recipes[i]["cuisine"]
        }
        arr.push(obj);
    }

    //--------for Each---------
    recipes.forEach((rec)=>{
        const obj={};
        obj[rec.id]={
            "name":rec.name,
            "cuisine":rec.cuisine
        }
        arr.push(obj);
    })

    //--------map---------
    recipes.map((rec)=>{
        const obj={};
        obj[rec.id]={
            "name":rec.name,
            "cuisine":rec.cuisine
        }
        arr.push(obj);
    })
    
    return arr;
}






