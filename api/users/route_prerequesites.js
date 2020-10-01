const CheckRoleView = server => {
    return {
        method: (request, h) => {

            if (request.auth.credentials.user.role === "admin" || request.auth.credentials.user.role === "user") {
                return h.response(request.auth.credentials.user.role)
            } else {
                return h.response({
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
        method: (request, h) => {

            if (request.auth.credentials.user.role === "admin") {
                return h.response(request.auth.credentials.user.role)
            } else {
                return h.response({
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
        method: (request, h) => {

            if (request.auth.credentials.user.role === "admin") {
                return h.response(request.auth.credentials.user.role)
            } else {
                return h.response({
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
        method: (request, h) => {
            if (request.auth.credentials.user.role === "admin") {
                return h.response(request.auth.credentials.user.role)
            } else {
                return h.response({
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
        method: (request, h) => {

            if (request.auth.credentials.user.role === "user") {
                return h.response(request.auth.credentials.user.role)
            } else {
                return h.response({
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
