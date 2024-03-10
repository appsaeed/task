import { useSelector } from "react-redux";
import { TodoType } from "../app/types";
import reducer from "../redux/reducer";

export default function useTodos(): TodoType[] {
    return useSelector((state: ReturnType<typeof reducer>) => state.todos);
}