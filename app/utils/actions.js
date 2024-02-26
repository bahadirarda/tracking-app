// Users Actions
  export const getUsers = async () => {
    const response = await fetch (`/api/users`, {
        method: 'GET',
    })
    if (!response.ok){
        throw new Error ('Failed to get users')
    }
    return await response.json();
  }

  export const getUserById = async (userId) => {
    const response = await fetch (`/api/users/${userId}`, {
        method: 'GET',
    })
    if (!response.ok){
        throw new Error ('Failed to get user by id.')
    }
    return await response.json();
  }

  export const updateUser = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to update user.');
    }
    return await response.json();
  };

  export const deleteUser = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the user');
    }
    return await response.json();
  };
  
//Customer Actions

export const getCustomers = async () => {
    const response = await fetch (`/api/customers`, {
        method: 'GET',
    })
    if (!response.ok){
        throw new Error ('Failed to get customers')
    }
    return await response.json();
  }

  export const getCustomerById = async (customerId) => {
    const response = await fetch (`/api/customers/${customerId}`, {
        method: 'GET',
    })
    if (!response.ok){
        throw new Error ('Failed to get customer by id.')
    }
    return await response.json();
  }

  export const updateCustomer = async (customerId) => {
    const response = await fetch(`/api/customers/${customerId}`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error('Failed to update customer.');
    }
    return await response.json();
  };

  export const deleteCustomer = async (customerId) => {
    const response = await fetch(`/api/customers/${customerId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the customer');
    }
    return await response.json();
  };

  // Menus Actions
export const getMenus = async () => {
    const response = await fetch(`/api/menus`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to get menus');
    }
    return await response.json();
  };
  
  export const getMenuById = async (menuId) => {
    const response = await fetch(`/api/menus/${menuId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to get menu by id.');
    }
    return await response.json();
  };
  
  export const updateMenu = async (menuId, menuData) => {
    const response = await fetch(`/api/menus/${menuId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(menuData),
    });
    if (!response.ok) {
      throw new Error('Failed to update menu.');
    }
    return await response.json();
  };
  
  export const deleteMenu = async (menuId) => {
    const response = await fetch(`/api/menus/${menuId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the menu');
    }
    return await response.json();
  };


  // Dishes Actions
export const getDishes = async () => {
    const response = await fetch(`/api/dishes`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to get dishes');
    }
    return await response.json();
  };
  
  export const getDishById = async (dishId) => {
    const response = await fetch(`/api/dishes/${dishId}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to get dish by id.');
    }
    return await response.json();
  };
  
  export const updateDish = async (dishId, dishData) => {
    const response = await fetch(`/api/dishes/${dishId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dishData),
    });
    if (!response.ok) {
      throw new Error('Failed to update dish.');
    }
    return await response.json();
  };
  
  export const deleteDish = async (dishId) => {
    const response = await fetch(`/api/dishes/${dishId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete the dish');
    }
    return await response.json();
  };
  