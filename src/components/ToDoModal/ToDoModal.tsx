import {ListItem} from "../../types/ListItem";
import "./ToDoModal.scss"

type PropType = {
    item: ListItem;
    onSaveChanges: (newItem: ListItem) => void;
    onCancel: () => void;
}
function ToDoModal(props: PropType) {
    let newItem: ListItem = props.item;
    const changeName = (newName: string) => {
        newItem.name = newName;
    }
    return (
        <div className="modal">
            <div className="modal__content">
                <div className="modal__content__props">
                    <span className="modal__content__props__title">
                    Дело:
                    </span>
                    <input className="modal__content__props__input"
                           maxLength={60}
                           defaultValue={props.item.name}
                           onChange={(event) => changeName(event.target.value)}
                    />
                </div>

                <div className="modal__content__buttons">
                    <button className="button--default button--default--red"
                            onClick={() => props.onCancel()}
                    >
                        Отмена
                    </button>
                    <button className="button--default"
                            onClick={() => props.onSaveChanges(newItem)}
                    >
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ToDoModal