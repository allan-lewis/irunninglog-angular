import { IProgressItem } from './progress-item.model';

export class ChallengeModel implements IProgressItem {

    name: string;
    description: string;
    distanceTotal: string;
    distanceDone: string;
    distanceInt: number;
    percentage: number;
    progress: string;
    primary: boolean;

    getType() {
        return "Challenge";
    }

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

    getOrder() {
        if (this.primary) {
            return 800;
        } else {
            return this.percentage === 100 ? this.distanceInt / 1000000 : this.percentage;
        }
    }

}