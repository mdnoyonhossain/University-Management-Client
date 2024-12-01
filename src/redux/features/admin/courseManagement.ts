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
    })
});

export const {
    useCreateRegistrationSemesterMutation
} = courseManagement;