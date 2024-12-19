import {RouteObject} from "react-router-dom";
import CharacterList from "../components/CharacterList/CharacterList";
import App from "../App.tsx";
import Character from "../components/Character/Character.tsx";

export const routes: RouteObject[] = [
    {
        path: "", element: <App/>,
        children: [
            {
                path: '', element: <CharacterList/>
            },
            {
                path: 'character/:id', element: <Character/>
            }
        ]
    }
];