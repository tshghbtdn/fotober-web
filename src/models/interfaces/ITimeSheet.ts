export interface ITimeSheetUnit {
    userId: string;
    workDate: string;
    status: 'morning' | 'afternoon' | 'fullDay' | 'absent';
}

export interface ITimeSheet {
    userId: string;
    month: string; // Định dạng "YYYY-MM"
    timeSheet: ITimeSheetUnit[];
}