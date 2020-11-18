import React, { useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function Example() {
    const [code, setCode] = useState(sessionStorage.getItem("code") || "");
    let hide = "";
    if (code == "true") {
        hide = "hide--block";
        document.getElementById("t_r").setAttribute("style", "display:none");
        document.getElementById("app").setAttribute("style", "display:block");
    } else {
        document.getElementById("app").setAttribute("style", "display:none");
    }
    return (
        <div className={"container "}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Base access</div>

                        <div className="card-body">
                            <h3>Get temporary accesss</h3>
                            <form
                                onSubmit={(value, actions) => {
                                    value.preventDefault();
                                    axios
                                        .get("/code", {
                                            params: { code: code }
                                        })
                                        .then(response => {
                                            sessionStorage.setItem(
                                                "code",
                                                response.data.code
                                            );
                                            document
                                                .getElementById("t_r")
                                                .setAttribute(
                                                    "style",
                                                    "display:none"
                                                );
                                            document
                                                .getElementById("app")
                                                .setAttribute(
                                                    "style",
                                                    "display:block"
                                                );
                                        });
                                }}
                            >
                                <label>
                                    Code:
                                    <input
                                        type="text"
                                        name="code"
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                    />
                                </label>
                                <button type="submit">Sign In</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById("t_r")) {
    ReactDOM.render(<Example />, document.getElementById("t_r"));
}
