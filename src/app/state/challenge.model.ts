import { IProgressItem } from './progress-item.model';

export class ChallengeModel implements IProgressItem {

    name: string;
    description: string;
    distanceTotal: string;
    distanceDone: string;
    percentage: number;
    progress: string;

    getTitle() {
        return this.name;
    }

    getSubtitle() {
        return this.description;
    }

    getLineOne() {
        return this.distanceDone + ' of ' + this.distanceTotal;
    }

    getLineTwo() {
        return this.percentage + '%';
    }

    getProgress() {
        return this.progress;
    }

    getPercentage() {
        return this.percentage;
    }

}