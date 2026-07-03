import style from './index.module.less'
import BaseModel from '../baseModel'
import { useTranslation } from 'react-i18next';

export default function HealthManagementPlan({ healthHanagementHlan = {} }: any) {
    const { t } = useTranslation();
    const { description = '', direction = '', dietConditioningScheme = {}, physicalTherapyProgram = {}, footBathGuidance = {}, kungfuScheme = {}, sportsGuidance = {}, healthKnowledge = {} } = healthHanagementHlan
    return (
        <>
            <BaseModel title={t('health_management_plan')}>
                <div className={style.mainQuest}>{description}</div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back1}`}></div>
                        <div className={style.titleRight}>
                            {t('solar_terms_guide')}
                        </div>
                    </div>
                    <div className={`${style.stepdetail} ${style.contentBack1}`}>
                        {direction}
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back2}`}></div>
                        <div className={style.titleRight}>
                            {t('diet_guide')}
                        </div>
                    </div>
                    <div className={`${style.stepdetail} ${style.contentBack2}`}>
                        <div className={style.stepInnerTitle}>{dietConditioningScheme?.description || ''}</div>
                        {dietConditioningScheme?.tips?.map((item: any, index: number) => {
                            return (
                                <div key={index}>{index + 1}.{item}</div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.recommendation}>
                    <div className={style.recommendationTitle}>
                        {t('ingredient_recommendation')}
                    </div>
                    <div className={style.recommendationIcon}>
                        {dietConditioningScheme?.recommendedFood?.map((item: any, index: number) => {
                            return (
                                <div className={style.iconItem} key={index}>{item.name}</div>
                            )
                        })}
                    </div>
                    <div className={style.recommendationBottom}>
                        {dietConditioningScheme?.recommendedFood?.map((item: any, index: number) => {
                            return (
                                <div key={index}>{index + 1}.{item.name}: {item.efficacy}</div>
                            )
                        })}
                    </div>
                    <div></div>
                </div>
                <div className={style.recommendation}>
                    <div className={style.recommendationTitle}>
                        {t('diet_recommendation')}
                    </div>
                    {
                        dietConditioningScheme?.recommendedDrink?.map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className={style.recommendationIcon}>
                                        <div className={style.iconItem}>{item.name}</div>
                                    </div>
                                    <div className={style.recommendationBottom}>
                                        {t('practice')}{item.practice || ''} <br />
                                        {t('efficacy')}{item.efficacy || ''}
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* */}
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back3}`}></div>
                        <div className={style.titleRight}>
                            {t('tcm_physiotherapy')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        {physicalTherapyProgram?.description || ''}{t('acupoint_recommendation')}
                    </div>
                    {
                        physicalTherapyProgram?.acupointTherapy?.map((item: any, index: number) => {
                            return (
                                <div className={`${style.stepdetail} ${style.contentBack3}`} key={index}>
                                    <div className={`${style.stepInnerTitle} ${style.textColor1}`}>{index + 1}.{item.acupuncturePoint}</div>
                                    <div>{t('location')}{item.location || ''}<br />
                                        {t('operation')}{item.operation || ''}</div>
                                </div>
                            )
                        })
                    }
                    <div className={`${style.stepdetail} ${style.contentBack4}`}>
                        <div className={`${style.stepInnerTitle} ${style.textColor2}`}>{t('precautions')}</div>
                        <div>{physicalTherapyProgram?.acupointPattersNeedAttention || ''}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back4}`}></div>
                        <div className={style.titleRight}>
                            {t('foot_bath_guide')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>{t('foot_bath_desc1')}</div>
                        <div>{t('foot_bath_desc2')}</div>
                    </div>
                    {
                        footBathGuidance?.achievementMethod?.map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className={style.stepIcon}>
                                        <div className={style.iconItem}>
                                            {item.prescription || ''}
                                        </div>
                                    </div>
                                    <div className={style.stepText}>
                                        <div>{t('composition')}{item.form || ''}</div>
                                        <div>{t('operation')}{item.operation || ''}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={`${style.stepdetail} ${style.contentBack4}`}>
                        <div className={`${style.stepInnerTitle} ${style.textColor2}`}>{t('precautions')}</div>
                        <div>{footBathGuidance?.footBathPattersNeedAttention || ''}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back5}`}></div>
                        <div className={style.titleRight}>
                            {t('tcm_exercises')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>{t('exercises_desc1')}</div>
                        <div>{t('exercises_desc2')}</div>
                    </div>
                    {kungfuScheme?.kungfuPlan?.map((item: any,index: number) => {
                        return (
                            <div className={`${style.stepdetail} ${style.contentBack5}`} key={index}>
                                <div className={`${style.stepInnerTitle} ${style.textColor3}`}>{index + 1}.{item.name}</div>
                                <div>{item.operation || ''}</div>
                            </div>
                        )
                    })}

                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back6}`}></div>
                        <div className={style.titleRight}>
                            {t('sports_guide')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        {t('sports_desc')}
                    </div>

                    <div className={`${style.stepdetail} ${style.contentBack6}`}>
                       { sportsGuidance?.sportsPlan?.map((item: any,index: number) =>{
                        return (
                            <div key={index}>{item}</div>
                        )
                       })}
                    </div>

                    <div className={`${style.stepdetail} ${style.contentBack4}`}>
                        <div className={`${style.stepInnerTitle} ${style.textColor2}`}>{t('precautions')}</div>
                        <div>{sportsGuidance?.sportsPattersNeedAttention || ''}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back7}`}></div>
                        <div className={style.titleRight}>
                            {t('health_knowledge')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        {Array.isArray(healthKnowledge) ? healthKnowledge.map((item: any, index: number) => {
                            return (
                                <div key={index}>{index + 1}.{item || ''}</div>
                            )
                        }) : <div>{healthKnowledge?.description || healthKnowledge?.content || ''}</div>}
                    </div>
                </div>
            </BaseModel>
        </>
    )
}