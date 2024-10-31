export function generateValidCombinations(items, combinationLength) {
    const results = [];

    function backtrack(startIndex, currentCombination) {
        if (currentCombination.length === combinationLength) {
            results.push([...currentCombination]);
            return;
        }

        for (let i = startIndex; i < items.length; i++) {
            const item = items[i];
            const prefixes = currentCombination.map(i => i.charAt(0));
            if (!prefixes.includes(item.charAt(0))) {
                currentCombination.push(item);
                backtrack(i + 1, currentCombination);
                currentCombination.pop();
            }
        }
    }

    backtrack(0, []);
    return results;
}

