import {ListItem} from "../../types/ListItem";
import '../ToDoList/ToDoList.scss'
import {useEffect} from "react";

type PropType = {
    item: ListItem;
    onDeleteItem: (e: string) => void;
    onChangeStatus: (e: ListItem) => void;
    onModalOpen: (e: ListItem) => void;
}
function ToDoListItem(props: PropType) {
    const changeStatus = () => {
        const listItem: ListItem = {
            id: props.item.id,
            name: props.item.name,
            isDone: !props.item.isDone,
        }
        return listItem;
    }

    return (
        <li className="todolist__item">
            <div className = "todolist__item__checkbox"
                 onClick={() => props.onChangeStatus(changeStatus())}
            >
                <input type = "checkbox"
                       checked={props.item.isDone}
                       readOnly
                />
                <label htmlFor = "_checkbox-26">
                    <div className = "tick-mark"></div>
                </label>
                <span
                    className={props.item.isDone ? "todolist__item__title" : "todolist__item__title--done"}
                >
                {props.item.name}

                </span>
            </div>

            <div>
                <button className="button--default button--default--orange"
                        onClick={() => props.onModalOpen(props.item)}
                >
                    Изменить
                </button>
                <button className="button--default button--default--red todolist__item__button"
                        onClick={() => props.onDeleteItem(props.item.id)}
                >
                    Удалить
                </button>
            </div>
        </li>
    )
}

export default ToDoListItem
