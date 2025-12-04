import {Categories, IToDo, toDoState} from "../atoms";
import {useRecoilState} from "recoil";

function ToDo({text, category, id}:IToDo){
    const [toDos, setToDos] = useRecoilState(toDoState);

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget:{ name }
        } = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo = {text, id, category: name as any};
            return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1)];
        })
    }
    const onDelete = () => {
        setToDos((oldToDos) => {
            return oldToDos.filter(toDo => toDo.id !== id);
        })
    }
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button onClick={onDelete}>Delete</button>
        </li>
    );
}

export default ToDo;