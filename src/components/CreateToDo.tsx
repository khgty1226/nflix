import {useForm} from "react-hook-form";
import {useRecoilState, useRecoilValue} from "recoil";
import {categoryState, toDoState} from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo(){
    const [toDos, setToDos] = useRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const handleValid = ({toDo}:IForm) => {
        setToDos(oldToDos => [...oldToDos, {text: toDo, category: category, id:Date.now()}]);
        setValue("toDo", "");
    }

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {required: "Please write a to do"})} placeholder="Write a to do"/>
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;