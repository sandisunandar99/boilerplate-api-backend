const CheckRoleView = server => {
    return {
        method: (request, reply) => {

            if (request.auth.credentials.user.role === "admin" || request.auth.credentials.user.role === "user") {
                return reply(request.auth.credentials.user.role)
            } else {
                return reply({
                    status: 403,
                    message: 'You cannot accessed !',
                    data: null
                }).code(403).takeover()
            }

        },
        assign: 'roles'
    }
}

const CheckRoleCreate = server => {
    return {
        method: (request, reply) => {

            if (request.auth.credentials.user.role === "admin") {
                return reply(request.auth.credentials.user.role)
            } else {
                return reply({
                    status: 403,
                    message: 'You cannot accessed !',
                    data: null
                }).code(403).takeover()
            }

        },
        assign: 'roles'
    }
}

const CheckRoleUpdate = server => {
    return {
        method: (request, reply) => {

            if (request.auth.credentials.user.role === "admin") {
                return reply(request.auth.credentials.user.role)
            } else {
                return reply({
                    status: 403,
                    message: 'You cannot accessed !',
                    data: null
                }).code(403).takeover()
            }

        },
        assign: 'roles'
    }
}

const CheckRoleDelete = server => {
    return {
        method: (request, reply) => {
            if (request.auth.credentials.user.role === "admin") {
                return reply(request.auth.credentials.user.role)
            } else {
                return reply({
                    status: 403,
                    message: 'You cannot accessed !',
                    data: null
                }).code(403).takeover()
            }

        },
        assign: 'roles'
    }
}

const CheckRoleResetPasswordMe = server => {
    return {
        method: (request, reply) => {

            if (request.auth.credentials.user.role === "user") {
                return reply(request.auth.credentials.user.role)
            } else {
                return reply({
                    status: 403,
                    message: 'You cannot accessed !',
                    data: null
                }).code(403).takeover()
            }

        },
        assign: 'roles'
    }
}


module.exports = {
    CheckRoleView,
    CheckRoleCreate,
    CheckRoleUpdate,
    CheckRoleDelete,
    CheckRoleResetPasswordMe
}
