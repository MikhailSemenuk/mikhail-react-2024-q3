import classNames from 'classnames';

export default function ProgressPasswordStrength({ password }: { password: string }) {
  const getPasswordScore = (str: string) => {
    let score = 0;

    score += str.length * 4;

    if (/[A-Z]/.test(str)) {
      // uppercase
      score += 10;
    }

    if (/\d/.test(str)) {
      // numbers
      score += 10;
    }

    if (/[\W_]/.test(str)) {
      // special symbols
      score += 20;
    }

    return Math.min(score, 100);
  };

  const convertScoreToClassColor = (score: number) => {
    if (score < 20) {
      return 'bg-danger';
    } else if (score < 40) {
      return 'bg-warning';
    } else if (score < 80) {
      return 'bg-info';
    } else if (score > 80) {
      return '';
    }
  };

  const score = getPasswordScore(password);

  const progressBarClasses = classNames(
    'progress-bar',
    'progress-bar-striped',
    'progress-bar-animated',
    convertScoreToClassColor(score),
  );

  return (
    <>
      <div
        className='progress mb-2'
        role='progressbar'
        aria-label='Level strong password'
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={progressBarClasses} style={{ width: `${score}%` }} />
      </div>
    </>
  );
}
