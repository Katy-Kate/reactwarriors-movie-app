import CallApi from "../api/api";
import Cookies from "universal-cookie";
import { action, observable, configure, computed } from "mobx";

configure({ enforceActions: "always" });

class Store {}
export const moviesStore = new Store();
