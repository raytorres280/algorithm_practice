var combinationSum = function (candidates, target) {
    //need the closure to handle the end of function
    let answer = recursion(candidates, target);

    const fin = filterDupes(answer);
    
    console.log(fin);
    return fin;

    function recursion(cand, tarjay) {
        if (tarjay === 0) {
            //the last function call before this had a solution.
            return true;
        }
        if (tarjay < 0) {
            //this isnt a solution, you went too far
            return false;
        }
        let answers = [];
    
        for (let i = 0; i < cand.length; i++) {
            let newTarget = tarjay - cand[i];
    
            let result = recursion(cand, newTarget);
    
            if (typeof (result) == "boolean" && result) {
                //if its true, save the value that got you there, and finish the current loop;
                answers.push([cand[i]]);
            }
            if (Array.isArray(result)) {
                for (let j = 0; j < result.length; j++) {
                    if (Array.isArray(result[j])) {
                        answers.push([cand[i], ...result[j]]);
                    } else {
                        let temp = result[j];
                        answers.push([temp, cand[i]]);
                    }
                }
            }
    
        }
        if (answers.length > 0) {
    
            //Set() isnt this intelligent.
            // for(let i = 0; i < answers.length; i++) {
            //     let temp = answers[i].sort();
            //     answers[i] = temp;
            // }
    
            // let uniqueAns = [...new Set(answers)];
            // return uniqueAns;
    
            return answers;
        }
    
    }
    
    function filterDupes(answers) {
        for (let i = 0; i < answers.length; i++) {
            //assume theres a dupe till you find a diff.
            let comparable = answers[i];

            if (answers.length > 1) {
                //if theres more than one array, 
                //you know you want to loop thru every other answer in answers[] to check for dupes.
                for (let j = 1; j < answers.length; j++) {

                    //within this loop you need a third loop to actually parse thru each answer list.

                    //refer to shorter of two array's length to avoid index out of bounds.
                    let lgth = Math.min(answers[i].length, answers[j].length);
                    let dupe = true;

                    //this code sorts to make sure the compares are 1:1. 
                    //[2,3], [3,2] wouldnt be detected otherwise.
                    let tmp = answers[i];
                    let tmp2 = answers[j];
                    answers[i] = tmp.sort();
                    answers[j] = tmp2.sort();

                    for (let k = 0; k < lgth; k++) {

                        if (answers[i][k] !== answers[j][k]) {
                            dupe = false;
                            break;
                        }
                    }

                    if (dupe) {
                        //you wana remove answer set i or j since theyre both the same.
                        answers.splice(j, 1);
                    }

                }
            }
        }
        return answers;
    }
};

const result = combinationSum([2, 3, 6, 7], 7);

console.log(result);