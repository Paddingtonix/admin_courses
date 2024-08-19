export interface CourseList {
    title: string,
    status: string,
    authorEmails: string[],
    direction: string[],
    language: string,
    lastChangeDateTime: string,
    salesTerminationDate: string | null,
    courseId: number
}