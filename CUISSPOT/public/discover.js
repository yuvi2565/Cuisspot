const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
// const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
let mapBtn = document.getElementsByClassName('recipe-btn')

// event listeners
searchBtn.addEventListener('click', getMealList);


// get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch("http://localhost:3000/food")

        .then(response => response.json())
        .then(data => {
            let html = "";
            if (data) {
                console.log(data);
                data.forEach(meal => {
                    html += `
                    <div class = "meal-item">
                        <div class = "meal-img">
                            <img src = "${meal.mealImage}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.mealName}</h3>
                            <h3>${meal.restName}</h3> 
                            <a href = "${meal.mapLink}" target = "_blank" class = "recipe-btn">Show in Maps</a>
                        </div>
                    </div>
                `;
                
                });
                mealList.classList.remove('notFound');
            } else {
                html = "Sorry, we didn't find any meal!";
                mealList.classList.add('notFound');
            }
            
            mealList.innerHTML = html;
        });

        
}

