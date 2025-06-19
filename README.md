

Built a ToDo List App where you can add, edit and remove list items. You should be able to change the state of the items in the list e.g. set it from `IN_PROGRESS` to `COMPLETE`. Also you need to be able to change the name of it or remove the item entirely.

List items should be persisted in state (please use `ngrx` for this). 


## Data Structure

A `ListItem` looks like below:

```
{
  "id": "1"
  "name": "My first item",
  "status": "COMPLETE",
}
```


## Tech Stack 

Please use the following libraries. Some are already installed:

- Ngrx for state management (installed)
- Angular material - Ui library
