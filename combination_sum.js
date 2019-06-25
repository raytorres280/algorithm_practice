var combinationSum = function(candidates, target) {
    //recursive base cases
    
    if(target === 0) {
        //the last function call before this had a solution.
        return true;
    }
    if(target < 0) {
        //this isnt a solution, you went too far
        return false;
    }
    let answers = [];

    for(let i = 0; i < candidates.length; i++) {
        let newTarget = target - candidates[i];
        
        let result = combinationSum(candidates, newTarget);
        
        if(typeof(result) == "boolean" && result) {
            //if its true, save the value that got you there, and finish the current loop;
            answers.push([candidates[i]]);
        }
        if(Array.isArray(result)) {
            for(let j = 0; j < result.length; j++) {
                if(Array.isArray(result[j])) {
                    answers.push([candidates[i], ...result[j]]);
                } else {
                    let temp = result[j];
                    answers.push([temp, candidates[i]]);
                }
            }
        }
        
    }
    if(answers.length > 0) {
        let temp = answers.map(a => a.toString());
        temp = [...new Set(temp)];
        temp = temp.map(i => {
            let strArry = i.split(",");
            let intArry = strArry.map(ch => parseInt(ch));
            return intArry;
        });
        return temp.sort();
    }

    
};

const result = combinationSum([2, 3, 6, 7], 7);

console.log(result);