function generateRecommendation(userQuery){

    const query =
    userQuery.toLowerCase();

    let category = "";
    let budget = null;

    const budgetMatch =
    query.match(/under\s?(\d+)/i);

    if(budgetMatch){

        budget =
        parseInt(budgetMatch[1]);
    }

    if(
        query.includes("phone") ||
        query.includes("iphone")
    ){

        category = "smartphone";
    }

    else if(
        query.includes("laptop")
    ){

        category = "laptop";
    }

    else if(
        query.includes("protein")
    ){

        category = "protein powder";
    }

    else if(
        query.includes("shoes")
    ){

        category = "shoes";
    }

    else{

        category = userQuery;
    }

    let optimizedSearch = category;

    if(budget){

        optimizedSearch +=
        ` under ${budget}`;
    }

    return {

        originalQuery:userQuery,

        optimizedSearch,

        budget,

        category,

        ai:true
    };
}

module.exports =
generateRecommendation;