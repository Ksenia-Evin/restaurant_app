import readline from 'readline';

function userPrompt(menu) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      rl.question("\nHi, you can choose to show the menu or add a meal to the menu. Type 'show' to display the menu, 'add' to add a meal, 'order' to order meals: ", (answer) => {
        if (answer === 'show') {
            console.log(menu.getMenu())
        }
        if (answer === 'add') {
            rl.question("Please, write the name of the meal, price, and time to cook (separated by comma and space): ", (mealToAdd) => {
                const formattedMeal = mealToAdd.split(", ");
                const name = formattedMeal[0];
                const price = Number(formattedMeal[1]);
                const time = Number(formattedMeal[2]);
                menu.addMeal(name, price, time);
                console.log(menu.getMenu());
            });
        }
        if (answer === 'order') {
            rl.question("Please, write the names of the meal (separated by comma and space): ", (mealsToOrder) => {
                const mealsToCook = mealsToOrder.split(", ");
                rl.question("Please, write your comments for each client (separated by comma and space): ", (comments) => {
                    const commentsFromClients = comments.split(", ");
                    rl.question("Please, write your tableName: ", async (tableName) => {
                        const tableId = tableName;
                        const response = await fetch(url);
                        const data = await response.json();
                    })
                })
            });
        }
    });
    
    rl.on("close", function() {
        console.log("\nBYE BYE !!!");
        process.exit(0);
    });
}

export {userPrompt}
