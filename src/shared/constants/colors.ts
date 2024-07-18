import { IObj } from "../../data/types/general.types";

export interface IColors {
  [color: string]: IObj;
}
export const COLORS: IColors = {
  status: {
    activeGreen: "#d1f7d0",
    archiveRed: "#c79191",
  },
  background: {
    sideBarIsActive: "#d7dff7",
  },
  border: {
    sectionBorder: "#dcdcdf",
  },
};
