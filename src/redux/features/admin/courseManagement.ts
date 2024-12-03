import { TQueryParam, TResponseRedux, TSemesterRegistration } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagement = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRegistrationSemester: builder.mutation({
            query: (data) => ({
                url: "/semester-registrations/create-semester-registration",
                method: "POST",
                body: data
            })
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
            })
        }),
    })
});

export const {
    useCreateRegistrationSemesterMutation,
    useGetAllRegistrationSemesterQuery,
    useUpdateRegistrationSemesterMutation
} = courseManagement;