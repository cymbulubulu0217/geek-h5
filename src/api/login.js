import http from "@/utils/http";

export const login = (values) => {
    return http({
        url: '/authorizations',
        method: 'POST',
        data: values
    })
}
