import { IProgressItem } from './progress-item.model';

export class ShoeModel implements IProgressItem {

    id: string;
    name: string;
    brand: string;
    model: string;
    description: string;
    distance: string;
    primary: boolean;
    progress: string;
    percentage: number;
    
    getTitle(): string {
        return this.name + (this.primary ? '*' : '');
    }

    getSubtitle(): string {
        return this.distance;
    }

    getLineOne(): string {
        return this.brand + ' ' + this.model;
    }

    getLineTwo(): string {
        return this.description;
    }

    getProgress(): string {
        return this.progress;
    }

    getPercentage(): number {
        return this.percentage;
    }

}