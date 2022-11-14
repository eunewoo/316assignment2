import { RecoilRoot } from "recoil";
import "./App.css";
import RouterPage from "./pages/RouterPage";

function App() {
    return (
        <RecoilRoot>
            <div className="App">
                <RouterPage />
            </div>
        </RecoilRoot>
    );
}

export default App;
