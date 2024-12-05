import { TCourse, TQueryParam, TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRegistrationSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["semester"]
        }),
        getAllRegistrationSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/semester-registrations',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["semester"],
            transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        updateRegistrationSemester: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: "PATCH",
                body: args.data,
            }),
            invalidatesTags: ["semester"]
        }),
        createCourse: builder.mutation({
            query: (data) => ({
                url: "/courses/create-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["courses"]
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["courses"],
            transformResponse: (response: TResponseRedux<TCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        updateAddAssignFaculties: builder.mutation({
            query: (args) => ({
                url: `/courses/${args.id}/assign-faculties`,
                method: "PUT",
                body: args.data,
            }),
            invalidatesTags: ["courses"]
        }),
        getFacultiesWithCourse: builder.query({
            query: (id) => {
                return {
                    url: `/courses/${id}/get-faculties`,
                    method: 'GET',
                };
            },
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        createOfferedCourse: builder.mutation({
            query: (data) => ({
                url: "/offered-courses/create-offered-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["courses"]
        })
    })
});

export const {
    useCreateRegistrationSemesterMutation,
    useGetAllRegistrationSemesterQuery,
    useUpdateRegistrationSemesterMutation,
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useUpdateAddAssignFacultiesMutation,
    useGetFacultiesWithCourseQuery,
    useCreateOfferedCourseMutation,
} = courseManagement;