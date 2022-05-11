import Axios from "axios";

async function login(loginid, pwd) {
    const res = await Axios.post("http://localhost:5000/login", {loginid, pwd});
    console.log(res)
    const {data} = await res;
    if (data.error) {
        return data.error
    } else {
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        return true
    }
}

async function check() {
    const token = localStorage.getItem("token")
    try {
        const res = await Axios.post("http://localhost:5000/api/checkiftokenexpire", {}, {
            headers: {
                
                Authorization: "Bearer " + token
            },
            
        })
        console.log(res)
        const {data} = await res;
        return data.success
    } catch {
        console.log("catch of check() ")
        const refresh_token = localStorage.getItem("refreshToken")
        if (!refresh_token) {
            localStorage.removeItem("token")
            return false;
        }
        Axios.post("/api/refreshtoken", {}, {
            headers: {
                Authorization: `Bearer ${refresh_token}`
            }
        }).then(res => {
            localStorage.setItem("token", res.data.token)
        })
        return true;
    }
}

function logout() {
    if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token")
        Axios.post("/api/logout/access", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("token")
            }
        })
    }
    if (localStorage.getItem("refreshToken")) {
        const refreshToken = localStorage.getItem("refreshToken")
        Axios.post("/api/logout/refresh", {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                localStorage.removeItem("refreshToken")
            }
        })
    }
    localStorage.clear();
    setTimeout(() => window.location = "/", 500)
}

export {login, check, logout};