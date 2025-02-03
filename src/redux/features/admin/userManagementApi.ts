import { TAdmin, TFaculty, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyProfile: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/users/me',
                    method: 'GET',
                    params: params,
                };
            },
            // providesTags: ["profile"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        createAdmin: builder.mutation({
            query: (data) => ({
                url: "/users/create-admin",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        getAllAdmins: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/admins',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TAdmin[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getSingleAdmin: builder.query({
            query: (id: string) => ({
                url: `/admins/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TAdmin>) => {
                return {
                    data: response.data
                };
            },
        }),
        deleteAdmin: builder.mutation({
            query: (id: string) => ({
                url: `/admins/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"]
        }),
        createFaculty: builder.mutation({
            query: (data) => ({
                url: "/users/create-faculty",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        getAllFaculties: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/faculties',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TFaculty[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getSingleFaculty: builder.query({
            query: (id: string) => ({
                url: `/faculties/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TFaculty>) => {
                return {
                    data: response.data
                };
            },
        }),
        deleteFaculty: builder.mutation({
            query: (id: string) => ({
                url: `/faculties/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"]
        }),
        createStudent: builder.mutation({
            query: (data) => ({
                url: "/users/create-student",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["user"]
        }),
        getAllStudents: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/students',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TStudent[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getSingleStudent: builder.query({
            query: (id: string) => ({
                url: `/students/${id}`,
                method: "GET",
            }),
            providesTags: ["user"],
            transformResponse: (response: TResponseRedux<TStudent>) => {
                return {
                    data: response.data
                };
            },
        }),
        updateStudent: builder.mutation({
            query: (args) => ({
                url: `/students/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["user"]
        }),
        deleteStudent: builder.mutation({
            query: (id: string) => ({
                url: `/students/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["user"]
        }),
    })
});

export const {
    useGetMyProfileQuery,
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useDeleteAdminMutation,
    useCreateFacultyMutation,
    useGetAllFacultiesQuery,
    useGetSingleFacultyQuery,
    useDeleteFacultyMutation,
    useCreateStudentMutation,
    useGetAllStudentsQuery,
    useGetSingleStudentQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation
} = userManagementApi;