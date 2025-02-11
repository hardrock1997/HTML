async function getData() {
    const res=await fetch("./data.json");
    const data=await res.json();
    return data;
}

async function main() {
    const data= await getData()
    const recipes=data.recipes;
    const requiredData=getRequiredData(recipes,[]);
    const requiredData1=getRequiredData1(recipes,[]);
    displayRequiredData(requiredData,requiredData1);
}
main();


function displayRequiredData(data1=[],data2=[]) {
    const div=document.getElementById("name_cuisines");
    const h1=document.createElement('h1');
    h1.textContent="Total Recipes";
    const ul=document.createElement("ul");
    const div2=document.getElementById("filtered_name_cuisines");
    const h2=document.createElement('h1');
    h2.textContent="Filtered Recipes by rating > 4.5";
    const ul2=document.createElement("ul");
    if(data1) {
        for(let i=0;i<data1.length;++i) {
            const li=document.createElement("li");
            li.textContent=`${i+1} : Name:${data1[i][i+1]['name']},Cuisine:${data1[i][i+1]['cuisine']}`;
            ul.appendChild(li);
        }
        div.appendChild(h1);
        div.appendChild(ul);
    }
    if(data2) {
        for(let i=0;i<data2.length;++i) {
            const li=document.createElement("li");
            li.textContent=`${i+1} : Name:${data2[i]['name']},Cuisine:${data2[i]['cuisine']}`;
            ul2.appendChild(li);
        }
        div2.appendChild(h2);
        div2.appendChild(ul2);
    }
 
}


function getRequiredData1(recipes,arr) {
    //--------for loop---------
    for(let i=0;i<recipes.length;++i) {
        if(recipes[i]['rating']>4.5) {
            let obj={}
            obj=recipes[i];
            arr.push(obj);
        }
    }


    //--------for Each---------
    // recipes.forEach((rec)=>{
    //     let obj={}
    //     obj=rec
    //     arr.push(obj);
    // })

    //--------map---------
    // recipes.map((rec)=>{
    //     let obj={}
    //     obj=rec
    //     arr.push(obj);
    // })
    return arr;
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

    // //--------for Each---------
    // recipes.forEach((rec)=>{
    //     const obj={};
    //     obj[rec.id]={
    //         "name":rec.name,
    //         "cuisine":rec.cuisine
    //     }
    //     arr.push(obj);
    // })

    // //--------map---------
    // recipes.map((rec)=>{
    //     const obj={};
    //     obj[rec.id]={
    //         "name":rec.name,
    //         "cuisine":rec.cuisine
    //     }
    //     arr.push(obj);
    // })
    
    return arr;
}






