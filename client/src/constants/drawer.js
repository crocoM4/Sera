import * as paths from "./paths";

export const menuItems = [
  {
    id: "todos",
    description: "todos",
    iconClass: "icon-todos",
    path: paths.TODOS,
    exact: true
  },
  {
    id: "goals",
    description: "goals",
    iconClass: "icon-goals",
    path: paths.GOALS,
    exact: true
  },
  {
    id: "results",
    description: "results",
    iconClass: "icon-results",
    path: paths.RESULTS,
    exact: true
  }
];
export default menuItems;
