export const augmentWithYOYGrowth = (statements) => {
    // Assume the statement in chronological order.
    if (statements.length <= 1) {
        return statements;
    }
    return statements.map((statement, index) => {
        if (index <= 0) {
            return statement;
        }
        statement = fillYOY(statements[index-1], statement, ["revenue", "grossProfit"]);
        return statement;
    });
};

const fillYOY = (prevStatement, curStatement, itemNames) => {
    curStatement["yoy"] = {}
    for (let itemName of itemNames) {
        const current = curStatement[itemName];
        const past = prevStatement[itemName];
        curStatement["yoy"][itemName] = (current - past)/past;
    }
    return curStatement;
};