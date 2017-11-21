export interface IProgressItem {

    getType(): string;
    getTitle(): string;
    getSubtitle(): string;
    getLineOne(): string;
    getLineTwo(): string;
    getProgress(): string;
    getPercentage(): number;
    getOrder(): number;

}