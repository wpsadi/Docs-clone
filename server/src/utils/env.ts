
export const env = {
    baseURL: String(process.env.BASE_URL),
    ClientBaseURL: String(process.env.CLIENT_BASE_URL),
    Oauth:{
        github:{
            clientID: String(process.env.GITHUB_CLIENT_ID),
            clientSecret: String(process.env.GITHUB_CLIENT_SECRET)
        }

    },
    jwt:{
        secret: String(process.env.JWT_SECRET),
        expiresIn: String(process.env.JWT_EXPIRES_IN),
        cookieExpiry : eval(process.env.JWT_COOKIE_EXPIRY as string)
    }
}