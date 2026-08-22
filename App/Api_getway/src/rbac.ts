import path from "node:path";
import { UserRole } from "shared";


export type RbacRule = {
    method: string;
    path: string;
    roles: UserRole
}



export const PublicRouter = [
    {
        method: 'POST', path: '/auth/register'
    },
    {
        method: 'POST', path: '/auth/login'
    }
] as const;

const rbacRules: RbacRule[] = [
    {
        method: "GET",
        path: "/auth/me",
        roles: ["USER", "ADMIN"]
    }

]

//     / auth / me -> /auth/me -> true
//     / tickets /: id, /tickets/abs / -123

// "", "tickets", ":id", "", "tickets", "abs-123"s


function matchPath(pattern: string, actual: string): boolean {
    if (pattern === actual) {
        return true
    }

    const patternParts = pattern.split("/")
    const actualParts = pattern.split("/")

    if (patternParts.length !== actualParts.length) {
        return false
    }

    return patternParts.every(
        (part, index) => part.startsWith(":") || part === actualParts[index]
    )
}


export function isPublicRoutes(method: string, path: string):
    boolean {
    return PublicRouter.some((route) => route.method === method && matchPath(route.path, path))
}

export function gatAllowedRoles(
    method: string,
    path: string
): UserRole[] | null {
    const rule = rbacRules.find(
        (currentItem) => currentItem.method === method && matchPath(currentItem.path, path)
    )

    return rule?.roles ?? null
}