import { useEffect, useState } from "react";
import WASM_MODULE from "./wasm/wasm.js";

const useWASM = () => {
  const [wasm, setWasm] = useState({});
  useEffect(() => {
    try {
      WASM_MODULE().then((module) => setWasm(module));
      console.log("WASM loaded!");
    } catch (e) {
      console.log(e);
      return {};
    }
  }, []);
  return wasm;
};

export default useWASM;
