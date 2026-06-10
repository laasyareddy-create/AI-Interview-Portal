export const registerUser = (data) => {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const existingUser = users.find(
    (user) => user.email === data.email
  );

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const newUser = {
    id: Date.now(),
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "student",
  };

  users.push(newUser);

  localStorage.setItem(
    "users",
    JSON.stringify(users)
  );

  return newUser;
};

export const loginUser = (data) => {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    (u) =>
      u.email === data.email &&
      u.password === data.password
  );

  if (!user) {
    throw new Error(
      "Invalid email or password"
    );
  }

  return user;
};