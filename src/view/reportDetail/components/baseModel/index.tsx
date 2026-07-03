import style from './index.module.less'

interface CardProps {
  title: string;
  children: React.ReactNode;  // 插槽内容
}

export default function BaseModel ({title,children}:CardProps){
    return (
        <div className={`${style.content} pdf-avoid-break`}>
            <div className={style.titleModel}>
                <div className={style.titleLine}></div>
                <div className={style.titleText}>{title}</div>
            </div>
            { children }
        </div>
    )
}