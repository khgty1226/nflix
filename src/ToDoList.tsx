import {useState} from "react";
import {useForm} from "react-hook-form";

// function ToDoList(){
//     const [toDo, setToDo] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//       const {currentTarget: {value}} = event;
//         setToDo(value);
//     };
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         console.log(toDo);
//     };
//     return (<div>
//         <form onSubmit={onSubmit}>
//             <input value={toDo} onChange={onChange} placeholder="Write a to do"/>
//             <button>Add</button>
//         </form>
//     </div>
//     );
// }

interface IForm {
    email:string;
    firstName:string;
    lastName:string;
    password:string;
    password1:string;
    extraError?:string;
}

function ToDoList(){
    const { register, watch, handleSubmit, formState:{errors}, setError } = useForm<IForm>({defaultValues: {email: "@naver.com"}});
    const onValid = (data:IForm) => {
        if(data.password !== data.password1){
            setError("password1", {message: "Password are not the same"}, {shouldFocus: true});
        }
        setError("extraError", {message:"Server offilne"});
        console.log("onValid");
    }
    console.log(errors);
    return (<div>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email", {required: "Email is required", pattern: {value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "is not naver Email"}})} placeholder="email"/>
                <span>{errors?.email?.message}</span>
                <input {...register("firstName", {required: "firstName is required", minLength: 10})} placeholder="fitstName"/>
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName", {required: "lastName is required", validate: {noNico: (value) => value.includes("nico") ? "nico is not allowed" : true,
                                                                                              noNick: (value) => value.includes("nick") ? "nick is not allowed" : true}})} placeholder="lastName"/>
                <span>{errors?.lastName?.message}</span>
                <input {...register("password", {required: "password is required", minLength: {value:5, message:"password is short"}})} placeholder="password"/>
                <span>{errors?.password?.message}</span>
                <input {...register("password1", {required: "password is required", minLength: {value:5, message:"password is short"}})} placeholder="password2"/>
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    );
}


export default ToDoList;