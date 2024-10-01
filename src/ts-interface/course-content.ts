export interface IDirection {
    directionId: number;
    name: string;
}

export interface mappedDirections {
    id: number;
    name: string;
}

export interface IDirectionResponse {
    Directions: IDirection[];
}

export interface IGeneralCourseSettings {
    title: string;
    cutScorePercentages: number;
}

export interface IAnswerResponse {
    id: number;
    text: string;
    isCorrectAnswer: boolean;
}

export interface ICourseContentQuestions {
    id: number;
    orderInTesting: number;
    showFullTitle: boolean;
    title: string;
    correctAnswerScore: number;
    directionId: number;
    contentId: number;
    content: string;
    answers: IAnswerResponse[];
}

export interface ICourseContent {
    id: number;
    title: string;
    courseId: number;
    category: string;
    cutScorePercentages: number;
    questions: ICourseContentQuestions[];
}
