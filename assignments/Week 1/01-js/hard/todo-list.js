/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(todoList = []){
    this.todo = todoList
  }

  add(todo){
    this.todo.push(todo)
  }

  remove(id){
    this.todo = this.todo.filter((item, index)=>{
      return !(index === id)
    })
  }

  update(id, updatedTodo){
    if(this.todo.length <= id) return this.todo
    this.todo = this.todo.map((item, index)=>{
      return index === id ? updatedTodo : item
    })
  }

  getAll(){
    return this.todo
  }

  get(id){
    if(this.todo.length <= id) return null
    return this.todo[id]
  }

  clear(){
    this.todo = []
  }
}

// let todo1 = new Todo(["Task1", "Task2"])
// todo1.add("Task3")

// console.log(typeof todo1.update(0, "New Task"))

module.exports = Todo;
