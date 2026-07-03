import style from './index.module.less'

interface LoadingStateProps {
  message: string;
  type?: 'loading' | 'timeout' | 'notFound';
  desc?: string;
}

export default function LoadingState({ message, type = 'loading', desc }: LoadingStateProps) {
  if (type === 'timeout' || type === 'notFound') {
    return (
      <div className={style.errorWrapper}>
        <div className={style.errorContent}>
          <div className={style.errorTitle}>
            {message}
          </div>
          {desc && (
            <div className={style.errorDesc}>
              {desc}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.title} aria-live="polite">
          {message}
        </div>
        <div className={style.dots} aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}
