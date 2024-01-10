/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
*/

function calculateTotalSpentByCategory(transactions) {
  let result = [];
  let visited = new Set();
  for (let { category, price } of transactions) {
    if (!visited.has(category)) {
      visited.add(category);
      result.push({ category, totalSpent: price });
    } else {
      result = result.map((item) => {
        return item.category === category
          ? { ...item, totalSpent: item.totalSpent + price }
          : item;
      });
    }
  }
  return result;
}

module.exports = calculateTotalSpentByCategory;
