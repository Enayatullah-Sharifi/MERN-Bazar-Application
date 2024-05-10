export const registerFormValidation = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};

  // username validation
  if (username.trim() === "") {
    errors.username = "User name is required";
  } else {
    const nameRE = /^[a-zA-Z]{3,15}$/;
    if (!nameRE.test(username)) {
      errors.username = "Please insert a valid name";
    }
  }

  // email validation
  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailRE =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!emailRE.test(email)) {
      errors.email = "Please insert a valid email";
    }
  }

  // Password validation
  if (password.trim() === "") {
    errors.password = "Password is required";
  } else {
    const passwordRE = /^[a-zA-Z0-9]{6,20}$/;
    if (!passwordRE.test(password)) {
      errors.password = "Password must be between 6 to 20 character";
    }
  }

  // Confirm password
  if (confirmPassword.trim() === "") {
    errors.confirmPassword = "Confirm password is required";
  } else {
    if (password !== confirmPassword) {
      errors.confirmPassword = "Password does not match";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const loginFormValidation = (email, password) => {
  const errors = {};

  // email validation
  if (email.trim() === "") {
    errors.email = "Email is required";
  } else {
    const emailRE =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!emailRE.test(email)) {
      errors.email = "Please insert a valid email";
    }
  }

  // Password validation
  if (password.trim() === "") {
    errors.password = "Password is required";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// Add item Validation
export const addItemFormValidation = (name, price, category, phone_number) => {
  const errors = {};

  // name validation
  if (name.trim() === "") {
    errors.name = "Name is required";
  } else {
    const nameRE = /^[a-zA-Z]/;
    if (!nameRE.test(name)) {
      errors.name = "Please insert a valid name";
    }
  }
  // price validation
  if (price.trim() === "0") {
    errors.price = "Price is required";
  } else {
    const priceRE = /^[0-9]/;
    if (!priceRE.test(price)) {
      errors.price = "Please insert a valid price";
    }
  }
  // category validation
  if (category.trim() === "") {
    errors.category = "Category is required";
  } else {
    const categoryRE = /^[a-zA-Z]/;
    if (!categoryRE.test(category)) {
      errors.category = "Please insert a valid category";
    }
  }
  // phone_number validation
  if (phone_number.trim() === "") {
    errors.phone_number = "Phone number is required";
  } else {
    const phone_numberRE = /^(?:\+93|0093)\d{9}$/;
    if (!phone_numberRE.test(phone_number)) {
      errors.phone_number = "Please insert a valid phone number";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
