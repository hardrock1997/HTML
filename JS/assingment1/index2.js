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
    const requiredData2=getRequiredData2(recipes,[]);
    const requiredData3=getRequiredData3(recipes,[]);
    displayRequiredData(requiredData,requiredData1,requiredData2,requiredData3);
}
main();



function displayRequiredData(data1=[],data2=[],data3=[],data4=[]) {
    const div=document.getElementById("name_cuisines");
    const h1=document.createElement('h1');
    h1.textContent="Total Recipes";
    const ul=document.createElement("ul");
    const div2=document.getElementById("filtered_name_cuisines");
    const h2=document.createElement('h1');
    h2.textContent="Filtered Recipes by rating > 4.5";
    const ul2=document.createElement("ul");
    const div3=document.getElementById("indian_italian_tag_dishes");
    const h3=document.createElement("h1");
    h3.textContent="Recipes with Indian or Italian tags";
    const ul3=document.createElement("ul");
    const div4=document.getElementById("tag_wise_frequency");
    const h4=document.createElement("h1");
    h4.textContent="Tagwise frequency";
    const ul4=document.createElement("ul");

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
    if(data3) {
        for(let i=0;i<data3.length;++i) {
            const li=document.createElement("li");
            li.textContent=`${i+1} : Name:${data3[i]['name']}`;
            ul3.appendChild(li);
        }
        div3.appendChild(h3);
        div3.appendChild(ul3);
    }
    if(data4) {
        for(let i=0;i<data4.length;++i) {
            const li=document.createElement("li");
            li.textContent=`${i+1}: Tag:${data4[i][i]['tag']}...Frequency:${data4[i][i]['frequency']}`;
            ul4.appendChild(li);
        }
        div4.appendChild(h4);
        div4.appendChild(ul4);
    }
 
}


function getRequiredData3(recipes,arr) {
    const freqMap=new Map();

    for(let i=0;i<recipes.length;++i) {
        const tags=recipes[i].tags;
        for(let j=0;j<tags.length;++j) {
            if(freqMap.has(tags[j])) {
                const existingFreq=freqMap.get(tags[j]);
                freqMap.set(tags[j],existingFreq+1);
            }
            else {
                freqMap.set(tags[j],1);
            }
        }
    }

    let index=0;
    for(const [key,value] of freqMap) {
        const obj={};
        obj[index]={"tag":key,"frequency":value};
        arr.push(obj);
        index++;
    }
    return arr;
}


function getRequiredData2(recipes,arr) {

    //--------for Each---------
    recipes.forEach((rec)=>{
        const tags=rec.tags;
        if(tags.find((tag)=>tag==="Indian" || tag==="Italian")) {
            arr.push(rec);
        }
    })


    //--------filter then map---------
    // recipes.filter((rec)=>{
    //     const tags=rec.tags;
    //     return tags.find((tag)=>tag==="Indian" || tag==="Italian");
    // }).map((rec)=>{
    //     arr.push(rec);
    // })

    //--------flat map---------
    // recipes.flatMap((rec)=>{
    //     const tags=rec.tags;
    //         if(tags.find((tag)=>tag==="Indian" || tag==="Italian")) {
    //             arr.push(rec);
    //         }
    // })
    

    return arr;

    
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


    //--------flatMap---------
    // recipes.flatMap((rec)=>{
    //     if(rec['rating']>4.5) {
    //         arr.push(rec);
    //     }
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






