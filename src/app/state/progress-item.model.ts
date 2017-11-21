export interface IProgressItem {

    getTitle(): string;
    getSubtitle(): string;
    getLineOne(): string;
    getLineTwo(): string;
    getProgress(): string;
    getPercentage(): number;
    getOrder(): number;

}