import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminMainCom from "../../components/Admin/AdminMainCom"

const AdminMainCon = () => {
    const [input, setInput] = useState({ id: "", pwd: "" })
    const [isAuthenticated, setIsAuthenticated] = useState(
        sessionStorage.getItem("isAuthenticated") === "true"
    )
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(sessionStorage.getItem("isAuthenticated") === "true")
        }

        // 로그인 상태 변경 감지
        window.addEventListener("storage", checkAuth)
        
        return () => {
            window.removeEventListener("storage", checkAuth)
        }
    }, [])

    const onChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const mySubmit = (e) => {
        e.preventDefault()

        if (input.id !== "admin") {
            alert("아이디가 틀렸습니다.")
            return
        }

        if (input.pwd !== "1234") {
            alert("비밀번호가 틀렸습니다.")
            return
        }

        sessionStorage.setItem("isAuthenticated", "true")
        setIsAuthenticated(true); // 상태 업데이트
        alert("로그인 성공")
        navigate("/adminMovie")

        window.dispatchEvent(new Event("storage")) // 상태 변경 이벤트 발생
    }

    const handleLogout = () => {
        sessionStorage.removeItem("isAuthenticated")
        setIsAuthenticated(false) // 상태 업데이트
        alert("로그아웃 되었습니다.")
        navigate("/adminMain")

        window.dispatchEvent(new Event("storage")) // 상태 변경 이벤트 발생
    }

    return (
        <AdminMainCom
            onChange={onChange}
            mySubmit={mySubmit}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
        />
    )
}

export default AdminMainCon