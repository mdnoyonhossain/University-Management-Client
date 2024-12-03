import { TAdmin, TFaculty, TQueryParam, TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    })
});

export const {
    useCreateAdminMutation,
    useGetAllAdminsQuery,
    useGetSingleAdminQuery,
    useCreateFacultyMutation,
    useGetAllFacultiesQuery,
    useGetSingleFacultyQuery,
    useCreateStudentMutation,
    useGetAllStudentsQuery,
    useGetSingleStudentQuery,
    useUpdateStudentMutation
} = userManagementApi;