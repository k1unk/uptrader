import {AppContext} from "./state/context";
import {appReducer} from "./state/reducer";
import {initialAppState} from "./state/state";
import {useEffect, useReducer} from "react";
import {Link, Route, BrowserRouter, Routes} from "react-router-dom";
import ProjectsPage from "./components/Projects/ProjectsPage";
import TasksPage from "./components/Tasks/TasksPage";
import './styles/styles.scss'

function App() {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProjectsPage/>}/>
                        <Route path="/projects">
                            <Route path=":id" element={<TasksPage zxc={1}/>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </AppContext.Provider>
    );
}

export default App;
