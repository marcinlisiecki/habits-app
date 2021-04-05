import { useContext } from "react";
import { ContextState, UserContext } from "@app/context/UserContext";

export default (): ContextState => <ContextState>useContext(UserContext);
