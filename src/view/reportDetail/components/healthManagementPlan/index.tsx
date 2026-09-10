import style from './index.module.less'
import BaseModel from '../baseModel'
import { useTranslation } from 'react-i18next';
import noticeIcon from '@/assets/noticeIcon.png'

export default function HealthManagementPlan({ healthHanagementHlan = {} }: any) {
    const { t } = useTranslation();
    const { description = '', direction = '', dietConditioningScheme = {}, physicalTherapyProgram = {}, footBathGuidance = {}, kungfuScheme = {}, sportsGuidance = {}, healthKnowledge = {}, lifestyleConditioningScheme = {}  } = healthHanagementHlan || {}
    return (
        <>
            <BaseModel title={t('health_management_plan')}>
                <div className={style.mainQuest}>{description}</div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back1}`}>01</div>
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
                        <div className={`${style.titleLeft} ${style.back2}`}>02</div>
                        <div className={style.titleRight}>
                            {t('diet_guide')}
                        </div>
                    </div>
                    <div className={`${style.stepdetail} ${style.contentBack2}`}>
                        <div className={style.stepInnerTitle}>{dietConditioningScheme?.description || ''}</div>
                        {dietConditioningScheme?.tips?.map((item: any, index: number) => {
                            return (
                                <div key={index} className={style.tipItem}>
                                    <span className={style.tipNumber}>{index + 1}.</span>
                                    <span className={style.tipText}>{item}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.recommendation}>
                    <div className={style.recommendationTitle}>
                        {t('ingredient_recommendation')}
                    </div>
                    <div className={style.recommendationIcon}>
                        {dietConditioningScheme?.recommendedFood?.filter(Boolean).map((item: any, index: number) => {
                            return (
                                <div className={style.iconItem} key={index}>{item.name}</div>
                            )
                        })}
                    </div>
                    <div className={style.recommendationBottom}>
                        {dietConditioningScheme?.recommendedFood?.filter(Boolean).map((item: any, index: number) => {
                            return (
                                <div key={index} className={style.recommendationItem}>
                                    <div className={style.recommendationTipTitle}>
                                        <div className={style.titleIcon}>{index + 1}</div>
                                        <div style={{ flex:1}}>{item.name}: {item.efficacy}</div>
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
                <div className={style.attentionModel}>
                        <div className={style.attentionTitle}>
                           {t('avoid_foods')}
                        </div>
                        <div className={style.attentionText}>
                            { dietConditioningScheme?.avoidedFoods?.map((item: any, index: number) =>{
                                return (
                                    <div  key={index}>
                                        · &nbsp;{item}
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
                        dietConditioningScheme?.recommendedDrink?.filter(Boolean).map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className={style.recommendationIcon}>
                                        <div className={style.iconItem}>{item.name}</div>
                                    </div>
                                    <div className={style.recommendationBottom}>
                                        <div className={style.bottomBorder}>{t('practice_usage')}
                                            {item.practice || ''}
                                        </div>
                                        <div className={style.bottomBorder}>
                                             {t('efficacy')}
                                             {item.efficacy || ''}
                                        </div>
                                        <div className={style.bottomBorder}>
                                            {t('important_reminder')}<br />
                                            · {t('frequency')}{item.consumptionFrequency}<br />
                                            · {t('contraindication')}{item.contraindicatedGroups}<br />
                                        </div>
                                       
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
                    {/* */}
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back3}`}>03</div>
                        <div className={style.titleRight}>
                            {t('tcm_physiotherapy')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        {t('tcm_physiotherapy_desc')}
                        <br/>{t('acupoint_recommendation')}
                    </div>
                    {
                        physicalTherapyProgram?.acupointTherapy?.filter(Boolean).map((item: any, index: number) => {
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
                        <div className={style.iconImg}>
                            <div className={style.imgItem}>
                                <img src={noticeIcon}/>
                            </div>
                            {t('precautions_label')}
                        </div>
                        <div>{physicalTherapyProgram?.acupointPattersNeedAttention || '--'}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back4}`}>04</div>
                        <div className={style.titleRight}>
                            {t('foot_bath_guide')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>{t('foot_bath_desc1')}</div>
                        <div>{t('foot_bath_desc2')}</div>
                    </div>
                    {
                        footBathGuidance?.achievementMethod?.filter(Boolean).map((item: any, index: number) => {
                            return (
                                <div key={index}>
                                    <div className={style.stepIcon}>
                                        <div className={style.iconItem}>
                                            {item.prescription || ''}
                                        </div>
                                    </div>
                                    <div className={style.stepText}>
                                        <div className={style.footBorder}>{t('dosage')}{item.form || ''}</div>
                                        <div className={style.footBorder}>{t('operation_label')}{item.operation || ''}</div>
                                        <div className={style.footBorder}>{t('important_reminder_label')}<br/>
                                            · {t('frequency')}{item.frequency}<br/>
                                            · {t('contraindication')}{item.contraindications}<br/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                   <div className={style.noticeModel}>
                        <div className={style.iconImg}>
                            <div className={style.imgItem}>
                                <img src={noticeIcon}/>
                            </div>
                            {t('precautions_label')}
                        </div>
                        <div>{footBathGuidance?.footBathPattersNeedAttention || ''}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back5}`}>05</div>
                        <div className={style.titleRight}>
                            {t('tcm_exercises')}
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>{t('exercises_desc1')}</div>
                        <div>{t('exercises_desc2')}</div>
                    </div>
                    {kungfuScheme?.kungfuPlan?.filter(Boolean).map((item: any,index: number) => {
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
                        <div className={`${style.titleLeft} ${style.back6}`}>06</div>
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
                    <div className={style.attentionModel}>
                        <div className={style.attentionTitle}>{t('sports_advice_avoid')}</div>
                        <div className={style.attentionText}>
                            {sportsGuidance?.nonRecommendedSports?.map((item: any, index: number) =>{
                                return (
                                   <div className={style.sportText} key={index}>· {item}</div>
                                )
                            })}
                        </div>
                    </div>
                     <div className={style.noticeModel}>
                        <div className={style.iconImg}>
                            <div className={style.imgItem}>
                                <img src={noticeIcon}/>
                            </div>
                            {t('precautions_label')}
                        </div>
                        <div>{sportsGuidance?.sportsPattersNeedAttention || ''}</div>
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back8}`}>07</div>
                        <div className={style.titleRight}>
                            {t('lifestyle_conditioning')}
                        </div>
                    </div>
                    <div className={`${style.stepText}`}>
                        <div>{t('recommendations')}</div>
                        { lifestyleConditioningScheme?.recommendations?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    <div className={style.dataIcon}>{index + 1}</div>
                                    <div style={{ flex:1 }}>{item}</div>
                                </div>
                            )
                        })}
                        
                    </div>

                    <div className={style.attentionModel}>
                        <div className={style.attentionTitle}>{t('avoid')}</div>
                        <div className={style.attentionText}>
                            { lifestyleConditioningScheme?.nonRecommendations?.map((item: any, index: number) =>{
                                return (
                                    <div key={index}>
                                        · {item}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.noticeModel}>
                        <div className={style.iconImg}>
                            <div className={style.imgItem}>
                                <img src={noticeIcon}/>
                            </div>
                            {t('precautions_label')}
                        </div>
                         { lifestyleConditioningScheme?.contraindicatedGroups?.map((item: any, index: number) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    · {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.lifeTip}>
                        {t('remark_label')}{lifestyleConditioningScheme?.genderNotes || ''}
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back7}`}>08</div>
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