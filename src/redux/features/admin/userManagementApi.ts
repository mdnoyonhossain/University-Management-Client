import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (data) => ({
                url: "/users/create-admin",
                method: "POST",
                body: data
            })
        }),
        createFaculty: builder.mutation({
            query: (data) => ({
                url: "/users/create-faculty",
                method: "POST",
                body: data
            })
        }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data
            })
        }),
    })
});

export const { useCreateAdminMutation, useCreateFacultyMutation, useCreateStudentMutation } = userManagementApi;