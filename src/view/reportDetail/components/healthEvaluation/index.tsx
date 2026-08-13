import style from "./index.module.less";
import BaseModel from "../baseModel";
import personImg from "@/assets/person_img.png";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";
import warn from '@/assets/warn.png'
import sureIcon from '@/assets/sure_icon.png'
import notIcon from '@/assets/notIcon.png'
import shouldIcon from '@/assets/shouldIcon.png'
interface HealthEvaluationProps {
  comprehensiveAnalysis?: any;
}

export default function HealthEvaluation({ comprehensiveAnalysis = {} }: HealthEvaluationProps) {
  const { t } = useTranslation();
  const { liverScore = 0, heartScore = 0, spleenScore = 0, lungsScore = 0, renalScore = 0, comprehensiveDescription = '', healthRisk = '', comprehensive_result = [] , health_risk = [], condition_suggestion = {} } = comprehensiveAnalysis || {}

    // 数据排序
    const suggestArr = () => {
      const showArr = condition_suggestion?.scheme.map((item: any, index: number) =>{
        return {
          ...item,
          id: index
        }
      }) || [];
      if (showArr.length === 0) return [];

      const shouldArr = showArr.filter((item: any) => item.type === '宜');
      const avoidArr = showArr.filter((item: any) => item.type === '忌');

      // 展示全部，"宜"在前，"忌"在后
      return [...shouldArr, ...avoidArr];
    }

  return (
    <>
      <BaseModel title={t('health_evaluation')}>
        <div className={style.starModel}>
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
        </div>
        <div className={style.bottomTitle}>{t('comprehensive_evaluation')} 
           &nbsp; &nbsp;<span className={style.levelText} style={ healthRisk == '健康' ? { color: '#7CD334'} : (healthRisk == '中风险'  || healthRisk == '轻微风险') ? { color:'#FAAD14'} : {color:'#FF4D4F'}}>{ healthRisk }</span>
        </div>
        <div className={style.resultDetail}>
            {comprehensive_result.length > 0 ? comprehensive_result.map((item: any, index: number) => (
                <div key={index} className={style.resultItem}>{item}</div>
            )) : <div className={style.noResult}>
                {t('compNoResult')}
            </div>}
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
                health_risk.map((item: any, index: number) => {
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
                {condition_suggestion?.suggest || t('result.constNoSuggest')}
            </div>
            <div className={style.bottomSuggest}>
                { suggestArr().length > 0 && suggestArr().map((item: any, index: number) =>{
                  return (
                    <div className={style.suggestItem} key={index}>
                      <div className={style.detailTip}>
                          <div className={style.leftContent}>
                              <div className={style.detailTipTitle}>
                                  <div className={ item.type == '忌' ? style.typeIconNone : style.typeIcon}>
                                      <img src={ item.type == '忌' ? notIcon : shouldIcon} alt="" />
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
