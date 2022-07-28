import React from "react";

function Home() {
    return (
        <React.Fragment>
            <div
                className="w3-container w3-center w3-red"
                style={{ padding: "2rem" }}>
                <h1 className="w3-jumbo">Tweet App</h1>
                <button
                    className="w3-button w3-white"
                    style={{ marginRight: "1rem" }}
                    onClick={() => (window.location = "/login")}>
                    Login
                </button>
                <button
                    className="w3-button w3-white"
                    onClick={() => (window.location = "/register")}>
                    Register
                </button>
            </div>

            <div 
                className="w3-container w3-center w3-red"
                style={{ padding: "2rem", marginTop: "2rem" }}>
                <h2>Hey!! Welcome to Tweet App</h2>
                <p>
                Made this for HACKFSE 2022.</p> <p>To get started, first enter your loginid and password to get started
             </p>
            </div>

            

        </React.Fragment>
    );
}

export default Home;
