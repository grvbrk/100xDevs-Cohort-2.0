import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
    ]);

    // Your code starts here
    const totalValue = React.useMemo(()=>{
        let total = 0
        console.log("Ran")
        for(let {name, value} of items){
            total+=value
        }
        return total
    }, [items]);
    // Your code ends here

    function handleClick(){
        const item = {name: "Random Name", value:10}
        setItems((prevItems)=>{
            return [...prevItems, item]
        })
    }

    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <button onClick={handleClick}>Add more items</button>
            <p>Total Value: {totalValue}</p>
        </div>
    );
};

export default Assignment3;