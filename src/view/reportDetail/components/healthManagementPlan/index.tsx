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
                                        <div>.{item.name}: {item.efficacy}</div>
                                    </div>
                                    <div>性味：{item.natureAndFlavor}</div>
                                    <div>归经：{item.meridianTropism}</div>
                                    <div>每日建议用量：{item.dailyRecommendedDosage}</div>
                                    <div>注意：{item.precautions}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={style.recommendation}>
                        <div className={style.recommendationTitle}>
                           注意避免的食物
                        </div>
                        <div className={style.recommendationBottom}>
                            { dietConditioningScheme?.avoidedFoods.map((item,index) =>{
                                return (
                                    <div className={style.recommendationItem} key={index}>
                                        <div className={style.recommendationTipTitle}>
                                            <div className={style.titleIcon}>{index + 1}</div>
                                            <div>.{item}</div>
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
                                        <span style={{fontWeight:'bold'}}>核心功效：</span><br/>
                                        {item.efficacy}
                                    </div>
                                    <div className={style.stepBottomItem}>
                                        <span style={{fontWeight:'bold'}}>关键点：</span><br/>
                                        {item.contraindicatedAreas}
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={style.noticeModel}>
                        <div style={{fontWeight:'bold'}}>注意事项：</div>
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
                                        <div>用量：<br/>{item.form || ''}</div>
                                        <div>操作：<br/>{item.operation || ''}</div>
                                        <div>重要提醒：<br/>
                                            · 频率：{item.frequency}<br/>
                                            · 禁忌：{item.contraindications}<br/>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={style.noticeModel}>
                        <div style={{fontWeight:'bold'}}>注意事项：</div>
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
                                <div style={{marginTop:'5px'}}>核心功效：<br/>{item.efficacy}</div>
                                <div style={{marginTop:'5px'}}>频率建议：<br/>{item.frequency}</div>
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
                        <div>推荐运动:</div>
                        {sportsGuidance?.sportsPlan?.map((item,index) =>{
                            return (
                                <div key={index} className={style.sportGuideTitle}>
                                    <div className={style.sportGuideIcon}>{index + 1}</div>
                                    <div className={style.sportText}>{item}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.sportGuide}>
                        <div>不推荐运动:</div>
                        {sportsGuidance?.nonRecommendedSports?.map((item,index) =>{
                            return (
                                <div key={index} className={style.sportGuideTitle}>
                                    <div className={style.sportGuideIcon}>{index + 1}</div>
                                    <div className={style.sportText}>{item}</div>
                                </div>
                            )
                        })}
                    </div>

                    <div className={style.stepText}>
                        注意事项：<br/>
                        {sportsGuidance.sportsPattersNeedAttention}
                    </div>
                </div>
                <div className={style.stepContent}>
                    <div className={style.stepTitle}>
                        <div className={`${style.titleLeft} ${style.back8}`}></div>
                        <div className={style.titleRight}>
                            生活调理方案
                        </div>
                    </div>
                    <div className={style.stepText}>
                        <div>建议：</div>
                        { lifestyleConditioningScheme?.recommendations?.map((item,index) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    <div className={style.dataIcon}>{index + 1}</div>
                                    <div>{item}</div>
                                </div>
                            )
                        })}
                        
                    </div>
                    
                    <div className={style.stepText}>
                        <div>避免：</div>
                        { lifestyleConditioningScheme?.nonRecommendations?.map((item,index) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    <div className={style.dataIcon}>{index + 1}</div>
                                    <div>{item}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.stepText}>
                        <div style={{ color:'#64748B'}}>注意事项：</div>
                        { lifestyleConditioningScheme?.contraindications?.map((item,index) =>{
                            return (
                                <div className={style.dataItem} key={index}>
                                    · {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className={style.lifeTip}>
                        {lifestyleConditioningScheme.genderNotes}
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