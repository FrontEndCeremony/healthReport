import style from './index.module.less'
import { useTranslation } from 'react-i18next'


export default function ConfidenceLevel(props){

    const { diagnosisConfidence={}, verification={} } = props
    const { t } = useTranslation();

    return (
        <div className={style.levelContent}>
            <div className={style.titleModel}>
                <div className={style.leftLine}></div>
                <div className={style.rightText}>{t('confidence_level.title')}</div>
            </div>
            <div className={style.confidenceResult}>
                <div className={style.confidenceLabel}>{t('confidence_level.confidence_result')}</div>
                <div className={style.confidenceValue}  style={ diagnosisConfidence?.overall_confidence == '低' ? { color:'#FF4D4F'} :
                    diagnosisConfidence?.overall_confidence == '中'? { color:'#FAAD14' }: { color:'#52C41A'}}>
                    {diagnosisConfidence?.overall_confidence}
                </div>
            </div>
            <div className={style.confidenceDetail}>
                {diagnosisConfidence?.explanation}
            </div>
            <div className={style.confidenceContent}>
                <div className={style.confidenceTitle}>{t('confidence_level.further_judgment')}</div>
                <div className={style.confidenceText}>
                    <div>{t('confidence_level.differential_diagnosis')}</div>
                    { diagnosisConfidence?.differential_diagnosis?.map((item,index) =>{
                        return(
                            <div key={index}>
                                &nbsp;· {item}
                            </div>
                        )
                    })}
                    <div>{t('confidence_level.further_verification')}</div>
                     { diagnosisConfidence?.further_verification?.map((item,index) =>{
                        return(
                            <div key={index}>
                                &nbsp;· {item}
                            </div>
                        )
                    })}
                    <div>{t('confidence_level.data_limitations')}</div>
                    { diagnosisConfidence?.data_limitations?.map((item,index) =>{
                        return(
                            <div key={index}>
                                &nbsp;· {item}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={style.confidenceContent}>
                <div className={style.confidenceTitle}>
                    {t('confidence_level.consistency_check')}
                    <span style={verification?.score < 33 ? { color:'#FF4D4F'} :
                            verification?.score < 66 ? { color:'#FAAD14' }: { color:'#52C41A'}}>
                            {t('confidence_level.score')} {verification?.score}
                    </span>
                </div>
                <div className={style.confidenceText}>
                    <div>{t('confidence_level.check_conclusion')}{verification?.confidence_marker}</div>
                    <div>{t('confidence_level.consistency_anomaly')}</div>
                    { verification?.violations?.map((item,index) =>{
                        return(
                            <div key={index}>
                                &nbsp;· {item}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )

}