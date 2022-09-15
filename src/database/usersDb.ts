import { db } from "../main.ts";

const dbvar = "pexelsBot";

export async function addUser(userId:number) {
    const users = eval(await db.get(dbvar) || "[]");
    for (const user of users)
        if (user == userId)
            return;
    users.push(userId);
    await db.set(dbvar, JSON.stringify(users));
}

export async function removeUser(userId: number) {
    const users = eval(await db.get(dbvar) || "[]");
    for (const user of users)
        if (user == userId)
            users.splice(users.indexOf(user), 1);
    await db.set(dbvar, JSON.stringify(users));
}

export async function getUsers() {
    return eval(await db.get(dbvar) || "[]");
}