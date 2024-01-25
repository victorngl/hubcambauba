type NightactivitiesSubscriptionInput = {
    studentId?: string;
    studentName: string;
    courseName: string;
    priority: string;
    culturalActivity?: string;
    esportiveActivity?: string;
    optionActivity?: string;
    userAnswer: string;
    answerTime: string | Date;
    answered: boolean;
}