import { cn } from "../../app/utiles";
import TodoFooter from "./components/TodoFooter";
import TodoHeader from "./components/TodoHeader";
import Todos from "./components/Todos";

export default function TodosPages() {

    return (
        <>

            <div className={cn(
                "w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700",
                'my-16 s max-w-xl mx-auto'
            )}>

                <TodoHeader />

                {/* <hr className="mt-4" /> */}

                <Todos />

                {/* <hr className="mt-4" /> */}

                <TodoFooter />
            </div>
        </>

    )
}