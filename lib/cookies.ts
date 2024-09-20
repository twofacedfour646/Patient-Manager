"use server"
import { cookies } from "next/headers"

const MAX_AGE = 60 * 60 * 24 * 30 // 30 Days

function setCookie(name: string, value: any) {
    const cookieStore = cookies()
    cookieStore.set(name, value, {
        httpOnly: true,
        maxAge: MAX_AGE,
        secure: false,
        sameSite: "strict"
    })
}

export {
    setCookie
}
