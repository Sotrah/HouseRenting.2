import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ControllerTest from "./ControllerTest"
import Test from "./Test";
import Layout from "./components/Layout";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<ControllerTest />} />
                        <Route exact path="/test" element={<Test />} />
                        </Routes>
                </Layout>
            </BrowserRouter>
        </div>
    )
}

export default App;
