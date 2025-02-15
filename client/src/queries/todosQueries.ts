export const getTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const res = response.json();
  console.log(res);
  return res;
};
