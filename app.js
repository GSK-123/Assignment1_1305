const data = [
    {
      id: 1,
      name: "Apple",
      category: "Fruits",
      price: 0.5,
      inStock: true,
      description: "A crisp, sweet red apple.",
      nutrition: {
        calories: 52,
        fat: 0.2,
        carbohydrates: 14,
        protein: 0.3
      }
    },
    {
      id: 2,
      name: "Banana",
      category: "Fruits",
      price: 0.3,
      inStock: true,
      description: "A ripe, yellow banana.",
      nutrition: {
        calories: 89,
        fat: 0.3,
        carbohydrates: 23,
        protein: 1.1
      }
    },
    {
      id: 3,
      name: "Carrot",
      category: "Vegetables",
      price: 0.2,
      inStock: true,
      description: "A fresh, crunchy carrot.",
      nutrition: {
        calories: 41,
        fat: 0.2,
        carbohydrates: 10,
        protein: 0.9
      }
    },
    {
      id: 4,
      name: "Bread",
      category: "Bakery",
      price: 2.5,
      inStock: true,
      description: "A loaf of freshly baked bread.",
      nutrition: {
        calories: 265,
        fat: 3.2,
        carbohydrates: 49,
        protein: 9
      }
    }
  ];
  
  const tableBody = document.getElementById('tableBody');
  const sortButton = document.getElementById('sortButton');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  
  let sortAsc = true;
  
  function makeTable(data) {
    const fragment = document.createDocumentFragment();
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="py-2 px-4 border-b">${item.name}</td>
        <td class="py-2 px-4 border-b">${item.price}</td>
        <td class="py-2 px-4 border-b">${item.description}</td>
        <td class="py-2 px-4 border-b">
          <button class="toggleNutrition bg-gray-200 px-2 py-1 rounded">Toggle Nutrition</button>
          <div class="nutritionInfo hidden">
            Calories: ${item.nutrition.calories}, Fat: ${item.nutrition.fat}, Carbs: ${item.nutrition.carbohydrates}, Protein: ${item.nutrition.protein}
          </div>
        </td>
      `;
      fragment.appendChild(row);
    });
    tableBody.innerHTML = '';
    tableBody.appendChild(fragment);
    
    document.querySelectorAll('.toggleNutrition').forEach(button => {
      button.addEventListener('click', () => {
        const nutritionInfo = button.nextElementSibling;
        nutritionInfo.classList.toggle('hidden');
      });
    });
  }
  
  function nameSort(data, asc = true) {
    return data.sort((a, b) => asc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
  }
  
  function filterByCategory(data, category) {
    return category ? data.filter(item => item.category === category) : data;
  }
  
  function filterByName(data, query) {
    return data.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }
  
  sortButton.addEventListener('click', () => {
    const sortedData = nameSort([...data], sortAsc);
    sortAsc = !sortAsc;
    makeTable(sortedData);
  });
  
  searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    const filteredData = filterByName(filterByCategory(data, categoryFilter.value), query);
    makeTable(filteredData);
  });
  
  categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    const filteredData = filterByName(filterByCategory(data, category), searchInput.value);
    makeTable(filteredData);
  });
  
  makeTable(data);
  