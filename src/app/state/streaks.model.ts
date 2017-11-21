import { IProgressItem } from './progress-item.model';

export class StreaksModel {

    longest: StreakModel;
    current: StreakModel;
    thisYear: StreakModel;

}

export class StreakModel implements IProgressItem {

    title: string;
    subtitle: string;
    lineOne: string;
    lineTwo: string;
    progress: string;
    percentage: number;

    getTitle(): string {
        return this.title;
    }

    getSubtitle(): string {
        return this.subtitle;
    }

    getLineOne(): string {
        return this.lineOne;
    }

    getLineTwo(): string {
        return this.lineTwo;
    }

    getProgress(): string {
        return this.progress;
    }

    getPercentage(): number {
        return this.percentage;
    }

    getOrder() {
        return this.title === 'Current Streak' ? 1000 : this.getPercentage();
    }

}
