export default function LoginPage() {
    return (
    <div className="login">
        <button onClick={() => {window.location.href = "http://192.168.1.224:3575/?continue=dash"}}>
            Login with discord
        </button>
    </div>)
}