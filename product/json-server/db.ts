// interface TODO {
//   id: number;
//   title: string;
//   contents: string;
//   complete: boolean;
//   priority: string;
//   deadline: string;
// }
// interface DB {
//   todos: [TODO?];
// }

const createTodo = () => {
  const todos = [];
  for (let i = 0; i < 1000; i++) {
    todos.push({
      id: i,
      title: `test${i}`,
      contents: "test contents",
      complete: false,
      priority: Math.floor(Math.random() * (4 - 1) + 1),
      deadline: new Date(
        new Date(2012, 0, 1).getTime() +
          Math.random() *
            (new Date().getTime() - new Date(2012, 0, 1).getTime())
      ),
    });
  }
  return todos;
};
export const db = {
  todos: createTodo(),
};
