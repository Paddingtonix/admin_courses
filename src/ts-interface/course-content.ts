export interface IDirection {
	directionId: number;
	lastChangeDateTime: string;
	localizedName: string;
	isVisible: boolean;
	count: number;
}

export interface mappedDirections {
	id: number;
	name: string;
}

export interface IDirectionResponse {
	totalDirectionsCount: number;
	visibleDirectionsCount: number;
	directions: IDirection[];
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
	cutScorePercentages: number;
	questions: ICourseContentQuestions[];
}
