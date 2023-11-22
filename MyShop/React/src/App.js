import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ControllerTest from "./ControllerTest"
import Test from "./Test"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ControllerTest />} />
                    <Route exact path="/test" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App;
