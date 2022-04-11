import Feed from "././components/Feed";
import { Navigate } from "react-router-dom";
import UserView from "./components/UserView";

export const routes = [
  {
    path: "/",
    element: <Navigate to={"/home"} />,
    children: [
      {
        path: "home",
        element: <Feed />,
      },
      {
        path: "user",
        children: [
          {
            path: ":id",
            element: <UserView />,
          },
        ],
      },
    ],
  },
];
