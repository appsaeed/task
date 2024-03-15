import { useSelector } from "react-redux";
import { NotifyType } from "../app/types";
import reducer from "../redux/reducer";

export default function useNotify(): NotifyType {
    return useSelector((state: ReturnType<typeof reducer>) => state.notify);
}