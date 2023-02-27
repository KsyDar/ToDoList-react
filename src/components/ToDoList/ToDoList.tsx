import {useState} from 'react'
import type {ListItem} from "../../types/ListItem";
import ToDoListItem from "../ToDoListItem/ToDoListItem";
import './ToDoList.scss'
import ToDoModal from "../ToDoModal/ToDoModal";
import { createPortal } from 'react-dom';
import { v4 } from 'uuid';

function ToDoList() {

    const [items, setItems] = useState<ListItem[]>([
        {
            id: v4(),
            name: "Дело 1",
            isDone: false,
        },
        {
            id: v4(),
            name: "Дело 2",
            isDone: true,
        },
        {
            id: v4(),
            name: "Дело 3",
            isDone: false,
        },
    ]);

    const [changedItem, setChangedItem] = useState<ListItem | null>(null);

    const deleteItem = (itemId: string): void => {
        setItems(items.filter(item => item.id !== itemId));
    }

    const changeToDo = (newItem: ListItem, isAdd?: boolean): void => {
        if (isAdd) {
            setItems([...items, newItem]);
        } else {
            const itemIndex = items.findIndex(el => el.id === newItem.id);
            if(itemIndex === undefined) throw new Error("Элемент не найден");
            setItems(items.map(item => {
                if(item.id === newItem.id) return newItem
                return item
            }));
        }

    }


    const openModal = (item?: ListItem): void => {
        if (!item) {
            item = {
                id: v4(),
                name: "",
                isDone: false,
            }
        }
        console.log(item)
        setChangedItem(item);
    }

    const closeModal = (item?: ListItem): void => {
        if (item) {
            const existingItem = items.find(el => el.id === item.id);
            if (existingItem) {
                changeToDo(item);
            } else {
                changeToDo(item, true);
            }
        }
        setChangedItem(null);
    }


    return (
        <div className={"todolist-wrapper"}>
        <h1>Список дел</h1>
        <ul className={"todolist"}>
            {
                items.map(item => {
                    return (
                        <ToDoListItem key={item.id}
                                      item={item}
                                      onDeleteItem={deleteItem}
                                      onChangeStatus={changeToDo}
                                      onModalOpen={openModal}
                        />
                    )
                })
            }
        </ul>
            <button className="button--default"
                    onClick={() => openModal()}
            >
                Создать
            </button>

            {createPortal(
                changedItem &&
                <ToDoModal
                    item={changedItem}
                    onSaveChanges={closeModal}
                    onCancel={closeModal}
                />,
                document.body)}
        </div>
    )
}

export default ToDoList