export default function getUsersAvatar(user) {
    if (!user.avatar) {
        return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.discriminator)%5}.png`
    } else {
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
    }
}