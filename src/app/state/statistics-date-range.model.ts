export class StatisticsDateRange {

    key: string;
    description: string;
    startDate?: string;
    endDate?: string;

}

export const THIS_YEAR: StatisticsDateRange = {key: "thisYear", description: "This Year", startDate: new Date().getFullYear() + "-01-01"};
export const ALL_TIME: StatisticsDateRange = {key: "allTime", description: "All Time"};
