import style from './index.module.less'
import BaseModel from '../baseModel'
import { useTranslation } from 'react-i18next';

export default function HealthManagementPlan({ healthHanagementHlan = {} }: any) {
    const { t } = useTranslation();
    const { description = '', direction = '', dietConditioningScheme = {}, physicalTherapyProgram = {}, footBathGuidance = {}, kungfuScheme = {}, sportsGuidance = {}, healthKnowledge = {}, lifestyleConditioningScheme = {}  } = healthHanagementHlan
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
                                <div key={index} className={style.recommendationItem}>
                                    <div className={style.recommendationTipTitle}>
                                        <div className={style.titleIcon}>{index + 1}</div>
                                        <div>{item.name}: {item.efficacy}</div>
                                    </div>
                                    <div>{t('nature_and_flavor')}{item.natureAndFlavor}</div>
                                    <div>{t('meridian_tropism')}{item.meridianTropism}</div>
                                    <div>{t('daily_dosage')}{item.dailyRecommendedDosage}</div>
                                    <div>{t('precautions_label_short')}{item.precautions}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.recommendation}>
                        <div className={style.recommendationTitle}>
                           {t('avoid_foods')}
                        </div>
                        <div className={style.recommendationBottom}>
                            { dietConditioningScheme?.avoidedFoods.map((item: any, index: number) =>{
                                return (
                                    <div className={style.recommendationItem} key={index}>
                                        <div className={style.recommendationTipTitle}>
                                            <div className={style.titleIcon}>{index + 1}</div>
                                            <div>{item}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
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
                                        {t('practice_usage')}<br />
                                        {item.practice || ''}<br />
                                        {t('efficacy')}<br />
                                        {item.efficacy || ''}<br/>
                                        {t('important_reminder')}<br />
                                        · {t('frequency')}{item.consumptionFrequency}<br />
                                        · {t('contraindication')}{item.contraindicatedGroups}<br />
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
                                    <div>{item.location || ''}，{item.operation || ''}</div>
                                    <div className={style.stepBottomItem}>
                                        <span style={{fontWeight:'bold'}}>{t('core_efficacy')}</span><br/>
                                        {item.efficacy}
                                    </div>
                                    <div className={style.stepBottomItem}>
                                        <span style={{fontWeight:'bold'}}>{t('key_points')}</span><br/>
                                        {item.contraindicatedAreas}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={style.noticeModel}>
                        <div style={{fontWeight:'bold'}}>{t('precautions_label')}</div>
                        <div>{physicalTherapyProgram?.acupointPattersNeedAttention || '--'}</div>
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
                                        <div>{t('dosage')}<br/>{item.form || ''}</div>
                                        <div>{t('operation_label')}<br/>{item.operation || ''}</div>
                                        <div>{t('important_reminder_label')}<br/>
                                            · {t('frequency')}{item.frequency}<br/>
                                            · {t('contraindication')}{item.contraindications}<br/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={style.noticeModel}>
                        <div style={{fontWeight:'bold'}}>{t('precautions_label')}</div>
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
                                <div style={{marginTop:'5px'}}>{t('core_efficacy')}<br/>{item.efficacy}</div>
                                <div style={{marginTop:'5px'}}>{t('frequency_suggestion')}<br/>{item.frequency}</div>
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

                    <div className={style.sportGuide}>
                        <div>{t('recommended_sports')}</div>
                        {sportsGuidance?.sportsPlan?.map((item: any, index: number) =>{
                            return (
                                <div key={index} className={style.sportGuideTitle}>
                                    <div className={style.sportGuideIcon}>{index + 1}</div>
                                    <div className={style.sportText}>{item}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.sportGuide}>
                        <div>{t('non_recommended_sports')}</div>
                        {sportsGuidance?.nonRecommendedSports?.map((item: any, index: number) =>{
                            return (
                                <div key={index} className={style.sportGuideTitle}>
                                    <div className={style.sportGuideIcon}>{index + 1}</div>
                                    <div className={style.sportText}>{item}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={style.stepText}>
                        {t('note_label')}<br/>
                        {sportsGuidance.sportsPattersNeedAttention}
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back8}`}></div>
                        <div className={style.titleRight}>
                            {t('lifestyle_conditioning')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>{t('recommendations')}</div>
                        { lifestyleConditioningScheme?.recommendations?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    <div className={style.dataIcon}>{index + 1}</div>
                                    <div>{item}</div>
                                </div>
                            )
                        })}
                        
                    </div>

                    <div className={style.stepText}>
                        <div>{t('avoid')}</div>
                        { lifestyleConditioningScheme?.nonRecommendations?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    <div className={style.dataIcon}>{index + 1}</div>
                                    <div>{item}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.stepText}>
                        <div style={{ color:'#64748B'}}>{t('precautions_label')}</div>
                        { lifestyleConditioningScheme?.contraindications?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    · {item}
                                </div>
                            )
                        })}
                        { lifestyleConditioningScheme?.contraindicatedGroups?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    · {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.lifeTip}>
                        {t('remark_label')}{lifestyleConditioningScheme.genderNotes}
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