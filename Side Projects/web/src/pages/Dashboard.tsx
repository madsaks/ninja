import React from "react";
import { AppState } from "../App";

export const Dashboard = () => {
    const appState = AppState.useContainer()
    return <h2 className="tempPage">Dashboard</h2>;
}
