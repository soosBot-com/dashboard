export default function LoginPage() {
    return (
    <div class="loginDiv">
        <a class ="loginButton"href="https://discord.com/api/oauth2/authorize?client_id=762361400903204925&redirect_uri=https%3A%2F%2Fapi.soosbot.com%2Fdashboard%2Flogin%2Fcallback&response_type=code&scope=identify%20connections%20guilds">
            Login with discord
            </a>
    </div>)
}