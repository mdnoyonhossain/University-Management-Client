import { TQueryParam, TResponseRedux, TStudentOfferedCourse } from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOfferedCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/offered-courses/my-offered-courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["offeredCourse"],
            transformResponse: (response: TResponseRedux<TStudentOfferedCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getSingleOfferedCourse: builder.query({
            query: (id: string) => ({
                url: `/offered-courses/${id}`,
                method: "GET",
            }),
            providesTags: ["offeredCourse"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data
                };
            },
        }),
        enrolledCourse: builder.mutation({
            query: (data) => ({
                url: "/enrolled-courses/create-enrolled-course",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["offeredCourse"]
        }),
        getMyEnrolledCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: '/enrolled-courses/my-enrolled-courses',
                    method: 'GET',
                    params: params,
                };
            },
            providesTags: ["offeredCourse"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
        getMySingleEnrolledCourse: builder.query({
            query: (id: string) => ({
                url: `/enrolled-courses/my-enrolled-courses/${id}`,
                method: "GET",
            }),
            providesTags: ["offeredCourse"],
            transformResponse: (response: TResponseRedux<any>) => {
                return {
                    data: response.data
                };
            },
        }),
    })
});

export const {
    useGetMyOfferedCoursesQuery,
    useGetSingleOfferedCourseQuery,
    useEnrolledCourseMutation,
    useGetMyEnrolledCourseQuery,
    useGetMySingleEnrolledCourseQuery
} = studentCourseApi;