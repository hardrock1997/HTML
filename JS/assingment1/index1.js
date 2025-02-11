


// //Run Each part by commenting the others!



// //---------part a-------------
// const p=prompt("Enter the number of users");
// let pInt=Number(p);
// const names=[];
// while(pInt>0) {
//     const name=prompt("Enter the name of the user")
//     pInt=pInt-1;
//     names.push(name);
// }
// const div=document.getElementById("names");
// const ol=document.createElement("ol");

// function insertUserNamesInDiv(names) {
//     const n=names.length;
//     for(let i=0;i<n;++i) {
//         createListElement(names[i]);
//         // document.write(`${i+1}.${names[i]}<br>`);
//     }
// }

// function createListElement(name) {
//     const li=document.createElement("li");
//     li.textContent=name;
//     ol.appendChild(li);
// }
// insertUserNamesInDiv(names);
// div.appendChild(ol);


// //---------part b-------------
// const p = prompt("Enter the number of fields");
// let promptInt=+p;
// const keyValue={};
// while(promptInt>0) {
//     const kp=prompt("Enter the key for the field");
//     const vp=prompt("Enter the value for the field");
//     keyValue[`${kp}`]=vp;
//     promptInt--;
// }

// function displayKeyValuePairs(keyValue) {
//     for (let [key, value] of Object.entries(keyValue)) {
//         document.write(`${key}.${value}<br>`)
//     }
// }
// displayKeyValuePairs(keyValue)


// //---------part c-------------
// const p = prompt("Enter the number of players");
// let promptInt=+p;
// const keyValueArray=[];
// while(promptInt>0) {
//     const np=prompt("Enter the name of the player");
//     const sp=prompt("Enter their score");
//     const obj={};
//     obj[`${np}`]=sp;
//     keyValueArray.push(obj);
//     promptInt--;
// }
// function comparator(a,b) {
//     const nameA=Object.keys(a)[0];
//     const scoreA=+Object.values(a)[0];
//     const nameB=Object.keys(b)[0];
//     const scoreB=+Object.values(b)[0];
//     if(scoreA===scoreB) {
//         if(nameA<nameB)return -1;
//         if(nameA>nameB)return 1;
//         return 0;
//     }
//     return scoreA-scoreB;
// }
// function displayPlayerScore(keyValueArray) {
//     keyValueArray.sort(comparator);
//     for(const p of keyValueArray) {
//         const name=Object.keys(p)[0];
//         const score=Object.values(p)[0];
//         document.write(`${name} -> ${score}<br>`)
//     }
// }
// displayPlayerScore(keyValueArray)


// //---------part d-------------
// const p = prompt("Enter the number of students");
// let promptInt=+p;
// const keyValueArray=[];
// while(promptInt>0) {
//     const np=prompt("Enter the name of the student");
//     const sp=prompt("Enter their scores in CSV format");
//     const scoreObj=getScores(sp);
//     const obj={};
//     obj[`${np}`]=scoreObj;
//     keyValueArray.push(obj);
//     promptInt--;
// }
// displayScores(keyValueArray)
// function displayScores(keyValueArray) {
//     keyValueArray.sort(comparator)
//     for(const p of keyValueArray) {
//         const scores=Object.values(p)[0];
//         const name=Object.keys(p)[0];
//         document.write(`${name} -> Maths score:${scores['maths']}, Science score:${scores['science']}, Arts score:${scores['arts']}, Total score:${scores['total']}<br>`);
//     }
// }
// function comparator(a,b) {
//     const nameA=Object.keys(a)[0];
//     const nameB=Object.keys(b)[0];
//     const scoresA=Object.values(a)[0];
//     const scoresB=Object.values(b)[0];
//     if(scoresA.total===scoresB.total) {
//         if(scoresA.maths===scoresB.maths) {
//             return nameA.localeCompare(nameB);
//         }
//         return scoresA.maths-scoresB.maths
//     }
//     return scoresA.total-scoresB.total

// }
// function getScores(s) {
//     let i=0,j=0,n=s.length,total=0;
//     scores=[];
//     while(j<n) {
//         if(s[j]==',') {
//             const x=s.substring(i,j);
//             total+=+x;
//             scores.push(x);
//             ++j;
//             i=j;
//         }
//         else {
//             ++j;
//         }
//     }
//     const x=s.substring(i,j);
//     total+=+x;
//     scores.push(x);
//     const scoreObj=getScoreObj(scores,total);
//     return scoreObj;
// }
// function getScoreObj(scores,total) {
//     const scoreObj={};
//     scoreObj['maths']=+scores[0];
//     scoreObj['science']=+scores[1];
//     scoreObj['arts']=+scores[2];
//     scoreObj['total']=total
//     return scoreObj; 
// }
