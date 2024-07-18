import { IObj } from "../../data/types/general.types";

export interface IColors {
  [color: string]: IObj;
}
export const COLORS: IColors = {
  global: {
    white: "white",
    black: "black",
  },
  status: {
    activeGreen: "#d1f7d0",
    archiveRed: "#c79191",
  },
  background: {
    sideBarIsActive: "#d7dff7",
    form: "#f9f9f9",
  },
  border: {
    sectionBorder: "#dcdcdf",
  },
  button: {
    backgroundColor: "#007bff",
    buttonOnHover: "#0056b3",
  },
};
