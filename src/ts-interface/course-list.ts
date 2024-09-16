export interface CourseList {
    title: string,
    status: string,
    authorEmails: string[],
    directions: string[],
    language: string,
    lastChangeDateTime: string,
    salesTerminationDate: string | null,
    courseId: number
}