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
            transformResponse: (response: TResponseRedux<TStudentOfferedCourse[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
        }),
    })
});

export const { useGetMyOfferedCoursesQuery } = studentCourseApi;