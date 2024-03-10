import { useSelector } from "react-redux";
import { TodoFilterType } from "../app/types";
import reducer from "../redux/reducer";

export default function useTodoFilter(): TodoFilterType {
    return useSelector((state: ReturnType<typeof reducer>) => state.todo_filter);
}