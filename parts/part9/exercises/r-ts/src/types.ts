export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartWithBaseWithDescription extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartWithBaseWithDescription {
    kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartBackground extends CoursePartWithBaseWithDescription {
    backgroundMaterial: string;
    kind: "background"
}

export interface CoursePartRequirements extends CoursePartWithBaseWithDescription {
    name: string,
    exerciseCount: number,
    description: string,
    requirements: string[],
    kind: "special"
}

export type CoursePart =
    CoursePartBasic |
    CoursePartGroup |
    CoursePartBackground |
    CoursePartRequirements;