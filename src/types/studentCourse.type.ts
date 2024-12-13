export type TStudentOfferedCourse = {
    _id: string;
    semesterRegistration: string;
    academicSemester: string;
    academicFaculty: string;
    academicDepartment: string;
    course: TStudentCourse;
    faculty: string;
    maxCapacity: number;
    section: number;
    days: string[];
    startTime: string;
    endTime: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    enrolledCourses: any[];
    completedCourses: any[];
    completedCourseIds: any[];
    isPreRequisitesFulFilled: boolean;
    isAlreadyEnrolled: boolean;
};

export type TStudentCourse = {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourses: any[];
    isDeleted: boolean;
    __v: number;
};