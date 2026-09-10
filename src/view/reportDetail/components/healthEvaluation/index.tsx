import style from "./index.module.less";
import BaseModel from "../baseModel";
import { useTranslation } from "react-i18next";
import warn from '@/assets/warn.png'
import sureIcon from '@/assets/sure_icon.png'
import notIcon from '@/assets/notIcon.png'
import shouldIcon from '@/assets/shouldIcon.png'
import { useState, useEffect } from "react";
interface HealthEvaluationProps {
  comprehensiveAnalysis?: any;
}

export default function HealthEvaluation({ comprehensiveAnalysis = {} }: HealthEvaluationProps) {
  const { t } = useTranslation();
  const { comprehensiveDescription = '', healthRisk = '', comprehensive_result, health_risk, condition_suggestion } = comprehensiveAnalysis || {}

  // 后端部分字段没值时会返回 null（解构默认值只对 undefined 生效），这里统一兜底
  const liverScore = comprehensiveAnalysis?.liverScore || 0
  const heartScore = comprehensiveAnalysis?.heartScore || 0
  const spleenScore = comprehensiveAnalysis?.spleenScore || 0
  const lungsScore = comprehensiveAnalysis?.lungsScore || 0
  const renalScore = comprehensiveAnalysis?.renalScore || 0
  const comprehensiveResult = Array.isArray(comprehensive_result) ? comprehensive_result : []
  const healthRiskList = Array.isArray(health_risk) ? health_risk : []
  const conditionSuggestion = condition_suggestion || {}

  // 动画相关状态
  const [animatedScores, setAnimatedScores] = useState({
    lungs: 0,
    renal: 0,
    heart: 0,
    liver: 0,
    spleen: 0
  });

  // 触发动画 - 按照器官顺序依次增长
  useEffect(() => {
    // 先重置所有值为0
    setAnimatedScores({ lungs: 0, renal: 0, heart: 0, liver: 0, spleen: 0 });

    const organs = ['lungs', 'renal', 'heart', 'liver', 'spleen'] as const;
    const scores = { lungs: lungsScore, renal: renalScore, heart: heartScore, liver: liverScore, spleen: spleenScore };

    organs.forEach((organ, index) => {
      setTimeout(() => {
        setAnimatedScores(prev => ({
          ...prev,
          [organ]: scores[organ]
        }));
      }, index * 150); // 每个器官间隔150ms
    });
  }, [lungsScore, renalScore, heartScore, liverScore, spleenScore]);

    // 数据排序
    const suggestArr = () => {
      const showArr = conditionSuggestion?.scheme?.map((item: any, index: number) =>{
        return {
          ...item,
          id: index
        }
      }) || [];
      if (showArr.length === 0) return [];

      const shouldArr = showArr.filter((item: any) => item.type === t('recommend_type_should'));
      const avoidArr = showArr.filter((item: any) => item.type === t('recommend_type_avoid'));

      // 展示全部，"宜"在前，"忌"在后
      return [...shouldArr, ...avoidArr];
    }

     const getOrganStyle = (score:number) => {
        if (score > 66) {
            return {
                back: '#52C41A',
                num: score,
                value: t('score_level.good')
            }
        } else if (score > 33) {
            return {
                back: '#FAAD14',
                num: score,
                value: t('score_level.weak')
            }
        } else {
            return {
                back: '#FF4D4F',
                num: score,
                value: t('score_level.insufficient')
            }
        }
    }

  return (
    <>
      <BaseModel title={t('health_evaluation')}>
      <div className={style.bottomTitle}>{t('comprehensive_evaluation')}
           &nbsp; &nbsp;<span className={style.levelText} style={
             healthRisk === t('health_risk_level.health') ? { color: '#7CD334'} :
             (healthRisk === t('health_risk_level.medium_risk') || healthRisk === t('health_risk_level.slight_risk')) ? { color:'#FAAD14'} :
             {color:'#FF4D4F'}
           }>{ healthRisk }</span>
        </div>
        <div className={style.resultDetail}>
            {comprehensiveResult.length > 0 ? comprehensiveResult.map((item: any, index: number) => (
                <div key={index} className={style.resultItem}>{item}</div>
            )) : <div className={style.noResult}>
                {t('compNoResult')}
            </div>}
        </div>
        {/* <div className={style.starModel}>
          <div className={style.ring}>
            <div className={`${style.cycle} ${style.liverCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={liverScore / 20 } />
              </div>
              <div>{t('liver')}</div>
              <div>{t('gallbladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.kidneyCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={renalScore / 20 } />
              </div>
              <div>{t('kidney')}</div>
              <div>{t('bladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.lungCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={lungsScore / 20 } />
              </div>
              <div>{t('lung')}</div>
              <div>{t('large_intestine')}</div>
            </div>
            <div className={`${style.cycle} ${style.spleenCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={spleenScore / 20 } />
              </div>
              <div>{t('spleen')}</div>
              <div>{t('stomach')}</div>
            </div>
            <div className={`${style.cycle} ${style.heartCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={heartScore / 20 } />
              </div>
              <div>{t('heart')}</div>
              <div>{t('small_intestine')}</div>
            </div>
            <div className={style.personImg}>
              <img src={personImg} alt="" />
            </div>
          </div>
        </div> */}
        <div className={style.organDetail}>
          <div className={style.organItem}>
            <div className={style.organLabel}>{t('organ_status.lung_large_intestine')}</div>
            <div className={style.organLine}>
                <div
                    className={style.organLineInner}
                    style={{
                        background: getOrganStyle(animatedScores.lungs).back,
                        width: `${getOrganStyle(animatedScores.lungs).num}%`,
                        transition: 'width 0.8s ease-out'
                    }}
                ></div>
            </div>
            <div className={style.organValue} style={{color:getOrganStyle(lungsScore).back}}>{getOrganStyle(lungsScore).value}</div>
          </div>
          <div className={style.organItem}>
            <div className={style.organLabel}>{t('organ_status.kidney_bladder')}</div>
            <div className={style.organLine}>
                <div
                    className={style.organLineInner}
                    style={{
                        background: getOrganStyle(animatedScores.renal).back,
                        width: `${getOrganStyle(animatedScores.renal).num}%`,
                        transition: 'width 0.8s ease-out'
                    }}
                ></div>
            </div>
            <div className={style.organValue} style={{color:getOrganStyle(renalScore).back}}>{getOrganStyle(renalScore).value}</div>
          </div>
          <div className={style.organItem}>
            <div className={style.organLabel}>{t('organ_status.heart_small_intestine')}</div>
            <div className={style.organLine}>
                <div
                    className={style.organLineInner}
                    style={{
                        background: getOrganStyle(animatedScores.heart).back,
                        width: `${getOrganStyle(animatedScores.heart).num}%`,
                        transition: 'width 0.8s ease-out'
                    }}
                ></div>
            </div>
            <div className={style.organValue} style={{color:getOrganStyle(heartScore).back}}>{getOrganStyle(heartScore).value}</div>
          </div>
          <div className={style.organItem}>
            <div className={style.organLabel}>{t('organ_status.liver_gallbladder')}</div>
            <div className={style.organLine}>
                <div
                    className={style.organLineInner}
                    style={{
                        background: getOrganStyle(animatedScores.liver).back,
                        width: `${getOrganStyle(animatedScores.liver).num}%`,
                        transition: 'width 0.8s ease-out'
                    }}
                ></div>
            </div>
            <div className={style.organValue} style={{color:getOrganStyle(liverScore).back}}>{getOrganStyle(liverScore).value}</div>
          </div>
          <div className={style.organItem}>
            <div className={style.organLabel}>{t('organ_status.spleen_stomach')}</div>
            <div className={style.organLine}>
                  <div
                      className={style.organLineInner}
                      style={{
                          background: getOrganStyle(animatedScores.spleen).back,
                          width: `${ getOrganStyle(animatedScores.spleen).num}%`,
                          transition: 'width 0.8s ease-out'
                      }}
                  ></div>
              </div>
            <div className={style.organValue} style={{color:getOrganStyle(spleenScore).back}}>{getOrganStyle(spleenScore).value}</div>
          </div>
        </div>
        <div className={style.bottomDetail}>{comprehensiveDescription}</div>
        <div className={style.riskResult}>
            <div className={style.riskTitle}>
                <div className={style.titleLeft}>
                    <div className={style.titleIcon}>
                        <img src={warn}></img>
                    </div>
                    <div>{t('compHealthRisk')} </div>
                </div>
            </div>
            {
                healthRiskList.map((item: any, index: number) => {
                    return (
                        <div className={style.riskDetail} key={index}>
                            <div className={style.tagDetail}>
                                <span className={style.tagType}>{item.risk_type}</span>
                                <span className={style.tagContent}>
                                    {item.risk_detail}
                                </span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        <div className={style.organTip}>
            <div className={style.tipTitle}>
                <div className={style.tipTitleLeft}>
                  <div className={style.tipIcon}>
                    <img src={sureIcon} alt="" />
                  </div>
                  <div className={style.tipText}>{t('constNextStep')}</div>
                </div>
            </div>
            <div className={style.tipSubTitle}>
                {conditionSuggestion?.suggest || t('result.constNoSuggest')}
            </div>
            <div className={style.bottomSuggest}>
                { suggestArr().length > 0 && suggestArr().map((item: any, index: number) =>{
                  return (
                    <div className={style.suggestItem} key={index}>
                      <div className={style.detailTip}>
                          <div className={style.leftContent}>
                              <div className={style.detailTipTitle}>
                                  <div className={ item.type == t('recommend_type_avoid') ? style.typeIconNone : style.typeIcon}>
                                      <img src={ item.type == t('recommend_type_avoid') ? notIcon : shouldIcon} alt="" />
                                  </div>
                                  <div className={style.typeText}>
                                      {item.tag}
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className={style.contentText}>{item.content}</div>
                    </div>
                  )
                })}
            </div>
        </div>
      </BaseModel>
    </>
  );
}
