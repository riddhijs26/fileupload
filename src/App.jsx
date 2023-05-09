import logo from "./logo.svg";
import "./App.scss";
import FileUpload from "./FileUpload/FileUpload";
import { useEffect, useState } from "react";
import { CustodianContext } from "./CustodianContext";
import CustodianItem from "./Custodian/CustodianItem";
import DragandDrop from "./DragandDrop/DragandDrop";

function App() {
  const [custodians, setCustodians] = useState({});

  return (
    <div className="App">
      <CustodianContext.Provider value={[custodians, setCustodians]}>
        <DragandDrop />
        <CustodianItem custodians={custodians} />
      </CustodianContext.Provider>
    </div>
  );
}

export default App;
